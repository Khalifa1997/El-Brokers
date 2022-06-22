import React, { useState, useEffect } from "react";
import {
  CDataTable,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CButton,
  CRow,
  CCol,
  CWidgetIcon,
  CModalHeader,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CModalFooter,
  CModal,
  CButtonGroup,
  CSpinner,
  CAlert,
} from "@coreui/react";
import { FaEye } from "react-icons/fa";
import CIcon from "@coreui/icons-react";
import Select from "react-select";
import hooks from "./hooks/hooks";
import {
  isPasswordsMatch,
  validateEmail,
  validatePasswordLength,
  validatePhone,
} from "../../utilis/validators";

// Name - Email - Number - Broker Company - Properties Added - Leads Added

interface user {
  name: string;
  email: string;
  tempPass: string;
  confirmPass: string;
  number: number | string;
}
const tableObject = {
  values: [10, 15, 20, 30, 40, 50],
};
const Users = () => {
  const {
    handleUserData,
    loading,
    userTotal,
    users: usersData,
    submitNewUserData,
    editUserData,
    deleteUser,
    companies,
    activeUsers,
    newUsers,
  } = hooks();
  const [editModal, setEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [error, setError] = useState<string | null>();
  const [selectedNewCompany, setSelectedNewCompany] = useState<any>({});
  const [newUserData, setNewUserData] = useState<user>({
    email: "",
    name: "",
    confirmPass: "",
    tempPass: "",
    number: "",
  });
  const [viewModal, setViewModal] = useState(false);
  const submitNewUser = () => {
    setError(null);
    if (newUserData && !validateEmail(newUserData.email)) {
      setError("Please Enter a correct Email");
      return;
    }
    if (newUserData && !validatePasswordLength(newUserData.tempPass)) {
      setError("Password must be atleast 7 characters long");
      return;
    }
    if (
      newUserData &&
      !isPasswordsMatch(newUserData.confirmPass, newUserData.tempPass)
    ) {
      setError("Passwords don't match, Please Enter recheck the passwords");
      return;
    }
    if (newUserData && !validatePhone(newUserData.number.toString())) {
      setError("Please Enter a correct Phone Number");
      return;
    }
    const payload = {
      name: newUserData?.name,
      email: newUserData?.email,
      companyId: selectedNewCompany.value,
      phoneNumber: newUserData?.number,
      password: newUserData?.tempPass,
    };
    if (editModal) editUserData(payload, selectedID);
    else submitNewUserData(payload);
    handleUserData();
    setShowModal(false);
  };

  const handleChange = React.useCallback(
    (name: string) => ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setNewUserData((oldState: any) => ({
        ...oldState,
        [name]: value,
      }));
    },
    [setNewUserData]
  );

  const fields = [
    { key: "name", label: "Name", _style: { width: "25%" } },
    { key: "email", label: "Email", _style: { width: "15%" } },
    {
      key: "number",
      label: "Number",
      _style: { width: "15%" },
    },
    { key: "brokerCompany", label: "Broker Company", _style: { width: "15%" } },
    {
      key: "propertiesAdded",
      label: "Properties Added",
      _style: { width: "15%" },
    },
    { key: "leadsAdded", label: "Leads Added", _style: { width: "15%" } },
    {
      key: "actions",
      label: "Actions",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  useEffect(() => {
    handleUserData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [newUsers, usersData, activeUsers, userTotal]);
  const deleteSelectedUser = (id: string) => {
    deleteUser(id);
  };
  const openViewModal = (x: boolean, item: any) => {
    setViewModal(true);
    setNewUserData({
      email: item.email,
      name: item.name,
      confirmPass: "",
      tempPass: "",
      number: item.number,
    });
    setSelectedNewCompany({
      value: item.brokerCompanyID,
      label: item.brokerCompany,
    });
    setSelectedID(item.id);
    setEditModal(x);
    setShowModal((toggle) => !toggle);
  };
  const toggle = (x: boolean, item?: any) => {
    setViewModal(false);
    if (item) {
      setNewUserData({
        email: item.email,
        name: item.name,
        confirmPass: "",
        tempPass: "",
        number: item.number,
      });
      setSelectedNewCompany({
        value: item.brokerCompanyID,
        label: item.brokerCompany,
      });
      setSelectedID(item.id);
    } else {
      setNewUserData({
        email: "",
        name: "",
        confirmPass: "",
        tempPass: "",
        number: "",
      });
      setSelectedNewCompany({});
    }
    setEditModal(x);
    setShowModal((toggle) => !toggle);
  };
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
  } else
    return (
      <div>
        <CRow alignHorizontal="start" alignVertical="start">
          <CCol xl="4">
            <CWidgetIcon
              text="New Users"
              header={newUsers.toString()}
              color="primary"
            >
              <CIcon name={"cilSettings"} size={"xl"} />
            </CWidgetIcon>
          </CCol>
          <CCol xl="4">
            <CWidgetIcon text="Total Users" header={userTotal} color="primary">
              <CIcon name={"cilSettings"} size={"xl"} />
            </CWidgetIcon>
          </CCol>
          <CCol xl="4">
            <CWidgetIcon
              text="Active Users"
              header={activeUsers.toString()}
              color="primary"
            >
              <CIcon name={"cilSettings"} size={"xl"} />
            </CWidgetIcon>
          </CCol>
        </CRow>
        <CCard>
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <CCardTitle>Users</CCardTitle>
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="md"
              style={{
                justifySelf: "flex-end",
                alignItems: "flex-end",
              }}
              onClick={() => toggle(false)}
            >
              Add New User
            </CButton>
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
              itemsPerPageSelect={tableObject}
              items={usersData}
              scopedSlots={{
                actions: (item: { id: string }) => (
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
                        onClick={() => openViewModal(true, item)}
                      >
                        <FaEye />
                      </CButton>
                      <CButton
                        size="sm"
                        className="btn-primary mr-1"
                        onClick={() => toggle(true, item)}
                      >
                        <CIcon name="cil-pencil" />
                      </CButton>
                      <CButton
                        size="sm"
                        className="btn-danger mr-1"
                        onClick={() => deleteSelectedUser(item.id)}
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
        <CModal size="lg" show={showModal} onClose={() => toggle(editModal)}>
          <CModalHeader closeButton>
            {editModal
              ? viewModal
                ? `Show User`
                : `Edit User`
              : `Add New User`}
          </CModalHeader>
          <CModalBody>
            <CForm action="" method="post">
              <CFormGroup>
                <CLabel htmlFor="nf-name">Name</CLabel>
                <CInput
                  type="name"
                  id="nf-name"
                  name="nf-name"
                  placeholder="Enter User Name ..."
                  autoComplete="name"
                  value={newUserData?.name}
                  onChange={handleChange("name")}
                  disabled={viewModal}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-email">Email</CLabel>
                <CInput
                  type="email"
                  id="nf-email"
                  name="nf-email"
                  placeholder="Enter User Email ..."
                  autoComplete="email"
                  value={newUserData?.email}
                  onChange={handleChange("email")}
                  disabled={viewModal}
                />
              </CFormGroup>
              {!viewModal && (
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-password">Temporary Password</CLabel>
                      <CInput
                        type="password"
                        id="nf-password"
                        name="nf-password"
                        placeholder="Enter Password ..."
                        autoComplete="password"
                        value={newUserData?.tempPass}
                        onChange={handleChange("tempPass")}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-password-confirm">
                        Confirm Password
                      </CLabel>
                      <CInput
                        type="password"
                        id="nf-password-confirm"
                        name="nf-password-confirm"
                        placeholder="Confirm Password ..."
                        autoComplete="current-password"
                        value={newUserData?.confirmPass}
                        onChange={handleChange("confirmPass")}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
              )}
              <CFormGroup>
                <CLabel htmlFor="nf-role">Company</CLabel>
                <Select
                  name="nf-role"
                  options={companies}
                  placeholder="Select User Company"
                  isSearchable
                  defaultValue="Select User Company"
                  value={selectedNewCompany}
                  onChange={setSelectedNewCompany}
                  isDisabled={viewModal}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-mobile_phone">Phone Number</CLabel>
                <CInput
                  type="tel"
                  id="nf-mobile_phone"
                  name="nf-mobile_phone"
                  placeholder="Enter User Phone Number ..."
                  autoComplete="tel"
                  value={newUserData?.number}
                  onChange={handleChange("number")}
                  disabled={viewModal}
                />
              </CFormGroup>
            </CForm>
            {error && <CAlert color="warning">{error}</CAlert>}
          </CModalBody>
          <CModalFooter>
            {!viewModal && (
              <CButton
                color="primary"
                variant="outline"
                onClick={submitNewUser}
              >
                {editModal ? `Edit User` : `Add User`}
              </CButton>
            )}
            <CButton
              color="secondary"
              onClick={() => toggle(editModal)}
              variant="outline"
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    );
};

export default Users;
