//@ts-nocheck
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
  CImg,
} from "@coreui/react";
import { FaEye } from "react-icons/fa";
import CIcon from "@coreui/icons-react";
import GetPropertyHook from "./hooks/getProperties";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// Property Name - Added On - Country - City - GeoLocation - Type - Rent/Sale - Price - Status - Actions

const fields = [
  { key: "name", label: "Property Name", _style: { width: "25%" } },
  { key: "addedOn", label: "Added On", _style: { width: "10%" } },
  {
    key: "country",
    label: "Country",
    _style: { width: "10%" },
  },
  { key: "city", label: "City", _style: { width: "10%" } },
  { key: "type", label: "Type", _style: { width: "10%" } },
  { key: "rent_sale", label: "Rent/Sale", _style: { width: "5%" } },
  { key: "price", label: "Price", _style: { width: "10%" } },
  {
    key: "actions",
    label: "Actions",
    _style: { width: "5%" },
    sorter: false,
    filter: false,
  },
];
const { useEffect, useMemo, useState, useCallback } = React;
const Properties = () => {
  const [showModal, setShowModal] = useState(false);
  const [userItem, setUserItem] = useState({});
  const {
    handleData,
    loading,
    total,
    properties,
    removeProperty,
    totalBuy,
    totalNew,
    totalRent,
  } = GetPropertyHook();
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
            <CCol xl="3">
              <CWidgetIcon
                text="New Properties"
                header={totalNew}
                color="primary"
              >
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
            <CCol xl="3">
              <CWidgetIcon
                text="Total Properties"
                header={total}
                color="primary"
              >
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
            <CCol xl="3">
              <CWidgetIcon
                text="Properties for Sale"
                header={totalBuy}
                color="primary"
              >
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
            <CCol xl="3">
              <CWidgetIcon
                text="Properties for Rent"
                header={totalRent}
                color="primary"
              >
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
          </CRow>
          <CCard>
            <CCardHeader>
              <CCardTitle>Properties</CCardTitle>
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
                //@ts-ignore
                itemsPerPageSelect={obj}
                items={properties}
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
                          onClick={() => toggle(item)}
                        >
                          <FaEye />
                        </CButton>
                        <CButton
                          size="sm"
                          className="btn-danger mr-1"
                          onClick={() => {
                            removeProperty(item.id);
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
                <CFormGroup className="d-flex justify-content-center align-items-center">
                  {userItem?.image!=='' ? (
                    <CImg
                      width="250px"
                      height="250px"
                      src={userItem?.image}
                      style={{ alignSelf: "center" }}
                    />
                  ) : null}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-name">Name</CLabel>
                  <CInput
                    type="name"
                    disabled
                    id="nf-name"
                    name="nf-name"
                    //@ts-ignore
                    value={userItem?.name}
                    placeholder="Enter User Name ..."
                    autoComplete="name"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Added On</CLabel>
                  <CInput
                    disabled
                    type="email"
                    id="nf-email"
                    //@ts-ignore
                    value={userItem?.addedOn}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Company</CLabel>
                  <CInput
                    //@ts-ignore
                    value={
                      userItem?.country_id
                        ? userItem?.country_id.label
                        : "Not entered"
                    }
                    disabled
                    name="nf-email"
                    placeholder="Enter User Email ..."
                    autoComplete="email"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Country</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.country ? userItem.country : "Not entered"}
                    name="nf-email"
                    disabled
                    placeholder="Enter User Email ..."
                    autoComplete="email"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-email">City</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.city ? userItem.city : "Not entered"}
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
                  <CLabel htmlFor="nf-mobile_phone">Leads Connected</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.leadsConnected}
                    disabled
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-mobile_phone">Rent/Sale</CLabel>
                  <CInput
                    //@ts-ignore
                    value={userItem?.rent_sale}
                    disabled
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-mobile_phone">Price</CLabel>
                  <CInput
                    type="tel"
                    id="nf-mobile_phone"
                    disabled
                    //@ts-ignore
                    value={userItem?.price ? userItem.price : "Not entered"}
                  />
                </CFormGroup>
                <CModalBody>
                  <LoadScript googleMapsApiKey="AIzaSyDsthNAP3d0AXm6-C0s-nCkdazayRdyTDs">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "50vh" }}
                      //@ts-ignore
                      center={userItem?.center ? userItem.center : ""}
                      zoom={14}
                      options={{ streetViewControl: false }}
                      // streetView
                    >
                      <Marker
                        position={userItem?.center ? userItem.center : ""}
                      />
                    </GoogleMap>
                  </LoadScript>
                </CModalBody>
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
  }, [
    loading,
    total,
    removeProperty,
    totalRent,
    totalNew,
    totalBuy,
    properties,
    showModal, obj, 
    toggle,
    userItem
  ]);
  return <div>{HandleLoading}</div>;
};

export default Properties;
