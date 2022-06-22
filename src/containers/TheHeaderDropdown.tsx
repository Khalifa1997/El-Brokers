import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import React from "react";
import { useHistory } from "react-router-dom";
import useLogoutHook from '../hooks/logoutHook'

const TheHeaderDropdown = () => {
const {handleLogout,success} =useLogoutHook();
const { push } = useHistory();
 const Logout = React.useCallback(() => {
   handleLogout();
   if(success)
    return push("/signin");
 },
  [handleLogout, push, success])
 
  return (
    <CDropdown inNav className="c-header-nav-items mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
        <CIcon name={"cilSettings"} size={"xl"}></CIcon>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem  onClick={Logout}> 
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
