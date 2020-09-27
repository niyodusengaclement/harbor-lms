import React,{useState, useEffect, useRef} from 'react';
import '../assets/styles/containers/login.scss';
import lightBulb from '../assets/images/light_bulb.png';
import desktopImage from '../assets/images/image-desktop.png';
import motto from '../assets/images/motto.png';
import line from '../assets/images/line.png';
import InputField from '../components/InputField';
import Button from '../components/Btn';
import Text from '../components/Text';
import {connect} from 'react-redux';
import {login} from '../redux/actions/authActions';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {Redirect} from 'react-router-dom';

const Login =(props) => {
    const [emailOrStudentUniqueNumber,setEmailOrStudentUniqueNumber] = useState();
    const [password, setPassword] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    
    const isInitialMount = useRef(true);

    const onError = (error) => {
        toast.error(error, {
          position: 'top-center',
          hideProgressBar: true,
        });
      }
      
    useEffect(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
             if(props.authResponse && props.authResponse.message === 'success') {setSuccessMsg('Successfully logged in!');}
         }
    },[props.authError,props.authResponse]);

    const handleChange = (target) => {
        target.name === 'emailOrStudentUniqueNumber' ? setEmailOrStudentUniqueNumber(target.value)
        : target.name === 'password' ? setPassword(target.value)
        : void(0);
    }
    const handleClick = (target) => {
        if(emailOrStudentUniqueNumber && password){
            return props.login({emailOrStudentUniqueNumber,password});
        }
        else {
            return onError('Fill all required fields please');
        };
    }
    const redirectTo = (location) => {
        return (<Redirect to={location} />)
    }

    return(
        <div>
            <Spinner
            animation="border"
            variant="primary"
            className={props.loading ? 'spinner--position__center' : 'hide'}
            />
            {successMsg && !props.loading ? redirectTo('/dashboard') : ''}
            <div className="signup--container">
                
                <div className="signup--section">
                    <div><Text label="Harbor Learning Management System" className="txt txt--fontSize__medium txt--logo signup--logo" /></div>
                    <div><img src={desktopImage} alt="" className="signup__img--desktopImage"/></div>
                    <div><img src={motto} alt="" className="signup__img--motto"/></div>         
                </div>
                <div className="signup--light">
                    <img src={line} alt="" className="signup__img--line__top"/>
                    <img src={lightBulb} alt="" className="signup__img--bulb"/>
                    <img src={line} alt="" className="signup__img--line__bottom"/>
                </div>
                <div className="signup--form login--form">
                    <div className="signup--form--title login--form--title">
                        <Text label="Login" className="txt txt--fontSize__large" />
                    </div>
                    <div className="in-small">
                        <h2>Login</h2>
                    </div>
                    <div className="signup--form--rows">
                        <div className="signup--form--row">
                            <InputField type="text" id="emailOrStudentUniqueNumber" name="emailOrStudentUniqueNumber" placeholder="Email / Student Unique Number(SUN)" className="input__large" required={true} handleChange={handleChange} />
                        </div>
                        <div className="signup--form--row">
                            <InputField type="password" id="password" name="password" placeholder="password" className="input__large" required={true} handleChange={handleChange} />
                        </div>
                        <div className="signup--form--btn login--form--btn"> 
                            <Button name="login" label="Login" handleClick={handleClick}/>   
                        </div>
                        <div className="signup--form--footer login--form--footer"> 
                            <Text label="New to Harbor Institute ? Create account " linkLabel="here" linkAddress="/signup/student" className="txt"  exception={true} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      loading: state.auth.loading,
      auth: state.firebase.auth,
      authError: state.auth.authError,
      authResponse: state.auth.authResponse
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      login: (user) => dispatch(login(user))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)