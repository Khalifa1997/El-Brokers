import { Text, Title } from "./styled";

import Flex from "../../../components/flex";
import FormInput from "./form";
import React from "react";

const SignForm: React.FC = (): JSX.Element => {
  
  // const handlePush = React.useCallback(
  //   ()=> {
  //     push('/create-company')
  //   },
  //   [push]
  // );

  return (
    <Flex
    width="800px"
    height="370px"
    margin="40px auto 20px"
    background="#ffff"
    border="1px solid #ebeaea"
    radius="20px"
    padding="20px 20px 20px 20px"
    alignItmes="center"
    column={true}
     >
      <Title children={"Sign In"} />
      <Text children={"Use your Registered Email and Password to get in your Company Dashboard"} />
      <FormInput />
    
    </Flex>
  );
};

export default SignForm;
