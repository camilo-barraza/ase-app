import React, { useEffect } from 'react';
import styled from 'styled-components';
import { authTokenKey } from '../../config/constants';
import { routes } from '../../config/routes-config';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  :focus {
    outline: none;
  }
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Header = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SignInButton = styled(Button)`
  height: 40px;
  padding: 0 40px;
  margin-top: 40px;
  font-size: 13px;
  border-radius: 3px;
  box-shadow: 0 4px 5px 0 rgba(16, 31, 60, 0.1);
  background-color: ${props => props.theme.blue20};
  font-weight: bold;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Label = styled.div`
  font-size: 17px;
  margin-bottom: 10px;
`;

export const Container = styled.div`
  width: 400px;
  padding: 40px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px ${props => props.theme.gray50};
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 3px;
  font-size: 15px;
`;

const USER_TOKEN = process.env.REACT_APP_USER_TOKEN;

const SignIn = () => {
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem(authTokenKey);
    if (isLoggedIn) window.location.assign(routes.default);
  }, []);

  const mockSignIn = () => {
    sessionStorage.setItem(authTokenKey, USER_TOKEN);
    setTimeout(() => {
      window.location.assign(routes.default);
    }, 500);
  };

  return (
    <div className='w-100 d-flex align-items-center justify-content-center'>
      <Container>
        <Header className='mt-3 mb-3'> Sign In2</Header>
        <Wrapper>
          <Label> Username </Label>
          <div>
            <Input disabled value='valid_user' className='w-100' />
          </div>
          <Label className='mt-3'> Password </Label>
          <div>
            <Input disabled type='password' className='w-100' value='validpassword' />
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <div className='d-flex'>
              <SignInButton onClick={mockSignIn} type='submit'>
                Sign in
              </SignInButton>
            </div>
          </div>
        </Wrapper>
      </Container>
    </div>
  );
};

export default SignIn;
