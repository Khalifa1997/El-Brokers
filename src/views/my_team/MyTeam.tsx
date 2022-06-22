import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React, { useState } from "react";

import CIcon from "@coreui/icons-react";
import Select from "react-select";

const usersData = [
  {
    id: 0,
    name: "Mahmoud Saif",
    addedOn: "2018/01/01",
    role: "broker",
    status: "active",
    email: "ms@anspire.agency",
  },
  {
    id: 1,
    name: "Mohamed Sabar",
    addedOn: "2018/01/01",
    role: "manager",
    status: "de-active",
    email: "sabar@anspire.agency",
  },
];

/**
 *
 * Name - Email - Role - Status - Added On
 */

const memberRoles = [
  { value: "superAdmin", label: "Super Admin" },
  { value: "supervisor", label: "Supervisor" },
];

const MyTeam = () => {
  const [showModal, setShowModal] = useState(false);
  const [roleValue, setRoleValue] = useState<any>({});
  const fields = [
    { key: "name", label: "Name", _style: { width: "30%" } },
    { key: "email", label: "Email", _style: { width: "15%" } },
    {
      key: "role",
      label: "Role",
      _style: { width: "15%" },
    },
    { key: "status", label: "Status", _style: { width: "15%" } },
    { key: "addedOn", label: "Added On", _style: { width: "15%" } },
    {
      key: "actions",
      label: "",
      _style: { width: "5%" },
      sorter: false,
      filter: false,
    },
  ];
  const toggle = () => setShowModal((toggle) => !toggle);

  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <CCardTitle>MyTeam</CCardTitle>
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
            Add New Member
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
        <CModalHeader closeButton>Add New Member</CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-name">Name</CLabel>
              <CInput
                type="name"
                id="nf-name"
                name="nf-name"
                placeholder="Enter Member Name ..."
                autoComplete="name"
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Email</CLabel>
              <CInput
                type="email"
                id="nf-email"
                name="nf-email"
                placeholder="Enter Member Email ..."
                autoComplete="email"
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-role">Role</CLabel>
              <Select
                name="nf-role"
                value={roleValue}
                options={memberRoles}
                onChange={setRoleValue}
                placeholder="Select Member Role"
                defaultValue="Select Member Role"
              />
            </CFormGroup>
            {/*<CRow>*/}
            {/*  <CCol>*/}
            {/*    <CFormGroup>*/}
            {/*      <CLabel htmlFor="nf-limit">Limit Count</CLabel>*/}
            {/*      <CInput*/}
            {/*        type="number"*/}
            {/*        id="nf-limit"*/}
            {/*        name="nf-limit"*/}
            {/*        placeholder="Add Limit Count ..."*/}
            {/*      />*/}
            {/*    </CFormGroup>*/}
            {/*  </CCol>*/}
            {/*  <CCol>*/}
            {/*    <CFormGroup>*/}
            {/*      <CLabel htmlFor="nf-validity_date">Validity Date</CLabel>*/}
            {/*      <br />*/}
            {/*    </CFormGroup>*/}
            {/*  </CCol>*/}
            {/*</CRow>*/}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" variant="outline">
            Add Member
          </CButton>
          <CButton color="secondary" onClick={toggle} variant="outline">
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default MyTeam;
