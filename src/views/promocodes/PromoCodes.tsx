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
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CWidgetIcon,
  CSpinner,
} from "@coreui/react";
import React, { useState } from "react";

import CIcon from "@coreui/icons-react";
import { DateRangePicker } from "react-dates";
import GetPromoHook from "./hooks/usePromoCodeHook";
import Select from "react-select";

const { useEffect, useCallback, useMemo } = React;
const discountTypes = [
  {
    value: "percentage",
    label: "Percentage",
  },
  {
    value: "amount",
    label: "Amount",
  },
];
interface PromoCodeInterface {
  state: boolean,
  _id: number,
  code: string,
  discount_value: number,
  discount_Type: typeof discountTypes,
  valid_until: string,
  limitCount: number,
}
const fields = [
  { key: "code", label: "PromoCode", _style: { width: "15%" } },
  { key: "discountType", label: "Discount Type", _style: { width: "15%" } },
  {
    key: "discountValue",
    label: "Discount Value",
    _style: { width: "15%" },
  },
  { key: "createdAt", label: "Valid From", _style: { width: "15%" } },
  { key: "valid_until", label: "Valid To", _style: { width: "15%" } },
  { key: "status", label: "Status", _style: { width: "15%" } },
  { key: "limitCount", label: "Limit Count", _style: { width: "15%" } },
  {
    key: "actions",
    label: "",
    _style: { width: "5%" },
    sorter: false,
    filter: false,
  },
];



// PromoCode - Discount Type - Discount Value - Valid From - Valid To - Status - Limit Count

const PromoCodes = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setEditShowModal] = useState<boolean>(false);
  const [date, setDate] = useState<any>({});
  const [EditPromo, setEditPromo] = useState();
  const [AddPromo, setAddPromo] = useState();
  const [eddittedId, setEdittedId] = useState("");
  const [focused, setFocused] = useState<any>();
  const [discountTypeValue, setDiscountTypeValue] = useState<any>({});
  const toggle = () => setShowModal((toggle) => !toggle);


  const toggleEdit = useCallback((item: any) => {
    if (item) {
      let obj = {
        code: item?.code,
        discount_value: item?.discount_value,
        discount_Type: item?.discount_Type,
        valid_until: item?.valid_until,
        usage: item?.usage,
        state: item?.state
      }
      setEdittedId(item?.id);
      setEditPromo(obj)};
    console.log(EditPromo, 'from toggling')
    setEditShowModal((toggle) => !toggle);
  },[EditPromo, setEditPromo]);

  const {
    handleData,
    loading,
    total,
    promoCodes,
    removePromo,
    patchPromo, 
    addPromo
  } = GetPromoHook();

  useEffect(() => {
    handleData();
    // eslint-disable-next-line
  }, []);
  const handleChange = React.useCallback(
    (name: string) => ({
      target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
      setEditPromo((oldState: any) => ({
        ...oldState,
        [name]: value,
      }));
    },
    [setEditPromo]
  );

  const handleChangeAddPromo = React.useCallback( (name: string) => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAddPromo((oldState: any) => ({
      ...oldState,
      [name]: value,
    }));
  },
  [setAddPromo]);
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
            <CCol xl="6">
              <CWidgetIcon
                text="Total PromoCodes"
                header={total}
                color="primary"
              >
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
            <CCol xl="6">
              <CWidgetIcon text="PromoCodes Used" header="2" color="primary">
                <CIcon name={"cilSettings"} size={"xl"} />
              </CWidgetIcon>
            </CCol>
          </CRow>
          <CCard>
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <CCardTitle>PromoCodes</CCardTitle>
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
                Add PromoCode
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                fields={fields}
                columnFilter
                tableFilter
                hover
                sorter
                itemsPerPage={3}
                pagination
                itemsPerPageSelect
                items={promoCodes}
                scopedSlots={{
                  actions: (item: { id: string }) => (
                    <td className="py-2">
                      <CButtonGroup
                        color="primary"
                        shape="square"
                        size="sm"
                        onClick={() => {}}
                      >
                        <CButton size="sm" className="btn-primary mr-1">
                          <CIcon
                            name="cil-pencil"
                            onClick={() => {
                              toggleEdit(item);
                            }}
                          />
                        </CButton>
                        <CButton
                          size="sm"
                          className="btn-danger mr-1"
                          onClick={() => {
                            removePromo(item.id);
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
            <CModalHeader closeButton>Add New PromoCode</CModalHeader>
            <CModalBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-pc">PromoCode</CLabel>
                  <CInput
                    id="nf-pc"
                    name="nf-pc"
                    placeholder="Enter PromoCode ..."
                    value={AddPromo?.code}
                    onChange={handleChangeAddPromo("code")}
                  />
                </CFormGroup>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-discountType">Discount Type</CLabel>
                      <Select
                        name="nf-discountType"
                        value={discountTypeValue}
                        options={discountTypes}  
                        onChange={setDiscountTypeValue}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-discountValue">Discount Value</CLabel>
                      <CInput
                        type="number"
                        id="nf-discountValue"
                        name="nf-discountValue"
                        placeholder="Add Discount Value ..."
                        value={AddPromo?.discount_value}
                        onChange={handleChangeAddPromo("discount_value")}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-limit">Limit Count</CLabel>
                      <CInput
                        type="number"
                        id="nf-limit"
                        name="nf-limit"
                        placeholder="Add Limit Count ..."
                        value={AddPromo?.limitCount}
                       onChange={handleChangeAddPromo("limitCount")}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-validity_date">Validity Date</CLabel>
                      <br />
                      <DateRangePicker
                        startDate={date.startDate}
                        startDateId="startDate"
                        endDate={date.endDate}
                        endDateId="endDate"
                        onDatesChange={(value) => setDate(value)}
                        focusedInput={focused}
                        onFocusChange={(focusedInput) =>
                          setFocused(focusedInput)
                        }
                        orientation="horizontal"
                        openDirection="down"
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" variant="outline" onClick={() => {addPromo(AddPromo)}}>
                Add PromoCode
              </CButton>
              <CButton color="secondary" onClick={toggle} variant="outline">
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>

          {/* 
          /// Modal for showing the edit form
          */}
          <CModal size="lg" show={showEditModal} onClose={toggleEdit}>
            <CModalHeader closeButton>Update Your Promo Code</CModalHeader>
            <CModalBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-pc">Promo Code</CLabel>
                  <CInput
                    id="nf-pc"
                    name="nf-pc"
                    placeholder={""}
                    value={EditPromo?.code}
                    onChange={handleChange("code")}
                  />
                </CFormGroup>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-discountType">Discount Type</CLabel>
                      <Select
                        name="nf-discountType"
                        value={EditPromo?.discount_Type}
                        options={discountTypes}
                        onChange={setDiscountTypeValue}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-discountValue">Discount Value</CLabel>
                      <CInput
                        type="number"
                        id="nf-discountValue"
                        name="nf-discountValue"
                        placeholder="Add Discount Value ..."
                        value={EditPromo?.discount_value}
                        onChange={handleChange("discount_value")}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-limit">Limit Count</CLabel>
                      <CInput
                        type="number"
                        id="nf-limit"
                        name="limitCount"
                        placeholder="Add Limit Count ..."
                        value={EditPromo?.limitCount}
                        onChange={handleChange("limitCount")}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="nf-validity_date">Validity Date</CLabel>
                      <br />
                      <DateRangePicker
                        startDate={date.startDate}
                        startDateId="startDate"
                        endDate={date.endDate}
                        endDateId="endDate"
                        onDatesChange={(value) => setDate(value)}
                        focusedInput={focused}
                        onFocusChange={(focusedInput) =>
                          setFocused(focusedInput)
                        }
                        orientation="horizontal"
                        openDirection="down"
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" variant="outline" onClick={()=>{patchPromo(EditPromo, eddittedId)
              toggleEdit()
              }}>
                Edit PromoCode
              </CButton>
              <CButton color="secondary" onClick={toggleEdit} variant="outline">
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
      );
    }
  }, [
    total,
    loading,
    promoCodes,
    showModal,
    removePromo,
    EditPromo,
    date,
    discountTypeValue,
    focused,
    handleChange,
    showEditModal,
    addPromo,
    AddPromo, 
    eddittedId,
    handleChangeAddPromo, patchPromo,toggleEdit
  ]);

  return <div>{HandleLoading}</div>;
};

export default PromoCodes;
