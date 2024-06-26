import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const deafaultFormFields = {
  email: '',
  password:''
}

const SignInForm = () => {
  
  const [formFields, setFormFields] = useState(deafaultFormFields);
  const { email, password } = formFields

  const resteFormFileds = () =>{
    setFormFields(deafaultFormFields);
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
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
      await signInAuthUserWithEmailAndPassword(email, password);
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
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmits}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;



