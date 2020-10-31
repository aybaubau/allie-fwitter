import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

const TextFieldInput = ({ input, meta, label }) => {
  console.log(meta);
  return <TextField
    {...input}
    label={label}
  />
};

const SignUp = (props) => {
  const { handleSubmit, history } = props;

  const handleSignUp = async (formValues) => {
    console.log(formValues);
    //{ username: 'Your enterereduseRName', password: 'your password' }
    try {
      const res = await axios.post('/auth/signup', formValues);
      console.log('I AM THE SIGNUP USERS TOKEN', res.data);
      localStorage.setItem('token', res.data);
      history.push('/users');
      // sessionStorage.setItem('token', res.data);
    } catch (e) {
      throw new Error(e);
    }
  }
  return (
    <form noValidate autoComplete="off">
      <Field
        name='username'
        label='username'
        component={TextFieldInput}
      />
      <Field
        name='password'
        label='password'
        component={TextFieldInput}
      />
      <Button
        onClick={handleSubmit(handleSignUp)}
        variant="contained"
        color="primary">
        Sign Up
</Button>
    </form>
  );
};

export const WrappedSignUp = reduxForm({ form: 'signUpForm' })(SignUp);
