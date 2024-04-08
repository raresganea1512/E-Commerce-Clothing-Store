import { useState } from "react";
import { useDispatch } from 'react-redux'

import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import './sign-in-form.styles.scss'

const deafaultFormFields = {
  email: '',
  password:''
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(deafaultFormFields);
  const { email, password } = formFields

  const resteFormFileds = () =>{
    setFormFields(deafaultFormFields);
  }

  const signInWithGoogle = async () => {
    try {
      dispatch(googleSignInStart());
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Google sign-in popup closed by the user');
      } else {
        console.error('An error occurred during Google sign-in:', error.message);
      }
    }
  };

  const handleSubmits = async (event) => {
    event.preventDefault();

    try{
      dispatch(emailSignInStart(email, password));
      resteFormFileds();
    }catch(error){
      
      switch(error.code){
        case 'auth/wrong-password': 
          alert('Wrong Password!');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
      console.log(error)
    }

  }

  const handleChange = (event) =>{
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account ? </h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmits}>
        <FormInput 
          label='Email'
          type="email" 
          required 
          onChange={handleChange} 
          name="email" 
          value={email} 
        />

        <FormInput 
          label ='Password'
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password} 
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType={BUTTON_TYPES_CLASSES.google} type='button' onClick={signInWithGoogle}>Google sign in </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;



