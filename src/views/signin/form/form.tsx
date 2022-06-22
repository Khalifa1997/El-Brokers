import '../../../index.css'
import './styles.css'
import { Form } from "antd";
// import {
//     ForgotPassText,
//     FormItem,
//     SubmitButton,
//     SwitchItem,
//     TextInput,
//     TextInputPassword
// } from './styled';

// import Flex from '../../../components/flex';
// import { Form } from 'antd';
import React from "react";
import useSigninRequest from "../hooks/useSignRequest";
import { TextInput, SubmitButton} from "./styled";

const SignForm: React.FC = (): JSX.Element => {
  const { state, handleChange, handleSubmit } = useSigninRequest();

  // const handlePush = React.useCallback(
  //   ()=> {
  //     push('/forgot-password')
  //   },
  //   [push]
  // );
  return (
    <Form
      name="normal_login"
      className="login-form"
      // initialValues={{ remember: true }}
    >
      <Form.Item>
        <TextInput
        type="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange("email")}
        />
      </Form.Item>
      <Form.Item>
        <TextInput
          type="password"
          placeholder="Password"
          onChange={handleChange("password")}
          value={state.password}
        />
      </Form.Item>
      <SubmitButton color="primary" onClick={handleSubmit}>
        Sign In
      </SubmitButton>
    </Form>
  );
};

export default SignForm;
