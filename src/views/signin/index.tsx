
import React from "react";

import Form from "./form";
import { Layout } from "antd";

const { Content } = Layout;
const SignIn = () => {
  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          justifyContent:"center",
          flexDirection:'column',
          // justifyContent: "center",
          alignItems: "center",
        }}
        className="ContentWrapper"
      >
        <Form />
      </Content>
    </Layout>
  );
};

export default SignIn;
