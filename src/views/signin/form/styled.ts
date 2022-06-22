import { Button, Form, Input, Switch, Typography } from "antd";
import styled from "styled-components";

export const Title = styled(Typography.Title)`
  color: #464343;
  font-family: Cairo;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 39px;
`;
export const Text = styled(Typography.Text)`
  font-family: Cairo;
  font-size: 22px;
  font-weight: 400;
`;

export const TextInput = styled(Input)`
  width: 331px;
  height: 43px;
  border-radius: 27px;
  border: 1px solid #e4e4e4;
  background-color: #ffffff;
  padding: 0 16px;
  margin-top: 5px;
  color: #000;
  font-family: Cairo;
  font-size: 16px;
  font-weight: 400;
  &:hover,
  &:focus {
    border: 1px solid #8c03f9;
    border-color: #8c03f9 !important;
    border-radius: 27px;
    box-shadow: none;
  }
`;
//   export const TextInput = styled(Input)`
//   font-family: Cairo;
//   font-size: 1.6rem;
//   font-weight: 400;
//   line-height: 15px;
//   box-shadow: none !important;
//   height: 44px;
//   width: ${({ width }) => width || '100%'};
//   border-radius: 22px;
//   padding: 7px 23px;
// `;
export const TextInputPassword = styled(Input.Password)`
  width: 3310px !important;
  height: 43px;
  border-radius: 27px;
  border: 1px solid #e4e4e4;
  background-color: #ffffff;
  padding: 0 16px;
  margin-top: 53px;
  color: #cfcbcb;
  font-family: Cairo;
  font-size: 14px;
  font-weight: 400;
  &:hover,
  &:focus {
    border: 1px solid #8c03f9;
    border-color: #8c03f9 !important;
    border-radius: 27px;
    box-shadow: none;
  }
  .ant-input-password {
    width: 3310px !important;
    height: 43px;
    border-radius: 27px;
    border: 1px solid #e4e4e4;
    background-color: #ffffff;
    padding: 0 16px;
    margin-top: 5px;
    color: #cfcbcb;
    font-family: Cairo;
    font-size: 14px;
    font-weight: 400;
  }
`;
export const SubmitButton = styled(Button)`
  width: 331px;
  height: 43px;
  border-radius: 27px;
  background-color: #8c03f9;
  color: #ffffff;
  border: none;
  font-family: Cairo;
  font-size: 18px;
  font-weight: 700;
  margin-top: 25px;
  &:hover,
  &:focus {
    background-color: #8c03f9;
    color: #ffffff;
  }
`;

export const FormItem = styled(Form.Item)`
  justify-content: space-between;
`;

export const SwitchItem = styled(Switch)`
  margin-right: 5px;
  &:focus {
    background-color: #8c03f9 !important;
  }
  .ant-switch-checked {
    background-color: #8c03f9 !important;
  }
`;

export const ForgotPassText = styled(Button)`
  color: #8c03f9;
  font-family: "Cairo Semi Bold";
  font-size: 14px;
  font-weight: 600;
  margin-top: 3px;
  &:hover,
  &:focus {
    color: #8c03f9;
  }
`;

export const LinkBtn = styled(Button)`
  color: #8c03f9;
  font-family: "Cairo Semi Bold";
  font-size: 14px;
  font-weight: 600;

  &:hover,
  &:focus {
    color: #8c03f9;
  }
`;
