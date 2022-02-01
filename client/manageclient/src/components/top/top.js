import React from "react";
import "./top.less";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import config from "../../config/config";
let { StorageName } = config;
export default class Top extends React.Component {
  render() {
    return (
      <div className="header">
        <img src="favicon.ico" alt="title" />
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                {/* <Link to="/login"> */}
                <Button danger onClick={this.exitLogin} type="primary">
                  Log out
                </Button>
                {/* </Link> */}
              </Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link" href="#aaa">
            Welcome Admin
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  }
  exitLogin = () => {
    this.$utils.clearStorage(StorageName.token);
    this.props.fn();
  };
}
