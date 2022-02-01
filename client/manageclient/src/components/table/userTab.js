import React from "react";
import { Button, Popconfirm } from "antd";
import config from "../../config/config";

const { FilePath } = config;
export default class UserTable {
  constructor(_this) {
    return [
      { align: "center", title: "Username", dataIndex: "username", width: 200 },
      {
        align: "center",
        title: "Email",
        dataIndex: "mailaddress",
        width: 100,
        render: (text, data) => {
          return <div>{text + data.mailurl}</div>;
        },
      },
      {
        align: "center",
        title: "Phone",
        dataIndex: "phoneNum",
        width: 100,
      },
      {
        align: "center",
        title: "Password",
        dataIndex: "password",
        width: 250,
      },
      {
        align: "center",
        title: "Picture",
        dataIndex: "headPic",
        width: 100,
        render: (imgPath) => {
          return (
            <img
              src={FilePath + imgPath}
              alt=""
              style={{ width: 60, margin: "0 auto" }}
            />
          );
        },
      },
      {
        align: "center",
        title: "gender",
        dataIndex: "sex",
        width: 60,
        render: (sex) => {
          return <div>{sex === "man" ? "man" : "woman"}</div>;
        },
      },
      {
        align: "center",
        title: "Mailing Address",
        dataIndex: "alladdress",
        width: 200,
        render: (text, data, index) => {
          return <div>{text.join("-") + data.address}</div>;
        },
      },
      {
        align: "center",
        title: "Description",
        dataIndex: "descript",
        width: 200,
      },
      {
        align: "center",
        title: "User Type",
        dataIndex: "userType",
        width: 100,
        render: (type) => {
          return <div>{type === "admin" ? "Admin" : "User"}</div>;
        },
      },
      {
        align: "center",
        title: "Register Time",
        dataIndex: "time",
        width: 200,
        render: (time) => {
          return new Date(time).toLocaleString();
        },
      },
      {
        align: "center",
        title: "Operation",
        width: 200,
        fixed: "right",
        render: (record) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={_this.clickHandler.bind(_this, record, "change")}
              >
                Change
              </Button>
              <Popconfirm
                title="Confirm delete？"
                onConfirm={_this.clickHandler.bind(_this, record, "delete")}
                okText="Yes"
                cancelText="No"
                disabled={record.userType === "admin" ? true : false}
              >
                <Button
                  type="danger"
                  disabled={record.userType === "admin" ? true : false}
                >
                  Delete
                </Button>
              </Popconfirm>
              <Button
                disabled={record.userType === "admin" ? true : false}
                type={record.isactive ? "danger" : "primary"}
                onClick={_this.clickHandler.bind(_this, record, "allow")}
              >
                {record.isactive ? "Prohibited" : "Allow"}
              </Button>
            </div>
          );
        },
      },
    ];
  }
}
