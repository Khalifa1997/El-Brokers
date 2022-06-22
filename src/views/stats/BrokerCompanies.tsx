import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CLabel,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCardFooter,
} from "@coreui/react";
import { DateRangePicker } from "react-dates";
// This Month - This Quarter - This Year - Custom Date Range
//
const BrokerCompaniesStats = () => {
  const [date, setDate] = useState<any>({});
  const [focused, setFocused] = useState<any>({});

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Stats Engine Generator</CCardTitle>
      </CCardHeader>
      <CCardBody className="align-items-center">
        <CRow>
          <CCol lg={6} className="d-flex align-items-center">
            <CLabel>Custom date</CLabel>
            <div className="p-lg-2">
              <DateRangePicker
                startDate={date.startDate}
                startDateId="startDate"
                endDate={date.endDate}
                endDateId="endDate"
                onDatesChange={(value) => setDate(value)}
                focusedInput={focused}
                onFocusChange={(focusedInput) => setFocused(focusedInput)}
                orientation="horizontal"
                openDirection="down"
                small
                horizontalMargin={5}
              />
            </div>
          </CCol>
          <CCol lg={6} className="d-flex align-items-center">
            <CLabel>or Select from our presets</CLabel>
            <div className="p-lg-2">
              <CDropdown color="primary">
                <CDropdownToggle>Preset Ranges</CDropdownToggle>
                <CDropdownMenu value="7">
                  <CDropdownItem>Today</CDropdownItem>
                  <CDropdownItem>Yesterday</CDropdownItem>
                  <CDropdownItem>This week</CDropdownItem>
                  <CDropdownItem>Last week</CDropdownItem>
                  <CDropdownItem value="7">Last 7 days</CDropdownItem>
                  <CDropdownItem>Last 28 days</CDropdownItem>
                  <CDropdownItem>Last 30 days</CDropdownItem>
                  <CDropdownItem>Last 90 days</CDropdownItem>
                  <CDropdownItem>Last 12 mouths</CDropdownItem>
                  <CDropdownItem>Last calender year</CDropdownItem>
                  <CDropdownItem>This year</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter className="d-flex align-items-center justify-content-end">
        <CButton color="primary" className="mr-1" variant="outline">
          Generate
        </CButton>
        <CButton color="primary" variant="outline">
          Export
        </CButton>
      </CCardFooter>
    </CCard>
  );
};

export default BrokerCompaniesStats;
