import React from "react";
import { CFooter, CLink } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="ml-auto">
        <CLink href="http://anspire.agency/" target="_blank">
          Created by Anspire Agency
        </CLink>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
