import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea,
  CCardFooter,
  CButton,
} from "@coreui/react";

const PushNotifications = () => {
  return (
    <div>
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <CCardTitle>Push Notification</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-message">Message</CLabel>
              <CInput
                type=""
                id="nf-message"
                name="nf-message"
                placeholder="Enter Message ..."
              />
            </CFormGroup>
            <hr />
            <CFormGroup>
              <CLabel htmlFor="nf-message">Title</CLabel>
              <CInput
                type=""
                id="nf-message"
                name="nf-message"
                placeholder="Enter Message ..."
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-message">Body</CLabel>
              <CTextarea
                type=""
                id="nf-message"
                name="nf-message"
                placeholder="Enter Message ..."
              />
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter className="d-flex align-items-center justify-content-end">
          <CButton size="lg" type="submit" variant="outline" color="primary">
            Submit
          </CButton>
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default PushNotifications;
