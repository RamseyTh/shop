import React from "react";
import { Button, Popconfirm, Select } from "antd";
import ShopType from "../../config/shopType";
const { orderState } = ShopType;
const { Option } = Select;
export default class OrderTable {
  static createSel(text, data) {
    return (
      <Select
        defaultValue={text}
        onChange={this.clickHandler.bind(this, data, "state")}
        style={{ width: 100 }}
      >
        {orderState.map((item) => {
          return (
            <Option key={item.name} value={item.val}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    );
  }
  constructor(_this) {
    return [
      { align: "center", title: "Order Number", dataIndex: "orderId", width: 50 },
      {
        align: "center",
        title: "Order State",
        dataIndex: "orderState",
        width: 60,
        render(text, data) {
          return <div>{OrderTable.createSel.call(_this, text, data)}</div>;
        },
      },
      { align: "center", title: "Username", dataIndex: "username", width: 50 },
      { align: "center", title: "Mailing Address", dataIndex: "address", width: 80 },
      { align: "center", title: "Phone Number", dataIndex: "phoneNum", width: 80 },
      {
        align: "center",
        title: "order time",
        dataIndex: "orderTime",
        width: 100,
        render: (time) => {
          return new Date(time).toLocaleString();
        },
      },

      {
        align: "center",
        title: "Total",
        dataIndex: "orderPrice",
        width: 50,
        render(text) {
          return <div>{text}$</div>;
        },
      },
      {
        align: "center",
        title: "Move",
        width: 50,
        fixed: "right",
        render: (record) => {
          return (
            <div>
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
            </div>
          );
        },
      },
    ];
  }
}
