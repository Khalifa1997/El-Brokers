import React, { useState } from "react";
import {
  CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CButton,
  CRow,
  CCol,
  CSwitch,
  CModalHeader,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CModalFooter,
  CModal,
  CButtonGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const usersData = [
  {
    id: 0,
    packageName: "Free",
    userAmount: "1",
    propertiesAmount: "10",
    monthlyPrice: "0 EGP",
    annualPrice: "0 EGP",
    visibility: false,
  },
  {
    id: 1,
    packageName: "Team",
    userAmount: "4",
    propertiesAmount: "100",
    monthlyPrice: "200 EGP",
    annualPrice: "2000 EGP",
    visibility: true,
  },
];

const fields = [
  { key: "packageName", label: "Package Name", _style: { width: "30%" } },
  { key: "userAmount", label: "User Amount", _style: { width: "15%" } },
  {
    key: "propertiesAmount",
    label: "Properties Amount",
    _style: { width: "15%" },
  },
  { key: "monthlyPrice", label: "Monthly Price", _style: { width: "15%" } },
  { key: "annualPrice", label: "Annual Price", _style: { width: "15%" } },
  {
    key: "visibility",
    label: "Visibility",
    _style: { width: "5%" },
  },
  {
    key: "actions",
    label: "",
    _style: { width: "5%" },
    sorter: false,
    filter: false,
  },
];

// Package Name - User Amount - Properties Amount - Monthly Price - Annual Price

const Subscriptions = () => {
  const [showModal, setShowModal] = useState(false);

  const toggle = () => setShowModal((toggle) => !toggle);

  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <CCardTitle>Subscription Plans</CCardTitle>
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="md"
            style={{
              justifySelf: "flex-end",
              alignItems: "flex-end",
            }}
            onClick={toggle}
          >
            Add New Subscription Plan
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            fields={fields}
            columnFilter
            tableFilter
            hover
            sorter
            itemsPerPage={5}
            pagination
            itemsPerPageSelect
            items={usersData}
            scopedSlots={{
              // visibility: (item: any) => (
              //   <td>
              //     <CSwitch size="sm" shape="square" variant="outline">
              //       {item.visibility}
              //     </CSwitch>
              //   </td>
              // ),
               actions: () => (
                <td className="py-2">
                  <CButtonGroup
                    color="primary"
                    shape="square"
                    size="sm"
                    onClick={() => {}}
                  >
                    <CButton size="sm" className="btn-info mr-1">
                      <CIcon name="cil-eye" />
                    </CButton>
                    <CButton size="sm" className="btn-primary mr-1">
                      <CIcon name="cil-pencil" />
                    </CButton>
                    <CButton size="sm" className="btn-danger mr-1">
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
        <CModalHeader closeButton>Add New Subscription Package</CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <CRow>
              <CCol sm={9}>
                <CFormGroup>
                  <CLabel htmlFor="nf-pkg_name">Package Name</CLabel>
                  <CInput
                    type="name"
                    id="nf-pkg_name"
                    name="nf-pkg_name"
                    placeholder="Enter Package Name ..."
                  />
                </CFormGroup>
              </CCol>
              <CCol sm={3}>
                <CFormGroup>
                  <CLabel htmlFor="nf-properties_amount">Visible</CLabel>
                  <br />
                  <CSwitch size="lg" shape="pill" variant="3d" color="primary" />
                </CFormGroup>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="nf-user_amount">Monthly Price</CLabel>
                  <CInput
                    type="number"
                    id="nf-user_amount"
                    name="nf-user_amount"
                    placeholder="Add Monthly Price ..."
                  />
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="nf-properties_amount">Annual Price</CLabel>
                  <CInput
                    type="number"
                    id="nf-properties_amount"
                    name="nf-properties_amount"
                    placeholder="Add Annual Price ..."
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="nf-user_amount">No. of Users</CLabel>
                  <CInput
                    type="number"
                    id="nf-user_amount"
                    name="nf-user_amount"
                    placeholder="Add User Amount ..."
                  />
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="nf-properties_amount">
                    No. of Properties
                  </CLabel>
                  <CInput
                    type="number"
                    id="nf-properties_amount"
                    name="nf-properties_amount"
                    placeholder="Add Properties Amount ..."
                  />
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" variant="outline">
            Add Subscription Package
          </CButton>
          <CButton color="secondary" onClick={toggle} variant="outline">
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Subscriptions;
