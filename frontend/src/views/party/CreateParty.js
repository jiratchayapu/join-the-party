import React from 'react';
import { Form, Icon, Input, Button, Typography, Row, Popconfirm, message, Col,Upload } from 'antd';
import './CreateParty.css';
import { UploadOutlined } from '@ant-design/icons';
import * as api from '../../lib/api'
const { Title } = Typography;
const required = value => (value ? undefined : 'This field is required');
const isNum = value => (Number(value) >= 0 ? undefined : 'The field must be a positive number');

class CreateParty extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              values: {},
              error: {},
            };
            this.submit = this.submit.bind(this)
            this.setFieldValue = this.setFieldValue.bind(this)
            //this.getBase64 = this.getBase64.bind(this)
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
            const values = { ...this.state.values, id: JSON.parse(sessionStorage.getItem("token"))};
            console.log(values)
            try {
              const data = await api.party.create(values)
              message.success('Registration Successful')
              console.log(data)
              window.location.href='/parties'
            } catch (error) {
              message.error('Registration failed please try again')
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
      if(field == "attendance" && Number(value) >= 0){
        this.setState({
          values: { ...this.state.values, [field]: parseInt(value) },
          error: { ...this.state.error, [field]: null }
        });
      }
      else{
        this.setState({
          values: { ...this.state.values, [field]: value },
          error: { ...this.state.error, [field]: null }
        });
      }
        
      }

    onImageChange(event) {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setFieldValue('picture', URL.createObjectURL(img));
        console.log(URL.createObjectURL(img))
      }
    }
    
  render() {
    return (
      <Form className='mobile-background' colon={false} {...this.formLayout}>
        <div className="create-party-card"> 
          <Title className='create-title'>Create Party</Title>
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
              {//<img src={this.state.values.picture} />
              }
              <input type="file" className="cover-picture" onChange={(e) => this.onImageChange(e)} />
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