import React, { useMemo } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CWidgetProgress,
  CButton,
  CProgress,
  CCardFooter,
  CButtonGroup,
  CLabel,
  CSpinner,
} from "@coreui/react";
import { CChartBar } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { numberWithCommas } from "../../utilis/numberSeparator";
import usegetDashboardInfoHook from "./hooks/getDashboardInfo";
// Total Subscribed Companies - Total Properties - Total Leads - Total Users
//
//
//
//
//
//
// Total Generated Reports
import { CChartLine } from "@coreui/react-chartjs";
// @ts-ignore
import { getStyle, hexToRgba } from "@coreui/utils/src";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

const MainChartExample = (attributes: any) => {
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const defaultDatasets = (() => {
    let elements = 27;
    const data1 = [];
    const data2 = [];
    const data3 = [];
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200));
      data2.push(random(80, 100));
      data3.push(65);
    }
    return [
      {
        label: "My First dataset",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1,
      },
      {
        label: "My Second dataset",
        backgroundColor: "transparent",
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: data2,
      },
      {
        label: "My Third dataset",
        backgroundColor: "transparent",
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: data3,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={[
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa",
        "Su",
      ]}
    />
  );
};

const Dashboard = () => {
  const { data, loading } = usegetDashboardInfoHook();

  const HandleView = useMemo(() => {
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
        <CCol>
          <CRow>
            <CCol lg={2}>
              <CWidgetProgress
                header={data.totalCompanies}
                color="primary"
                value={data.totalCompanies}
                text="Total Companies"
              />
            </CCol>
            <CCol lg={2}>
              <CWidgetProgress
                header={data.totalProperties}
                value={data.totalProperties}
                text="Total Properties"
              />
            </CCol>
            <CCol lg={2}>
              <CWidgetProgress
                header={data.totalLeads}
                value={data.totalLeads}
                text="Total Leads"
              />
            </CCol>
            <CCol lg={2}>
              <CWidgetProgress
                header={data.totalUsers}
                value={data.totalUsers}
                text="Total Users"
              />
            </CCol>
            <CCol lg={2}>
              <CWidgetProgress
                header={data.totalPDFS}
                value={data.totalPDFS}
                text="Total Generated Reports"
              />
            </CCol>
            <CCol lg={2}>
              <CWidgetProgress
                header={numberWithCommas(data.totalIncome, { character: ',' })}
                value={data.totalIncome}
                text="Total Income"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol lg={6}>
              <CCard>
                <CCardHeader>Subscribed Companies</CCardHeader>
                <CCardBody>
                  <CChartBar
                    datasets={[
                      {
                        label: "Subscribed Companies",
                        backgroundColor: "#8C03F9",
                        data: [40, 20, 12, 39, 30, 40, 39, 80, 40, 20, 12, 11],
                      },
                    ]}
                    labels="months"
                    options={{
                      tooltips: {
                        enabled: true,
                      },
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CRow className="h-50">
                <CCol>
                  <CCard className="h-auto">
                    <CCardHeader>
                      <CCardTitle>iOS App</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol>
                          <CLabel>Last Update Version:</CLabel>
                        </CCol>
                        <CCol>
                          <CLabel className="font-weight-bold">{data.iosVersion}</CLabel>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CLabel>Total Downloads:</CLabel>
                        </CCol>
                        <CCol>
                          <CLabel className="font-weight-bold">23K</CLabel>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CLabel>App Rating:</CLabel>
                        </CCol>
                        <CCol>
                          <CLabel className="font-weight-bold">{data.iosScore}</CLabel>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CRow className="h-50">
                <CCol>
                  <CCard className="h-auto">
                    <CCardHeader>
                      <CCardTitle>Android App</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                      <CRow>
                        <CCol>
                          <CLabel>Last Update Version:</CLabel>
                        </CCol>
                        <CCol>
                          <CLabel className="font-weight-bold">{data.androidVersion}</CLabel>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CLabel>Total Downloads:</CLabel>
                        </CCol>
                        <CCol>
                          <CLabel className="font-weight-bold">{data.androidInstalls}</CLabel>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol>
                          <CLabel>App Rating:</CLabel>
                        </CCol>
                        <CCol>
                          <CLabel className="font-weight-bold">{data.androidScore}</CLabel>
                        </CCol>
                      </CRow>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Traffic
                  </h4>
                  <div className="small text-muted">November 2017</div>
                </CCol>
                <CCol sm="7" className="d-none d-md-block">
                  <CButton color="primary" className="float-right">
                    <CIcon name="cil-cloud-download" />
                  </CButton>
                  <CButtonGroup className="float-right mr-3">
                    {["Day", "Month", "Year"].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === "Month"}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <MainChartExample
                style={{ height: "300px", marginTop: "40px" }}
              />
            </CCardBody>
            <CCardFooter>
              <CRow className="text-center">
                <CCol md sm="12" className="mb-sm-2 mb-0">
                  <div className="text-muted">Visits</div>
                  <strong>29.703 Users (40%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                  <div className="text-muted">Unique</div>
                  <strong>24.093 Users (20%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="info"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0">
                  <div className="text-muted">Pageviews</div>
                  <strong>78.706 Views (60%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="warning"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0">
                  <div className="text-muted">New Users</div>
                  <strong>22.123 Users (80%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="danger"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                  <div className="text-muted">Bounce Rate</div>
                  <strong>Average Rate (40.15%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    value={40}
                  />
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      );
    }
  }, [data, loading]);
  return <div>{HandleView}</div>;
};

export default Dashboard;
