import React from "react";
import UserForm from "../form/userForm";
import ShopForm from "../form/shopForm";
import OrderForm from "../form/orderForm";
import { Drawer, Button } from "antd";

export default class ListDrower extends React.Component {
  state = {
    visible: false,
    record: {},
    formEle: this.props.formType,
  };
  componentDidMount() {
    this.props.onDrowerRef(this);
  }
  showDrawer = (formType) => {
    this.setState({
      formType,
      visible: true,
    });
  };
  onClose = () => {
    this.formChild.formRef.current.resetFields();
    this.formChild.setState({
      record: null,
    });
    this.setState({
      visible: false,
    });
  };
  checkFormType() {
    switch (this.state.formType) {
      case "add":
        return "Add user";
      case "updata":
        return "Update information";
      case "addShop":
        return "Add Product";
      case "updataShop":
        return "Update Product";
      case "addOrder":
        return "Add Order";
      default:
        break;
    }
  }
  render() {
    return (
      <Drawer
        title={this.checkFormType()}
        width={720}
        onClose={this.onClose}
        visible={this.state.visible}
        forceRender //prevent this.formRef.current = nulls
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 20 }}>
              Cancel
            </Button>
          </div>
        }
      >
        {this.state.formEle === "user" ? (
          <UserForm
            getList={this.props.getList}
            onClose={this.onClose}
            onFormRef={(child) => {
              this.formChild = child;
            }}
          ></UserForm>
        ) : this.state.formEle === "shop" ? (
          <ShopForm
            getList={this.props.getList}
            onClose={this.onClose}
            onFormRef={(child) => {
              this.formChild = child;
            }}
          ></ShopForm>
        ) : (
          <OrderForm
            getList={this.props.getList}
            onClose={this.onClose}
            onFormRef={(child) => {
              this.formChild = child;
            }}
          ></OrderForm>
        )}
      </Drawer>
    );
  }
}
