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

const SignIn = (props) => {
  const { handleSubmit, history } = props;

  const handleSignIn = async (formValues) => {
    console.log(formValues);
    //{ username: 'Your enterereduseRName', password: 'your password' }
    try {
      const res = await axios.post('/auth/signin', formValues);
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
        onClick={handleSubmit(handleSignIn)}
        variant="contained"
        color="primary">
        Sign In
</Button>
    </form>
  );
};

export const WrappedSignIn = reduxForm({ form: 'signInForm' })(SignIn);
