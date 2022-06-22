import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../store";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useTypedSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      unfoldable
      style={{ background: "#8C03F9" }}
      onShowChange={(val: boolean) =>
        dispatch({ type: "set", sidebarShow: val })
      }
    >
      <CSidebarBrand to="/">
        <CIcon className="c-sidebar-brand-full p-lg-1" height={45} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSwitch,
            CSidebarNavTitle,
          }}
        />
        <div
          className="bg-white w-100 mt-3 mb-4"
          style={{ opacity: 0.2, height: 1 }}
        />
        <CSidebarNavItem
          label
          icon="cil-settings"
          fontIcon="cil-settings"
          className="px-lg-3 d-flex justify-content-between"
        >
          Maintenance
          <div>
            <CSwitch size="sm" color="primary" variant="3d" />
          </div>
        </CSidebarNavItem>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
