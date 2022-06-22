import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ImportantLinks = () => {
  return (
    <CDropdown inNav className="c-header-nav-items mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CHeaderNavLink>Important Links</CHeaderNavLink>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon name="cib-bitbucket" className="mfe-2" />
          Bitbucket
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-signal" className="mfe-2" />
          OneSignal
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-apple" className="mfe-2" />
          Apple Developer
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-google-play" className="mfe-2" />
          Google PlayStore
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-firebase" className="mfe-2" />
          Firebase Console
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-facebook" className="mfe-2" />
          Facebook
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-twitter" className="mfe-2" />
          Twitter
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cib-gmail" className="mfe-2" />
          Mail
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default ImportantLinks;
