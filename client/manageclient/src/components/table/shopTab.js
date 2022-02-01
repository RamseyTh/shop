import React from "react";
import { Button, Popconfirm } from "antd";
import config from "../../config/config";
import ShopType from "../../config/shopType";
const { shopType, picType } = ShopType;
const { FilePath } = config;
export default class ShopTable {
  constructor(_this) {
    return [
      { align: "center", title: "Shop", dataIndex: "shopName", width: 80 },
      {
        align: "center",
        title: "Product Type",
        dataIndex: "shopType",
        width: 50,
        render: (text) => {
          return <div>{shopType[text].name}</div>;
        },
      },
      {
        align: "center",
        title: "Product Image",
        dataIndex: "picType",
        width: 50,
        render: (text) => {
          return <div>{picType[text].name}</div>;
        },
      },
      {
        align: "center",
        title: "Product Images",
        dataIndex: "shopPic",
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
        title: "Stock",
        dataIndex: "shopNum",
        width: 50,
        render: (num) => {
          return <div>{num}</div>;
        },
      },
      {
        align: "center",
        title: "Price",
        dataIndex: "shopPrice",
        width: 50,
        render: (price) => {
          return <div>{price + "$"}</div>;
        },
      },
      {
        align: "center",
        title: "Weight/lb",
        dataIndex: "shopScale",
        width: 50,
        render: (price) => {
          return <div>{price + "lb"}</div>;
        },
      },
      {
        align: "center",
        title: "Type",
        dataIndex: "taste",
        width: 50,
      },
      {
        align: "center",
        title: "Location",
        dataIndex: "address",
        width: 80,
      },
      {
        align: "center",
        title: "Expiration Date",
        dataIndex: "expiryDate",
        width: 50,
      },
      {
        align: "center",
        title: "Listing Date",
        dataIndex: "time",
        width: 100,
        render: (time) => {
          return new Date(time).toLocaleDateString();
        },
      },
      {
        align: "center",
        title: "Move",
        width: 110,
        fixed: "right",
        render: (record) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={_this.clickHandler.bind(_this, record, "change")}
              >
                Update
              </Button>
              <Popconfirm
                title="Confirme delete？"
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
                {record.isactive ? "Block" : "Unlock"}
              </Button>
            </div>
          );
        },
      },
    ];
  }
}
