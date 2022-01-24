import React from 'react';
import { Form, Input, Button, Typography, Row, message } from 'antd';
import './LogIn.css';
import * as api from '../../lib/api'
import logo from '../../img/logo_black.png'
const { Title } = Typography;

const required = value => (value ? undefined : 'This field is required');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

class LogIn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              values: {},
              error: {},
            };
            this.submit = this.submit.bind(this)
            this.setFieldValue = this.setFieldValue.bind(this);
            this.validators = {
              email: [required, email],
              password: [required],
            };
        }
    async submit() {
    if (this.validateAll()) {
      const values = { ...this.state.values };
      try {
        const data = await api.user.login(values)
        message.success('Registration Successful')
        sessionStorage.setItem('token', JSON.stringify(data[0]._id));
        window.location.href='/parties/'
      } catch (error) {
        message.error('Invalid email or password please try again')
      }
    }
  }
    setFieldValue(field, value) {
      this.setState({
        values: { ...this.state.values, [field]: value },
        error: { ...this.state.error, [field]: null }
      });
    }
    validateAll() {
      const errors = {};
      var valid = true;
      Object.entries(this.validators).forEach(([field, validators]) => {
        for (let i = 0; i < validators.length; ++i) {
          const error = validators[i](this.state.values[field]);
          if (error) {
            errors[field] = error;
            valid = false;
            break;
          }
        }
      });
      this.setState({ error: { ...this.state.error, ...errors } });
      return valid;
    }
  render() {
    return (
      <div className="mobile-background">
      <div className="psr-login-card">
        <Form colon={false}>
        <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ marginBottom: '8px' }}
          >
              <img className="login-logo" src={logo}/>
          </Row>
          <Title
            level={2}
            style={{ textAlign: 'center', marginTop: 0, marginBottom: 32 }}
          >
            login
          </Title>
          <Row             
            justify="center"
            >
              <Form.Item
               required
              validateStatus={
                  this.state.error.email ? 'error' : undefined
                }
                help={this.state.error.email}>
                <Input placeholder="Email" 
                value={this.state.values.email}
                onChange={e => {
                    this.setFieldValue('email', e.target.value);
                  }}/>
                </Form.Item>
          </Row>
          <Row             
            justify="center"
            >
              <Form.Item
              required
              validateStatus={
                  this.state.error.password ? 'error' : undefined
                }
                help={this.state.error.password}
              >
            <Input
              type="password"
              placeholder="Password"
              value={this.state.values.password}
              onChange={e => {
                    this.setFieldValue('password', e.target.value);
                  }}
            />
          </Form.Item>
          </Row>
          <Row justify="center">
          <Form.Item>
            <Button className='psr-primary-button' type="primary" htmlType="submit" shape="round" onClick={this.submit}>
              Login
            </Button>
          </Form.Item>
          </Row>
          <Row justify="center">
          <Form.Item className='register-button'>
          <Button className='psr-primary-button' type="primary" htmlType="submit" shape="round" onClick={()=> window.location.href='/register'}>
              Register
            </Button>
            </Form.Item>
            </Row>
        </Form>
      </div>
      </div>
    );
  }
}


export default LogIn;