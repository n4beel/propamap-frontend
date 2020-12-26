import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Typography } from 'antd';
import Link from 'next/link';

import './LoginForm.scss';

import { TextBox, Button } from '../../../html';

import formValidator from '../../../../utils/services/formValidator';
import notification from '../../../../utils/services/alert';
import accountValidations from '../../../../utils/validations/accountValidations';
import { SignInAction } from '../../../../redux/actions/account';
import { connect } from 'react-redux';
import {
  UserDispatch,
  ProfileDispatch
} from '../../../../redux/actions/system';

const { Item } = Form;
const { Title } = Typography;

const LoginForm = ({ onUpdate, onSuccess, setUser, visible }) => {
  const initialForm = {
    email: {
      label: 'Email address',
      placeholder: 'Email address',
      showLabel: false,
      value: '',
      autoFocus: true,
      errorMessage: 'Email is required',
      validator: email => accountValidations.validateEmail(email),
      regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: true,
      id: 'email',
      type: 'text',
      onChange: event => _onChange(event)
    },
    password: {
      label: 'Pasword',
      placeholder: 'Password',
      showLabel: false,
      value: '',
      required: true,
      id: 'password',
      type: 'password',
      onChange: event => _onChange(event)
    }
  };

  const [saveLoading, setSaveLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initialForm);


  useEffect(()=>{
    console.log('------initial chala-----')
    let newForm = loginForm;
    newForm["email"].value = "";
    newForm["password"].value = "";
    setLoginForm({ ...newForm });
  },[visible])
  // Events

  const _onChange = event => {
    let newForm = loginForm;
    newForm[event.target.name].value = event.target.value;
    newForm[event.target.name].error = false;
    setLoginForm({ ...newForm });
  };

  const _onClickSignup = () => {
    onUpdate();
  };

  const _onClickLogin = async event => {
    event.preventDefault();
    const { isValid, form } = formValidator(loginForm);

    setLoginForm({ ...form });

    if (isValid) {
      setSaveLoading(true);
      try {
        const user = {
          email: loginForm.email.value,
          password: loginForm.password.value
        };
        await signIn(user);
      } catch (err) { }
      setSaveLoading(false);
    }
  };

  // Utils

  const signIn = async user => {
    let res = await SignInAction(user);
    if (res.result) {
      if (res.result) {
        setUser(res.body);
        notification.success("Login Successful.")
      }
      onSuccess();
    } else {
      notification.error(res.message || 'Signin failed!');
    }
  };

  return (
    <div className='cmp-login-form'>
      <Title level={4}>Login</Title>
      <Row>
        <Col span={24}>
          {/* <Col span={24}>
            <div className='fancy'>
              <span>Login with social media</span>
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button
                  block={true}
                  title={'Login with Facebook'}
                  size='large'
                  className='social-btn-fb'
                  iconType='brand'
                  icon='facebook-f'
                />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button
                  block={true}
                  title={'Login with Google'}
                  className='social-btn-google'
                  size='large'
                  iconType='brand'
                  icon='google-plus-g'
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className='fancy'>
              <span>Or</span>
            </div>
          </Col> */}
          <Form onSubmit={_onClickLogin} noValidate>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Item>
                  <TextBox {...loginForm.email} />
                </Item>
              </Col>
              <Col span={24}>
                <Item>
                  <TextBox {...loginForm.password} />
                </Item>
              </Col>
              <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                <Item>
                  <Button
                    title={'Login'}
                    block={true}
                    category='primary'
                    size='large'
                    type='submit'
                    loading={saveLoading}
                  />
                </Item>
              </Col>
              <Col
                xl={{ offset: 5, span: 9 }}
                lg={{ offset: 5, span: 9 }}
                md={{ offset: 5, span: 9 }}
                sm={24}
                xs={24}>
                <Item>
                  Not registered?&nbsp;
                  <span onClick={_onClickSignup}>
                    <Link>
                      <a>Signup</a>
                    </Link>
                  </span>
                </Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(UserDispatch(user))
});

const connectedComponent = connect(null, mapDispatchToProps)(LoginForm);
export { connectedComponent as LoginForm };
