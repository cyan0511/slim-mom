import React, { useContext, useState } from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import * as yup from 'yup';
import { Error, Input, List } from 'components/Form/Form.styled';
import { Button } from 'components/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLogInUserMutation, useRegisterUserMutation } from 'redux/auth';
import { useDispatch } from 'react-redux';
import { setCredentials, setUser } from 'redux/authSlice';
import {
  ButtonWrapper,
  H2,
  Wrapper,
} from '../components/RegisterPage/RegisterPage.styled';
import { WrapperWithFruits } from 'components/RegisterPage/RegisterPage.styled';
import { ThemeContext } from 'components/Context/Context';
import { routes } from 'components/Routes/routes';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, 'Name must be more than or equal to 4 letters')
    .max(50, 'Name must be less than or equal to 50 letters')
    .required('Name is required field'),
  password: yup
    .string()
    .min(6, 'Password must be more than or equal to 6 letters')
    .max(16, 'Password must be less than or equal to 16 letters')
    .required('Password is required field'),
  email: yup
    .string()
    .email('Invalid email')
    .typeError('Email must be an email')
    .required('Email is required field'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { isNightMode } = useContext(ThemeContext);
  const location = useLocation();
  const userDataForRegister = location.state?.userDataForRegister;
  localStorage.setItem('params', JSON.stringify(userDataForRegister));

  const navigate = useNavigate();
  const [registerUser, { status }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const [loginUser] = useLogInUserMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Submitting form...');
    const userDataForRegisterAll = { ...values, ...userDataForRegister };
    try {
      const user = await registerUser(userDataForRegisterAll).unwrap();
      console.log('User registered:', user);
      const loginValues = { ...values };
      delete loginValues.name;
      const userLogin = await loginUser(loginValues).unwrap();
      console.log('User logged in:', userLogin);
      dispatch(setCredentials(user));
      dispatch(setUser(userLogin));
      console.log('Navigating to diary...');
      navigate(routes.diary);
      resetForm();
    } catch (error) {
      console.error('Error during registration or login:', error);
    }
  };
  const handleClick = () => {
    navigate(routes.login);
  };
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <WrapperWithFruits>
      {isNightMode}
      {status === 'pending'}
      <Wrapper>
        <H2>Register</H2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <Form>
            <List style={{ display: 'grid', gridTemplateColumns: 'revert' }}>
              <li>
                <label>
                  <Input type="name" name="name" placeholder="Name *" />
                  <ErrorMessage name="name" component={Error} />
                </label>
              </li>

              <li>
                <label>
                  <Input type="email" name="email" placeholder="Email *" />
                  <ErrorMessage name="email" component={Error} />
                </label>
              </li>

              <li>
                <label style={{ position: 'relative' }}>
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password *"
                    maxLength="16"
                  />
                  {isShowPassword ? (
                    <AiFillEyeInvisible
                      onClick={handleShowPassword}
                      style={{
                        position: 'absolute',
                        top: '0px',
                        left: '250px',
                        color: '#FC842D',
                      }}
                    />
                  ) : (
                    <AiFillEye
                      onClick={handleShowPassword}
                      style={{
                        position: 'absolute',
                        top: '0px',
                        left: '250px',
                        color: '#FC842D',
                      }}
                    />
                  )}
                  <ErrorMessage name="password" component={Error} />
                </label>
              </li>
            </List>
            <ButtonWrapper>
              <Button type="submit" full={true} style={{ width: '200px' }}>
                Register
              </Button>
              <div onClick={handleClick}>
                <Button type="button" full={false}>
                  Log In
                </Button>
              </div>
            </ButtonWrapper>
          </Form>
        </Formik>
      </Wrapper>
    </WrapperWithFruits>
  );
};

export default RegisterPage;
