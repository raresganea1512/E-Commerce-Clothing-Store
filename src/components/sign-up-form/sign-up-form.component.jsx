import { useState } from "react";
import { useDispatch } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signUpStart } from '../../store/user/user.action'

import './sign-up-form.styles.scss'

const deafaultFormFields = {
  displayName: '',
  email: '',
  password:'',
  confirmPassword:''
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(deafaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch =  useDispatch();

  const resteFormFileds = () =>{
    setFormFields(deafaultFormFields);
  }

  const handleSubmits = async (event) => {
    event.preventDefault();

    //check if password and confirmPassowrd ar the same 
    if(password !== confirmPassword){
      alert("your passwords do not match!");
      return;
    }

    try{
      dispatch(signUpStart(email ,password, displayName));
      resteFormFileds();

    }catch(error){
      // checking for firebase auth/user errors
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
      }else{
        console.log("user creations encountered an error", error);
      }
      if(error.code === 'auth/weak-password'){
        alert('Password is weak, passoword needs to be longer than 6 characters')
      }
    }
  }

  const handleChange = (event) =>{
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your Email and Password</span>
      <form onSubmit={handleSubmits}>
        <FormInput 
          label='Display name'
          type="text" 
          required 
          onChange={handleChange} 
          name="displayName" 
          value={displayName}
        />

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
        
        <FormInput 
          label ='Confirm Password'
          type='password' 
          required 
          onChange={handleChange} 
          name="confirmPassword" 
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>

    </div>
  );
}

export default SignUpForm;