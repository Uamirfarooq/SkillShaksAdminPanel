import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const FormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  width: 500px;
  margin: auto;
  margin-top: 100px;

  & > .MuiTextField-root {
    width: 100%;
  }

  & > .MuiButton-root {
    width: 100%;
    height: 50px;
    background-color: #2a72cc;

    :hover {
      background-color: #0d52a7;
    }
  }
`;

const SignupPage = () => {
  const init = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  };



  return (
    <div>
      <FormBox>
        <h1>Sign up Page</h1>
        <TextField
          label="First Name"
          variant="outlined"
          name="first_name"

        />
        <TextField
          label="Last Name"
          variant="outlined"
          name="last_name"
        />
        <TextField
          label="Username"
          variant="outlined"
          name="username"
        />
        <TextField
          label="Email Id"
          variant="outlined"
          name="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
        />
        <Button variant="contained" color="primary">
          Create my Account!
        </Button>
      </FormBox>
    </div>
  );
};

export default SignupPage;
