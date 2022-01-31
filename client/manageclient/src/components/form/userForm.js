import React from "react";
import { Form, Button, Col, Row, Input, Select, Radio, Cascader } from "antd";
import Events from "../../event/busEvent";
import Mail from "../../config/mail";
import City from "../../config/city";
import UpdataPic from "../updata/updata";
import config from "../../config/config";
import Bussiness from "../../bussiness/bussiness";
const { ServerApi, StorageName, FilePath, EventName } = config;
const { Option } = Select;
export default class userForm extends React.Component {
  formRef = React.createRef();
  state = {};
  componentDidMount() {
    this.props.onFormRef(this);
    Events.on(EventName.ADD_USER, this.addUser);
    Events.on(EventName.UPDATE_USER, this.updateUser);
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue(this.state.record);
  }
  updateUser = (e) => {
    this.setState(
      {
        formType: "updata",
        record: e,
      },
      () => {
        this.updateChild.updatePic(FilePath + this.state.record.headPic);
      }
    );
  };
  addUser = (e) => {
    this.setState({
      formType: "add",
      record: e,
    });
  };
  getPic = (data) => {
    this.formRef.current.setFieldsValue({
      headPic: data.headPath,
    });
  };
  delPic = () => {
    this.formRef.current.setFieldsValue({
      headPic: null,
    });
  };
  sendData(val) {
    if (this.state.record._id) {
      val._id = this.state.record._id;
    }
    val.token = this.$utils.getStorage(StorageName.token);
    let _url =
      this.state.formType === "add"
        ? ServerApi.user.addUser
        : ServerApi.user.updateUser;
    Bussiness.sendInfo.bind(this, _url, val)();
  }
  render() {
    return (
      <Form
        layout="vertical"
        hideRequiredMark
        ref={this.formRef}
        onFinish={this.sendData.bind(this)}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item name="headPic" label="picture">
              <UpdataPic
                onUpdateRef={(child) => {
                  this.updateChild = child;
                }}
                picTarget={this.getPic}
                picDelete={this.delPic}
              ></UpdataPic>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="userType"
              label="userType"
              rules={[{ required: true, message: "Please select user type" }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="admin">Admin</Radio.Button>
                <Radio.Button value="user">User</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="username"
              label="username"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input placeholder="Please enter username" maxLength="10" allowClear />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="password"
              label="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password
                type="password"
                placeholder="Please enter password"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phoneNum" label="phoneNumber">
              <Input placeholder="Please enter Phone Number" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item
              name="gender"
              label="gender"
              rules={[{ required: true, message: "Please select Gender" }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="man">man</Radio.Button>
                <Radio.Button value="woman">woman</Radio.Button>
                <Radio.Button value="none">Rather don't tell</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Input.Group compact>
              <Form.Item
                name="mailaddress"
                label="email"
                rules={[{ required: true, message: "Please enter a valid email" }]}
              >
                <Input defaultValue="" allowClear />
              </Form.Item>
              <Form.Item
                label="Email type"
                name="mailurl"
                rules={[{ required: true, message: "Please select email type" }]}
              >
                <Select style={{ width: 150 }}>
                  {(() => {
                    return Mail.address.map((item) => {
                      return (
                        <Option key={item.mail} value={item.mail}>
                          {item.mail}
                        </Option>
                      );
                    });
                  })()}
                </Select>
              </Form.Item>
            </Input.Group>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={16}>
            <Input.Group compact>
              <Form.Item name="alladdress" label="MailingAddress">
                <Cascader options={City} placeholder="Please enter Mailing Address" />
              </Form.Item>
              <Form.Item name="address" label="Address">
                <Input placeholder="Please enter Address" allowClear />
              </Form.Item>
            </Input.Group>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="descript" label="Description">
              <Input.TextArea maxLength="200" rows={4} placeholder="Description" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
