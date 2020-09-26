import React,{useState, useEffect, useRef} from 'react';
import '../assets/styles/containers/signup.scss';
import lightBulb from '../assets/images/light_bulb.png';
import desktopImage from '../assets/images/image-desktop.png';
import motto from '../assets/images/motto.png';
import line from '../assets/images/line.png';
import InputField from '../components/InputField';
import Button from '../components/Btn';
import Text from '../components/Text';
import {connect} from 'react-redux';
import {signup} from '../redux/actions/authActions';
import { Spinner } from 'react-bootstrap';
import AlertComponent from '../components/Alert';
import {Redirect} from 'react-router-dom';

const Signup =(props) => {
    const [fullName, setName] = useState();
    const [role,setUserRole] = useState('instructor');
    const [phoneNumber,setPhoneNumber] = useState();
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [schoolName,setSchoolName] = useState();
    const [termsAgreement,setTermsAgreement] = useState(false);
    const [isLoading, setIsLoading] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const isInitialMount = useRef(true);

    useEffect(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
             if(props.authError) {setErrorMsg(props.authError.message);};
             if(!props.authError && !errorMsg ) {setSuccessMsg('Account created!');}
         }
    },[props.authError]);
    const handleChange = (target) => {
        setErrorMsg('');
        setSuccessMsg('');
        target.name === 'fullName' ? setName(target.value)
        : target.name === 'phoneNumber' ? setPhoneNumber(target.value)
        : target.name === 'email' ? setEmail(target.value)
        : target.name === 'password' ? setPassword(target.value)
        : target.name === 'confirmPassword' ? setConfirmPassword(target.value)
        : target.type === 'checkbox' ? setTermsAgreement(target.checked)
        : target.name === 'schoolName' ? setSchoolName(target.value)
        : void(0);
    }
    const handleClick = (target) => {
        setErrorMsg('');
        setSuccessMsg('');
        setIsLoading(true);
        if(password !== confirmPassword){ setErrorMsg('confirm password not matching password');}
        else if(fullName && email && role && password && termsAgreement){
            props.signup({fullName,email,role,phoneNumber,password,school: schoolName});
            if(!props.authError)setErrorMsg(null); 
        }
        else {setErrorMsg('Fill in all the required fields');};
    }
    if(!errorMsg && props.authError) {setErrorMsg(props.authError.message)};
    const redirectTo = (location) => {
        return (<Redirect to={location} />)
    }

    if(isLoading && errorMsg) setIsLoading(false);
    return(
        <div>
            <Spinner
            animation="border"
            variant="primary"
            className={isLoading ? 'spinner--position__center' : 'hide'}
            />
            {successMsg && !props.isLoading ? redirectTo('/dashboard') : ''}
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
                <div className="signup--form">
                    <AlertComponent isError={errorMsg ? true : false} message={errorMsg} />
                    <AlertComponent isSuccess={successMsg ? true : false } message={successMsg}/>
                    <div className="signup--form--title">
                        <Text label="Registration" className="txt txt--fontSize__large" />
                        <Text linkLabel="Instructor" linkAddress="/signup/instructor" className="txt txt--fontSize__medium" linkActiveStatus={true} />
                        <Text label="|" className="txt" />
                        <Text linkLabel="Student" linkAddress="/signup/student" className="txt txt--fontSize__medium" location={props.location} />
                    </div>
                    <div className="signup--form--rows">
                        <div className="signup--form--row">
                            <InputField type="text" id="fullName" name="fullName" placeholder="Full name" className="input__large" required={true} handleChange={handleChange} />
                        </div>
                        <div className="signup--form--row">
                            <InputField type="number" id="phoneNumber" name="phoneNumber" placeholder="Phone number" className="input__medium" required={true} handleChange={handleChange} />
                            <InputField type="text" id="email" name="email" placeholder="email" className="input__medium" required={true} handleChange={handleChange} />
                        </div>
                        <div className="signup--form--row">
                            <InputField type="password" id="password" name="password" placeholder="password" className="input__medium" required={true} handleChange={handleChange} />
                            <InputField type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" className="input__medium" required={true} handleChange={handleChange} />
                        </div>
                        <InputField 
                            type="select" 
                            id="schools" 
                            name="schoolName" 
                            selectOptions={[
                                {label:'Select a school' , value: '' },
                                {label:'KIST' , value:'KIST' }, 
                                {label:'AUCA' , value:'AUCA' }, 
                                {label: 'ULK', value: 'ULK'}
                            ]} 
                            className="input__large" 
                            handleChange={handleChange} 
                            />
                        <InputField type="checkbox" name="termsAgreement" label="I agree to REMS terms and conditions." className="signup--form--checkbox input--checkbox" handleChange={handleChange} />
                        <div className="signup--form--btn"> 
                            <Button name="Register" label="Register" handleClick={handleClick}/>   
                        </div>
                        <div className="signup--form--footer"> 
                            <Text label="Already have an account ? Sign in " linkLabel="here" linkAddress="/login" className="txt" exception={true} />
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
      authError: state.auth.authError
    }
  }
  
  const mapDispatchToProps = (dispatch)=> {
    return {
      signup: (newUser) => dispatch(signup(newUser))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Signup)
