import React from 'react';
import { Form, Input, Button, Typography, Row, Popconfirm, message, Col, Upload } from 'antd';
import './CreateParty.css';
import logo from '../../img/logo_black.png'
import * as api from '../../lib/api'

const { Title } = Typography;
const required = value => (value ? undefined : 'This field is required');
const isNum = value => (Number(value) >= 0 ? undefined : 'The field must be a positive number');

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/JPEG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB');
  }
  return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
}

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class CreateParty extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              values: {},
              error: {},
            };
            this.submit = this.submit.bind(this)
            this.setFieldValue = this.setFieldValue.bind(this)
            this.handleChange = this.handleChange.bind(this)
            this.validators = {
                name: [required],
                attendance: [required, isNum],
              };
              this.formLayout = {
                labelCol: {
                  xs: { span: 20 },
                  sm: { span: 7 },
                  md: { span: 10 },
                  lg: { span: 9 }
                },
                wrapperCol: {
                  xs: { span: 20 },
                  sm: { span: 16 },
                  md: { span: 12 },
                  lg: { span: 15 }
                }
              };
              this.columnLayout = { xs: 24, md: 12, lg: 10, xl: 8, xxl: 6 };
        }
    async submit(){
        if (this.validateAll()) {
            const values = { ...this.state.values, 
              name: this.state.values.name,
              attendance: parseInt(this.state.values.attendance),
              picture: this.state.values.picture,
              id: JSON.parse(sessionStorage.getItem("token"))};
            try {
              const data = await api.party.create(values)
              message.success('Create Party Successful!')
              window.location.href='/parties'
            } catch (e) {
               e.response ? message.error(e.response.data.message) : message.error("Load failed please try again")
            }
          }
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
    setFieldValue(field, value) {
        this.setState({
          values: { ...this.state.values, [field]: value },
          error: { ...this.state.error, [field]: null }
        });
      }

      handleChange(info){
        if (info.file.status === 'done') {
          message.success('Upload done')
          getBase64(info.file.originFileObj, imageUrl =>
            this.setFieldValue('picture', imageUrl)
          );
        }
      };
    
  render() {
    return (
      <Form className='mobile-background' colon={false} {...this.formLayout}>
        <div className="create-party-card"> 
          <Row
              type="flex"
              align="middle"
              justify="center"
          >
              <img className="create-logo" src={logo}/>
          </Row>
          <Title level={2} className='create-title'>create party</Title>
          <Row             
            type="flex"
            align="top"
            justify="center"
            style={{ marginBottom: '16px' }}
            gutter={{ sm: 16 }}
            >
            <Col {...this.columnLayout} >
              <Form.Item
                label="Party's Name"
                required
                validateStatus={
                  this.state.error.name ? 'error' : undefined
                }
                help={this.state.error.name}
              >
                <Input
                  className="name-input"
                  value={this.state.values.name}
                  onChange={e => {
                    this.setFieldValue('name', e.target.value);
                  }}
                  maxLength={40}
                />
              </Form.Item>
              <Form.Item
                label="Attendance"
                required
                validateStatus={
                  this.state.error.attendance ? 'error' : undefined
                }
                help={this.state.error.attendance}
              >
                <Input
                  className="people-input"
                  value={this.state.values.attendance}
                  onChange={e => {
                    this.setFieldValue('attendance', e.target.value);
                  }}
                  maxLength={40}
                />
              </Form.Item>
              <Upload
                customRequest={dummyRequest}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                listType="picture"
                maxCount={1}
                >
                <Button>Choose Cover Picture</Button>
              </Upload>
            </Col>
          </Row>
          
          <div className="for-mobile">
            <Row type="flex" align="middle" justify="space-around">
            <Col {...this.columnLayout} >
              <Popconfirm
                placement="top"
                title={'Are you sure to cancel ?'}
                onConfirm={() => window.location.href='/parties'}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className='back-button'
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
                className='create-button'
                icon={'create'}
                type="primary"
                shape="round"
                size="large"
              /></Popconfirm>
              </Col>
            </Row>
          </div>
        </div>
        </Form>
    );
  }
}


export default CreateParty;