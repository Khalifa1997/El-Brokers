import "../../scss/style.scss";

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CDataTable,
  CRow,
  CSpinner,
  CWidgetIcon,
  CForm,
  CModal,
  CModalBody,
  CFormGroup,
  CLabel,
  CInput,
  CModalHeader,
  CModalFooter,
} from "@coreui/react";
import { FaEye } from "react-icons/fa";
import CIcon from "@coreui/icons-react";
import GetLeadHook from "./hooks/getLeadsApi";
import React from "react";

const { useEffect, useCallback, useState, useMemo } = React;

const Leads = () => {
  const [showModal, setShowModal] = useState(false);
  const [userItem, setUserItem] = useState({});
  const {
    handleData,
    loading,
    total,
    leads,
    totalNew,
    removeLead,
  } = GetLeadHook();
  const fields = [
    {
      key: "fullName",
      label: "fullName",
      _style: { width: "30%" },
    },
    { key: "addedOn", label: "Added On", _style: { width: "15%" } },
    {
      key: "phoneNumber",
      label: "Phone No.",
      _style: { width: "15%" },
    },
    { key: "type", label: "Type", _style: { width: "15%" } },
    { key: "email", label: "Email", _style: { width: "15%" } },
    { key: "budget", label: "Budget", _style: { width: "15%" } },
    {
      key: "actions",
      label: "",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
  ];
  const obj = {
    values: [10, 15, 20, 30, 40, 50],
  };
  useEffect(() => {
    handleData();
    // eslint-disable-next-line
  }, []);
  const toggle = useCallback(
    (item) => {
      setShowModal((toggle) => !toggle);
      setUserItem(item);
    },
    [setShowModal, setUserItem]
  );

  const HandleLoading = useMemo(() => {
    if (loading) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%", height: "100%" }}
        >
          <CSpinner
            color="#8C03F9"
            grow
            style={{ height: "4rem", width: "4rem", alignSelf: "center" }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <CRow alignHorizontal="start" alignVertical="start">
            <CCol xl="4">
              <CWidgetIcon text="New Leads" header={totalNew} color="primary">
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
            <CCol xl="4">
              <CWidgetIcon text="Total Leads" header={total} color="primary">
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
            <CCol xl="4">
              <CWidgetIcon text="Total Requests" header="10" color="primary">
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
          </CRow>
          <CCard>
            <CCardHeader>
              <CCardTitle>Leads</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                fields={fields}
                columnFilter
                tableFilter
                hover
                sorter
                itemsPerPage={10}
                pagination
                itemsPerPageSelect={obj}
                items={leads}
                scopedSlots={{
                  actions: (item: any) => (
                    <td className="py-2">
                      <CButtonGroup
                        color="primary"
                        shape="square"
                        size="sm"
                        onClick={() => {}}
                      >
                        <CButton
                          size="sm"
                          className="btn-info mr-1"
                          onClick={() => toggle(item)}
                        >
                          <FaEye />
                        </CButton>
                        <CButton
                          size="sm"
                          className="btn-danger mr-1"
                          onClick={() => {
                            console.log("clicked")
                            removeLead(item.id);
                          }}
                        >
                          <CIcon name="cil-trash" />
                        </CButton>
                      </CButtonGroup>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
          <CModal size="lg" show={showModal} onClose={toggle}>
            <CModalHeader closeButton>View Property</CModalHeader>
            <CModalBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-name">Name</CLabel>
                  <CInput
                    type="name"
                    id="nf-name"
                    disabled
                    name="nf-name"
                    //@ts-ignore
                    value={userItem?.fullName}
                    placeholder="Enter User Name ..."
                    autoComplete="name"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Added On</CLabel>
                  <CInput
                    type="email"
                    id="nf-email"
                    disabled
                    //@ts-ignore
                    value={userItem?.addedOn}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Added By</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.addedBy ? userItem.addedBy : "Not known"}
                    disabled
                    contentEditable={false}
                    autoComplete="email"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Phone Number</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.phoneNumber}
                    name="nf-email"
                    disabled
                    placeholder="Enter User Email ..."
                    autoComplete="email"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-mobile_phone">Type</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.type}
                    disabled
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-mobile_phone">Price</CLabel>
                  <CInput
                    type="tel"
                    disabled
                    id="nf-mobile_phone"
                    //@ts-ignore
                    value={userItem?.price ? userItem.price : "Not entered"}
                  />
                </CFormGroup>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={toggle} variant="outline">
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      );
    }
    // eslint-disable-next-line
  }, [leads, loading, totalNew, toggle, showModal, removeLead, total, userItem]);

  return <div>{HandleLoading}</div>;
};

export default Leads;
