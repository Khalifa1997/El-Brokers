import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CImg,
  CInput,
  CInputFile,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSpinner,
  CTextarea,
  CWidgetIcon,
} from "@coreui/react";
import { FaEye } from "react-icons/fa";
import CIcon from "@coreui/icons-react";

import GetCompanyHook from "./hooks/getCompaniesHook";
import React from "react";
import { constructObj } from "../../utilis/objectHandlers";

const { useState } = React;

// const subscriptions = [
//   { value: "free", label: "Free" },
//   { value: "team", label: "Team" },
//   { value: "prof", label: "Professional" },
//   { value: "enterprise", label: "Enterprise" },
// ];

const BrokerCompanies = () => {
  const {
    loading,
    data,
    info,
    companies,
    removeCompany,
    editCompany,
    addCompany,
  } = GetCompanyHook();

  const [showModal, setShowModal] = useState(false);
  // const [focused, setFocused] = useState<any>();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  // const [date, setDate] = useState<any>({});

  // const [subscriptionValue, setSubscriptionValue] = useState<any>({});

  const [form, setForm] = useState<any>({
    name: "",
    address: "",
    country_id: "",
    admin_id: {
      email: "",
      description: "",
      photo: {
        url: "",
      },
    },
  });

  const onChangeHandler = React.useCallback(
    (event: any) => {
      const names: any = event.currentTarget.name.split(".");
      let temp: any = { ...form };

      if (names.length > 1) {
        temp = constructObj(form, names, event.currentTarget.value);
      } else {
        temp = {
          ...temp,
          [event.currentTarget.name]: event.currentTarget.value,
        };
      }
      setForm({
        ...temp,
      });
    },
    [form]
  );

  console.log(form);

  const fields = [
    // { key: "id", _style: { display: "none" } },
    { key: "name", label: "Company Name", _style: { width: "25%" } },
    { key: "phoneNumber", label: "Phone Number", _style: { width: "25%" } },
    // {key:""},
    { key: "country_id", label: "Country", _style: { width: "15%" } },
    {
      key: "currency",
      label: "Currency",
      _style: { width: "15%" },
    },
    {
      key: "measureUnit",
      label: "Measure Unit",
      _style: { width: "10%" },
    },
    // { key: "members", label: "Members", _style: { width: "15%" } },
    // { key: "properties", label: "Properties", _style: { width: "15%" } },
    // { key: "income", label: "Income", _style: { width: "15%" } },
    {
      key: "actions",
      label: "Actions",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  // useEffect(() => {
  //   // handleData();
  //   handleData();
  //   // eslint-disable-next-line
  // }, []);
  // const obj = React.useMemo(() => {
  //   return { view: [1, 2, 3, 4] };
  // }, []);

  // const obj = {
  //   view: [1, 2, 3, 4, 5],
  // };

  const toggle = React.useCallback(() => {
    setForm({
      name: "",
      address: "",
      country_id: "",
      admin_id: {
        email: "",
        description: "",
        photo: {
          url: "",
        },
      },
    });
    setShowModal((toggle) => !toggle);
  }, []);

  const _renderModal = React.useMemo(() => {
    return (
      <CModal size="lg" show={showModal} onClose={toggle}>
        <CModalHeader closeButton>Add New Company</CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="admin_id.email">Admin Email</CLabel>
              <CInput
                onChange={onChangeHandler}
                type="email"
                disabled={isView}
                defaultValue={form?.admin_id?.email ?? "not entered"}
                name="admin_id.email"
                placeholder="Enter Admin Email ..."
                autoComplete="email"
              />
            </CFormGroup>

            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel hidden={isView} htmlFor="password">
                    Admin Temporary Password
                  </CLabel>
                  <CInput
                    onChange={onChangeHandler}
                    type="password"
                    hidden={isView}
                    value={form[`password`]}
                    name="password"
                    placeholder="Enter Password ..."
                    autoComplete="password"
                  />
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CLabel hidden={isView} htmlFor="confirm_password">
                    Confirm Password
                  </CLabel>
                  <CInput
                    onChange={onChangeHandler}
                    hidden={isView}
                    type="password"
                    name="confirm_passowrd"
                    value={form[`confirm_passowrd`]}
                    placeholder="Confirm Password ..."
                    autoComplete="current-password"
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="name">Company Name</CLabel>
                  <CInput
                    onChange={onChangeHandler}
                    disabled={isView}
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Enter Company Name ..."
                  />
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="logo">Company Logo</CLabel>
                  <CInputFile
                    hidden={isView}
                    onChange={onChangeHandler}
                    disabled={isView}
                    type="file"
                    name="logo"
                    src={form[`logo`]}
                    accept="image/*"
                  />
                  <br />
                  <CImg
                    htmlFor="logo"
                    width={100}
                    height={100}
                    hidden={!isView}
                    src={`${form.admin_id.photo.url}`}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CFormGroup>
              <CLabel htmlFor="admin_id.description">About Company</CLabel>
              <CTextarea
                name="admin_id.description"
                disabled={isView}
                onChange={onChangeHandler}
                value={form.admin_id.description}
                placeholder="Enter About Company ..."
              />
            </CFormGroup>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="country_id">Country</CLabel>
                  <CInput
                    onChange={onChangeHandler}
                    value={form.country_id}
                    disabled={isView}
                    type="text"
                    name="country_id"
                    placeholder="Enter Property Name ..."
                  />
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="address">Address</CLabel>
                  <CInput
                    onChange={onChangeHandler}
                    type="name"
                    disabled={isView}
                    name="address"
                    value={form[`address`]}
                    placeholder="Enter Property Name ..."
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            {/* <hr /> */}
            {/* <CFormGroup>
              <CLabel htmlFor="nf-subscription">Subscription</CLabel>
              <Select
                name="nf-subscription"
                options={subscriptions}
                value={form[`subscription`]}
                onChange={(selected: any) => {
                  const value = selected.value;
                  onChangeHandler({
                    currentTarget: { value: value, name: "subscription" },
                  });
                }}
              />
            </CFormGroup>
            <CRow>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="extra_users">Extra Users</CLabel>
                  <CInput
                    type="number"
                    name="extra_users"
                    value={form[`extra_users`]}
                    onChange={onChangeHandler}
                    placeholder="Add No of Extra Users ..."
                  />
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup>
                  <CLabel htmlFor="extra_properties">Extra Properties</CLabel>
                  <CInput
                    type="number"
                    name="extra_properties"
                    value={form[`extra_properties`]}
                    placeholder="Add No of Extra Properties ..."
                    onChange={onChangeHandler}
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CFormGroup>
              <CLabel htmlFor="nf-subscription_date">
                Subscription Validity Date
              </CLabel>
              <br />
              <DateRangePicker
                startDate={date.startDate}
                startDateId="startDate"
                endDate={date.endDate}
                endDateId="endDate"
                startDatePlaceholderText={form[`startDate`] ?? ""}
                endDatePlaceholderText={form[`endDate`] ?? ""}
                // onDatesChange={(value) => setDate(value)}
                onDatesChange={(arg) => {
                  if (arg.startDate) {
                    onChangeHandler({
                      currentTarget: {
                        value: arg.startDate.format("DD-MM-YYYY"),
                        name: "startDate",
                      },
                    });
                  }
                  if (arg.endDate) {
                    onChangeHandler({
                      currentTarget: {
                        value: arg.endDate.format("DD-MM-YYYY"),
                        name: "endDate",
                      },
                    });
                  }
                }}
                focusedInput={focused}
                onFocusChange={(focusedInput) => setFocused(focusedInput)}
                orientation="horizontal"
                openDirection="up"
              />
            </CFormGroup> */}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            hidden={isView}
            onClick={() => {
              if (isEdit) {
                // edit comapny api
                editCompany(form, [["id", form.id]]);
              } else {
                addCompany(form);
                // create company api
              }
              setIsEdit(false);
              setShowModal(false);
            }}
          >
            {isEdit ? "Edit Company" : "Create Company"}
          </CButton>
          <CButton
            color="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    );
  }, [
    isEdit,
    // data,
    // focused,
    // setFocused,
    isView,
    showModal,
    toggle,
    form,
    addCompany,
    editCompany,
    onChangeHandler,
  ]);

  const _renderMain = React.useMemo(() => {
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
    }
    console.log("table render");
    return (
      <React.Fragment>
        <CRow alignHorizontal="start" alignVertical="start">
          <CCol xl="4">
            <CWidgetIcon
              text="New Companies"
              header={(info.newCompany as unknown) as string | undefined}
              color="primary"
            >
              <CIcon name={"cilSettings"} size={"xl"} />
            </CWidgetIcon>
          </CCol>
          <CCol xl="4">
            <CWidgetIcon
              text="Total Companies"
              header={(info.total as unknown) as string | undefined}
              color="primary"
            >
              <CIcon name={"cilSettings"} size={"xl"} />
            </CWidgetIcon>
          </CCol>
          <CCol xl="4">
            <CWidgetIcon
              text="Total Income"
              header={(info.totalIncome as unknown) as string | undefined}
              color="primary"
            >
              <CIcon name={"cilSettings"} size={"xl"} />
            </CWidgetIcon>
          </CCol>
        </CRow>
        <CCard>
          <CCardHeader className="d-flex align-items-center justify-content-between">
            <CCardTitle>Broker Companies</CCardTitle>
            {/* <CButton
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
              Add New Company
            </CButton> */}
          </CCardHeader>
          <CCardBody>
            <CDataTable
              fields={fields}
              columnFilter
              tableFilter
              loading={loading}
              hover
              sorter
              itemsPerPage={10}
              pagination
              itemsPerPageSelect={{
                values: [10, 15, 20, 30, 40, 50],
              }}
              items={companies}
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
                        onClick={() => {
                          const company: any = data.find(
                            (d: any) => d._id === item._id
                          );

                          const newObj = {
                            id: company._id,
                            name: company.name,
                            address: company.address,
                            country_id: company.country_id
                              ? company.country_id.label ?? "None"
                              : "None",
                            admin_id: {
                              email: company.admin_id.email,
                              description: company.admin_id.description,
                              photo: {
                                url: company.admin_id.photo.url,
                              },
                            },
                          };
                          setForm(newObj);
                          setIsView(true);
                          setShowModal(true);
                        }}
                      >
                        {/* <CIcon name="cil-eye" /> */}
                        <FaEye />
                      </CButton>
                      {/* <CButton
                        size="sm"
                        className="btn-primary mr-1"
                        onClick={() => {
                          const company: any = data.find(
                            (d: any) => d._id === item.id
                          );
                          const newObj = {
                            id: company._id,
                            name: company.name,
                            address: company.address,
                            admin_id: {
                              email: company.admin_id.email,
                              description: company.admin_id.description,
                              photo: {
                                url: company.admin_id.photo.url,
                              },
                            },
                          };

                          setForm(newObj);
                          setIsEdit(true);
                          setIsView(false);
                          setShowModal(true);
                        }}
                      >
                        <CIcon name="cil-pencil" />
                      </CButton> */}
                      <CButton
                        size="sm"
                        className="btn-danger mr-1"
                        onClick={() => {
                          removeCompany(item.id);
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
      </React.Fragment>
    );
  }, [fields, companies, loading, info, data, removeCompany]);

  return (
    <div>
      {_renderMain}
      {_renderModal}
    </div>
  );
};
export default BrokerCompanies;
