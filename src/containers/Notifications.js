import React, { useState } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import "../assets/styles/main.scss";
import NotificationImg from "../assets/images/not.jpg";
import { Link } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import TopHeader from "../components/TopHeader";
import { Badge, Form } from "react-bootstrap";
import { currencyConverter, getProfile } from "../helpers/utils";
import { markAsRead, acceptOrRejectInvitation } from "../redux/actions/invitationsActions";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { toast } from "react-toastify";
import { sortBy } from 'lodash';
import { useFlutterwave } from 'flutterwave-react-v3';
import { getSingleCourse } from "../redux/actions/coursesActions";
import { Modal, Button } from 'react-bootstrap';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

const Notifications = (props) => {
  const [ details, setDetails ] = useState(null);
  const { courses } = props;
  const [ show, setShow ] = useState(false);
  const [ notificationDetails, setNotificationDetails ] = useState();
  const [ currency, setCurrency ] = useState("RWF");
  const [ USD, setUSDValue ] = useState();

  useFirestoreConnect({
    collection: `notifications`,
    storeAs: 'notifications'
  });
  const notifications = useSelector(({firestore}) => firestore.data.notifications);
  const allNotifications = [];
  const allNotificationsKeys = [];

  if(notifications) {
    Object.entries(notifications).map((values) => allNotificationsKeys.push(values));
    const array = allNotificationsKeys.length > 0 ? allNotificationsKeys.map((arr) => {
      const value = {
        id: arr[0],
        ...arr[1]
      }
      return allNotifications.push(value);
    }) : [];
  }

  const markNotificationAsRead = (data, isRead) => props.markNotificationAsRead(data, isRead);

  const showDetails = (val) => {
    props.getSingleCourse(val.courseId)
    setDetails(val);
    markNotificationAsRead(val, true);
  };

  const acceptOrReject = (data, state) => {
    if(!data.docId) {
      return toast.error('Action cannot be proccessed, Invitation might be cancelled', {
        position: 'top-center',
        hideProgressBar: true,
      })
    }
    props.acceptOrRejectInvitation(data, state);
    
  };
  const { uid, ...rest } = getProfile();

  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_KEY,
    tx_ref: Date.now(),
    amount: currency ==="RWF" ? courses.singleCourse.price : USD,
    currency: currency,
    payment_options: 'card, mobilemoney, account, bank transfer, wechat, ussd',
    customer: {
      email: rest ? rest.email : 'clementmistico@gmail.com',
      phonenumber: rest ? rest.phoneNumber : '',
      name: rest ? rest.fullName : '',
    },
    customizations: {
      title: 'Harbor LMS',
      description: 'Thanks for registering in a course',
      logo: null,
    },
};

const handleFlutterPayment = useFlutterwave(config);

const handleContinue = async (inviteDetails) => {
  const cur = await currencyConverter(courses.singleCourse.price);
  if(!cur.error) setUSDValue(cur);
  setShow(!show);
  setNotificationDetails(inviteDetails);
}
const checkout = () => {
  handleFlutterPayment({
    callback: () => {
      acceptOrReject(notificationDetails, 'accepted');
    },
    onClose: () => {},
  });
}
  return (
    <div className="wrapper">
      <TopHeader
				page={` Notifications`}
			/>
      <Modal show={show} onHide={setShow} >
        <Modal.Header closeButton>
          <Modal.Title>
            Select currency
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group>
          <Form.Control as="select" value={currency} onChange={(e) => setCurrency(e.target.value)} custom>
            <option value="RWF">Rwandan Franc (RWF)</option>
            <option value="USD">United State Dollar (USD)</option>
          </Form.Control>
        </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={checkout}>Continue</Button>
        </Modal.Footer>
      </Modal>
      
      {/* Main panel */}
			<div className="main-panel">
				<div className="content">
					<div className="container-fluid">
						<div className="row">
              
              <div className="col-md-4">
                <div className="card p-4 large-card ">
                  <h5 className="card-title pl-3">All notifications</h5>
                  <div className="card-body">
                    {
                      allNotifications.length > 0 ? sortBy(allNotifications, [(value) => { return value.time * (-1); }]).filter(({receiver}) => receiver === uid ).map((data, idx) => 
                        <div key={idx}>
                        <p className={data.unread ? 'submenu' : 'submenu isActive'}>
                          <Link to={`#`} className="" onClick={e => showDetails(data)}>
                            {data.message}
                          </Link>
                          <div className={details ? '' : 'hide'}>
                          <div className={data.type === 'Invitation' && data.status === "pending" ? 'hide-in-full' : 'hide-in-full hide'}>
                            <button className="btn-success btn-sm mt-5 ml-3 mr-3 pl-3 pr-3" onClick={() => handleContinue(data)} > Accept </button>
                            <button className="btn-danger btn-sm mt-5 ml-3 mr-3 pl-3 pr-3" onClick={(e) => acceptOrReject(data, 'rejected')} > Reject </button>
                          </div>
                          </div>
                        </p>
                        <button className="btn-dark btn-sm mb-3" onClick={(e) => markNotificationAsRead(data)} > {data.unread ? 'Mark as read' : 'Mark as unread'} </button>
                        </div>
                      ) : "No notifications found"
                    } </div>
                </div>
              </div>
              <div className="col-md-8 hide-in-small">
                <h4 className="page-title pb-3">Notification Details</h4>

                <div className={details ? "carded-table-scroll carded-details" : ""} >
                  {!details ? <img src={NotificationImg} /> : null}
                  {
                    details ?
                    <div className="p-3">
                    <h5 className="card-title"><strong>{details.type}</strong></h5>
                      <div > {details.message} </div>
                      {
                        details.status !== 'pending' ?
                        <Badge variant="secondary">{details.status}</Badge>
                        : null
                      }
                      <div className="pt-2 text-muted">
                        <span> {timeAgo.format(new Date(details.time), 'ago')}</span>
                      </div>
                      <div className={details.type === 'Invitation' && details.status === "pending" ? '' : 'hide'}>
                        <button className="btn-success btn-sm mt-5 ml-3 mr-3 pl-3 pr-3" onClick={() => handleContinue(details)} > Accept </button>
                        <button className="btn-danger btn-sm mt-5 ml-3 mr-3 pl-3 pr-3" onClick={(e) => acceptOrReject(details, 'rejected')} > Reject </button>
                      </div>
                    </div>
                    :null
                  }
                </div>
              </div>
						</div>
						{/* End of row */}

					</div>
				</div>
			</div>
			{/* END */}
    </div>
  );
};

const mapState = ({ courses }) => ({
  courses
})
export default connect(mapState, {
  getSingleCourse: getSingleCourse,
  markNotificationAsRead: markAsRead,
  acceptOrRejectInvitation: acceptOrRejectInvitation
})(Notifications);