import React from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Popconfirm,
  Select,
  message,
  Checkbox,
  Typography
} from 'antd';
import logo from '../../img/logo_black.png'
import * as api from '../../lib/api'
import './Register.css';

const { Title } = Typography;
const required = value => (value ? undefined : 'This field is required');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const accepted = value => (value===true ? undefined : 'You must accept the terms and conditions to register')

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {"titleName": "Mr."},
      error: {},
    };
    this.setFieldValue = this.setFieldValue.bind(this);
    this.submit = this.submit.bind(this)
    this.matchPassword = this.matchPassword.bind(this)

    this.formLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 7 },
        md: { span: 10 },
        lg: { span: 100 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 16 },
        md: { span: 12 },
        lg: { span: 100 }
      }
    };

    this.columnLayout = { xs: 24, md: 12, lg: 10, xl: 8, xxl: 100 };
    this.validators = {
      firstName: [required],
      lastName: [required],
      email: [required, email],
      password: [required],
      confirm: [required, this.matchPassword],
      consent: [accepted]
    };
    document.title = "Register";
  }

  matchPassword(value) {
    return value === this.state.values.password
      ? undefined
      : 'Password does not match';
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
    console.log(this.state.values)
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

  async submit() {
    if (this.validateAll()) {
      const values = { ...this.state.values };
      try {
        const data = await api.user.register(values)
        message.success('Registration Successful')
        console.log(data)
        window.location.href='/'
      } catch (error) {
        message.error('Registration failed please try again')
      }
    }
  }

  render() {
    return (
      <Form className='mobile-background-2' colon={false} {...this.formLayout}>
        <div className="psr-register-card"> 
          <Row
            type="flex"
            align="middle"
            justify="center"
          >
              <img className="register-logo" src={logo}/>
          </Row>
          <Row
            type="flex"
            align="middle"
            justify="center"
            className="text-title"
            style={{ marginBottom: '16px' }}
          >
            Register
          </Row>

          <Row
            type="flex"
            align="top"
            justify="center"
            style={{ marginBottom: '16px' }}
            gutter={{ sm: 16 }}
          >
            <Col {...this.columnLayout}>
              <Form.Item
                label="First name"
                required
                validateStatus={
                  this.state.error.firstName ? 'error' : undefined
                }
                help={this.state.error.firstName}
              >
                <Input
                  className='register-input'
                  addonBefore={
                    <Select defaultValue='Mr.'onChange={(value) => this.setFieldValue('titleName', value)}>
                      <Select.Option value="Mr.">
                        Mr.
                      </Select.Option>
                      <Select.Option value="Ms.">
                        Ms.
                      </Select.Option>
                      <Select.Option value="Mrs.">
                        Mrs.
                      </Select.Option>
                    </Select>
                  }
                  value={this.state.values.firstName}
                  onChange={e => {
                    this.setFieldValue('firstName', e.target.value);
                  }}
                  maxLength={40}
                />
              </Form.Item>
              <Form.Item
                label="Last name"
                required
                validateStatus={
                  this.state.error.lastName ? 'error' : undefined
                }
                help={this.state.error.lastName}
              >
                <Input
                  className="register-input"
                  value={this.state.values.lastName}
                  onChange={e => {
                    this.setFieldValue('lastName', e.target.value);
                  }}
                  maxLength={40}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                required
                validateStatus={this.state.error.email ? 'error' : undefined}
                help={this.state.error.email}
              >
                <Input
                  className="register-input"
                  type="email"
                  maxLength={50}
                  value={this.state.values.email}
                  onChange={e => {
                    this.setFieldValue('email', e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                required
                validateStatus={this.state.error.password ? 'error' : undefined}
                help={this.state.error.password}
              >
                <Input.Password
                  className="register-input"
                  type="password"
                  value={this.state.values.password}
                  onChange={e => {
                    this.setFieldValue('password', e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                required
                validateStatus={this.state.error.confirm ? 'error' : undefined}
                help={this.state.error.confirm}
              >
                <Input.Password
                  className="register-input"
                  type="password"
                  value={this.state.values.confirm}
                  onChange={e => {
                    this.setFieldValue('confirm', e.target.value);
                  }}
                />
              </Form.Item>
            <Form.Item
                validateStatus={this.state.error.consent ? 'error' : undefined}
                help={this.state.error.consent}
              >
                <Checkbox 
                  className='consent-checkbox'
                  onChange={e =>{
                  this.setFieldValue('consent', e.target.checked);
                }}>I agree to the terms and conditions</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <div className="for-mobile-register">
            <Row type="flex" align="middle" justify="space-around">
              <Popconfirm
                placement="top"
                title={'Are you sure to cancel ?'}
                onConfirm={() => window.location.href='/'}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className={`psr-secondary-button`}
                  icon="back"
                  type="primary"
                  shape="round"
                  size="large"
                />
              </Popconfirm>
              <Popconfirm
                placement="top"
                title={'Are you sure to submit ?'}
                onConfirm={this.submit}
                okText="Yes"
                cancelText="No"
              >
              <Button
                className={`psr-primary-button`}
                icon={'save'}
                type="primary"
                shape="round"
                size="large"
              /></Popconfirm>
            </Row>
          </div>
        </div>
      </Form>
    );
  }
}

export default Register;
