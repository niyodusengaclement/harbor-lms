import React, { useState, useEffect } from 'react';
import _, { sortBy } from 'lodash';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { getCourseSections } from '../redux/actions/coursesActions';
import { saveChat, getChats } from '../redux/actions/chatActions';
import Avatar from '@material-ui/core/Avatar';
import '../assets/styles/components/chat.scss';
import { useFirestoreConnect } from "react-redux-firebase";

const Chat = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [section, setSection] = useState(null)
  const [message, setMessage] = useState('');
  const { courses, chat } = props;
  const courseId = localStorage.getItem('courseId');
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');

  useEffect(() => {
    setIsLoading(true);
    props.getCourseSections(courseId, setIsLoading);
  }, []);

  const user = JSON.parse(localStorage.getItem('rems_user_profile'));
  const userId = localStorage.getItem('rems_user_id');

  const { sections } = courses;
  useFirestoreConnect({
    collection: `chats`,
    storeAs: 'chats'
  });
  useFirestoreConnect({
    collection: `users`,
    storeAs: 'users'
  });

  const y = sections.length > 0 && section === null ? setSection(_.last(sections).sectionId) : null;
  const changeSection = (val) => setSection(val);

  const handleScroll = () => {
    const body = document.getElementsByClassName('chat')[0];
    body.scrollTop += body.scrollHeight;
  }

  const sendHandler = () => {
    if(message === '') {
      return toast.error('No message, Write a message please', {
        position: 'top-center',
        hideProgressBar: true,
      });
    }
    const data = {
      senderId: userId,
      name: user.fullName,
      role: user.role,
      courseId,
      message,
      section,
      time: new Date().setTime(new Date()),
    }
    props.sendMessage(data);
    setMessage('');
  }

  const chats = useSelector(({firestore}) => firestore.data.chats);
  const users = useSelector(({firestore}) => firestore.data.users);
  const allMessages = [];
  const allUsers = [];

  if(chats) {
    Object.values(chats).map((chat) => allMessages.push(chat));
  }
  _.mapKeys(users, function(value, key) {
   const data = {
     id: key,
     ...value
    }
  return allUsers.push(data);
});

  const allChats = allMessages.length > 0 ? allMessages.filter((msg) => msg.section === section) : [];
  const roleFinder = (senderId) => {
    const info = allUsers.filter(({id}) =>  id === senderId);
    if(info.length > 0) return info[0].role;
    return '';
  }

  useEffect(() => {
    handleScroll();
  }, [allChats]);

  const Loading  = chat.isLoading ? 
    <Spinner
      animation="border"
      variant="primary"
      className={chat.isLoading ? 'spinner--position__center' : 'hide'}
    />
  : <p className="pl-3">No message found</p>;
  return (
    <div>
      <div className="chat">
      {
        allChats.length > 0 ? sortBy(allChats, [(msg) => { return msg.time; }]).map((myChat, idx) => 
        <div key={idx} className={myChat.senderId === userId ? "chat-card darker" : "chat-card"} >
          <Avatar style={{backgroundColor: roleFinder(myChat.senderId) === 'student' ? '#3359DF' : '#2d035c' }}  className={myChat.senderId === userId ? "chat-avatar right" : "chat-avatar"}>{roleFinder(myChat.senderId) === 'student' ? 'S' : 'I'}</Avatar>
          <strong className="user-name">{myChat.senderId === userId ? 'Me' : myChat.name}</strong>
          <p>{myChat.message}</p>
          <span className={myChat.senderId === userId ? "time-left" : "time-right"}>{timeAgo.format(new Date(myChat.time), 'ago')}</span>
        </div>
        )
        : Loading
      }
      </div>


      <div className="chat_footer">
      <input type="text"
        className="chat_footer_input"
        value={message}
        onKeyUp={e => {
          if (e.keyCode === 13) {
            sendHandler();
          }
        }}
        placeholder="Send a message..."
        onChange={e => setMessage(e.target.value.trimLeft())}
      />

      <button className="chat_footer_btn" onClick={sendHandler} name="send_msg"> Send </button>
      
      </div>
    
      <div className="card online-users">
        <div className="card-header">
          Chat
        </div>
        <ul className="list-group list-group-flush">
          {
            sections.length > 0 ? sections.map(({ sectionId, sectionName }) => 
              <li key={sectionId} className={section === sectionId ? 'list-group-item isActive' : 'list-group-item'}><Link to="#" className="" onClick={e => changeSection(sectionId)} >{sectionName}</Link></li>
            )
            : null
          }
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = ({ courses, chat }) => ({
  courses,
  chat,
});

export default connect(mapStateToProps, {
  getCourseSections: getCourseSections,
  sendMessage: saveChat,
  getMessages: getChats,
})(Chat);