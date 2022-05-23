import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import Header from "../Header";
import SideBar from "../SideBar";
import InformationBar from "../InformationBar";
import Modal from "../../components/Modal";
import PrimaryButton from "../PrimaryButton";
import DonutChart from "../DonutChart";
import BarGraph from "../BarGraph";
import FlutterwaveHook from "../FlutterwaveHook";
import MetricsCard from "../MetricsCard";
import SpendingPeriod from "../SpendingPeriod";
import { useParams } from "react-router-dom";
import styles from "./ProjectBillingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import getProjectBill from "../../redux/actions/getProjectBill";

import {getTransactions, clearTransactions} from "../../redux/actions/getTransactions";


const data2 = [
  { date: "2021-08", amount: 1398 },
  { date: "2021-09", amount: 9800 },
  { date: "2021-10", amount: 3908 },
  { date: "2021-11", amount: 4800 },
  { date: "2021-12", amount: 3800 },
  { date: "2022-01", amount: 1267 },
  { date: "2022-02", amount: 1267 },
];

const ProjectBillingPage = (props) => {
  const { projectID } = useParams();
  const dispatch = useDispatch();

  const getAllTransactions = useCallback(
    () => dispatch(getTransactions(projectID)),
    [dispatch, projectID]
  );

  const clearAllTransactions = useCallback(
    () => dispatch(clearTransactions()),
    [dispatch]
  );

  const [transactionDetails, setTransactionDetails] = useState({});
  const [viewReceipt, setViewReceipt] = useState(false);
  const [currentTab, setCurrentTab] = useState(true);
  const [nextTab, setNextTab] = useState(false);
  const [months, setMonths] = useState(data2);

  useEffect(() => {
    clearAllTransactions();
    getAllTransactions();
  }, [clearAllTransactions,getAllTransactions]);

  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { data } = useSelector((state) => state.user);
  const { transactions } = useSelector((state) => state.getTransactionsReducer);

  const closeReceiptModal = () => {
    setViewReceipt(false);
  };

  const viewTransactions = () => {
    setCurrentTab(true);
    setNextTab(false);
  };
  const viewInvoices = () => {
    setNextTab(true);
    setCurrentTab(false);
  };

  const getBill = useCallback(
    () => dispatch(getProjectBill(projectID, { series: true })),
    [dispatch, projectID]
  );

  // create a function that takes in a array and returns a new array of objects with the data 2 format
  const getData2Format = (data) => {
    const newData = [];
    if (Array.isArray(data)) {
      data.forEach((element) => {
        newData.push({
          date: moment(element.start).utc().format("YYYY-MM-DD"),
          amount: element.totalCost,
        });
      });
    }
    // let newData2 = newData.slice(4)
    return newData;
  };

  // create a function that takes in a array and sums all the object key values to create one object
  const summationObject = (data) => {
    const newData = {};
    if (Array.isArray(data)) {
      data?.forEach((element) => {
        Object.keys(element).forEach((key) => {
          if (newData[key]) {
            newData[key] += element[key];
          } else {
            newData[key] = element[key];
          }
        });
      });
    }
    return newData;
  };

  useEffect(() => {
    getBill();
  }, [getBill]);

  const billInfo = useSelector((state) => state.getProjectBillReducer);
  const { projectBill } = billInfo;

  useEffect(() => {
    setMonths(getData2Format(projectBill?.data?.cost_data));
  }, [projectBill.data]);

  let newObject = summationObject(projectBill?.data?.cost_data);
  const data1 = [
    {
      name: "CPU / $1 per 1K seconds",
      value:
        Object.keys(newObject).length === 0
          ? "n/a"
          : (newObject.cpuCost + 1) * 10,
      color: "#0088FE",
    },
    {
      name: "RAM / $4 per GB",
      value:
        Object.keys(newObject).length === 0
          ? "n/a"
          : (newObject.ramCost + 1) * 10,
      color: "#00C49F",
    },
    {
      name: "Network / $1 per request",
      value:
        Object.keys(newObject).length === 0
          ? "n/a"
          : (newObject.networkCost + 1) * 10,
      color: "#FFBB28",
    },
    { name: "Storage/ $1 per GB", value: "n/a", color: "#FF8042" },
    { name: "Database/ $1 per GB", value: "n/a", color: "#99D2E9" },
  ];

  const getProjectName = (id) => {
    return projects.find((project) => project.id === id).name;
  };
  const getTransactionDetail = (transactions, transaction_id) => {
    return transactions.find(
      (transaction) => transaction.transaction_id === transaction_id
    );
  };
  const openReceiptModal = (transactions, transaction_id) => {
    let transactionDetail = getTransactionDetail(transactions, transaction_id);
    setTransactionDetails(transactionDetail);
    setViewReceipt(true);
  };

  const handlePeriodChange = (period, customTime = null) => {
    let startTimeStamp,
      endTimeStamp = new Date();
    if (period === "5m") {
      startTimeStamp = new Date(
        endTimeStamp.setMonth(endTimeStamp.getMonth() - 5)
      );
      endTimeStamp = new Date();
      let newMonths = [];
      for (var i = 0; i < data2.length; i++) {
        if (new Date(data2[i].date).getTime() >= startTimeStamp.getTime())
          newMonths.push(data2[i]);
      }
      setMonths(newMonths);
    }
    if (period === "all") {
      // get all months
      setMonths(data2);
    } else if (period === "custom" && customTime !== null) {
      startTimeStamp = customTime.start;
      endTimeStamp = customTime.end;
      let newMonths = [];
      for (var n = 0; n < data2.length; n++) {
        if (
          new Date(data2[n].date).getTime() >=
            new Date(startTimeStamp).getTime() &&
          new Date(data2[n].date).getTime() <= new Date(endTimeStamp).getTime()
        )
          newMonths.push(data2[n]);
      }
      setMonths(newMonths);
    }
  };
  return (
    <div className={styles.Page}>
      <div className={styles.TopBarSection}>
        <Header />
      </div>
      <div className={styles.MainSection}>
        <div className={styles.SideBarSection}>
          <SideBar
            name={getProjectName(projectID)}
            params={useParams()}
            pageRoute={props.location.pathname}
            allMetricsLink={`/projects/${projectID}/metrics`}
            cpuLink={`/projects/${projectID}/cpu/`}
            memoryLink={`/projects/${projectID}/memory/`}
            databaseLink={`/projects/${projectID}/databases`}
            networkLink={`/projects/${projectID}/network/`}
          />
        </div>
        <div className={styles.MainContentSection}>
          <div>
            <InformationBar header="Project Billing" />
          </div>
          <div className={styles.SmallContainer}>
            <div className={styles.OuterContainerBorder}>
              <div className={styles.DonutChatContainer}>
                <div className={styles.InsideHeading}>
                  <div className={styles.Heading}>Month-to date Summary</div>
                </div>
                <div className={styles.InnerContainer}>
                  <div className={styles.Subtext}>
                    The chart below shows the proportion of costs spent for each
                    service you use on the platform
                  </div>
                  <DonutChart
                    center_x={60}
                    center_y={70}
                    InnerRadius={30}
                    OuterRadius={50}
                    data={data1}
                    height={150}
                    width={130}
                  />

                  <div className={styles.MonthSummary}>
                    {data1.map((entry, index) => (
                      <div className={styles.ResourseDetail} key={index}>
                        <div
                          className={styles.Cube}
                          style={{
                            background: `${data1[index % data1.length].color}`,
                          }}
                        />
                        <div className={styles.ResourceName}>
                          {data1[index % data1.length].name}
                        </div>
                        <div className={styles.ResourcePrice}>
                          ${data1[index % data1.length].value}
                        </div>
                      </div>
                    ))}
                    <div className={styles.Total}>
                      <div className={styles.TotalTxt}>Total</div>
                      <div className={styles.ResourcePrice}>
                        {Object.keys(newObject).length === 0
                          ? "n/a"
                          : `${(newObject.totalCost + 1) * 10}`}
                      </div>
                    </div>
                  </div>
                  <div className={styles.paymentButton}>
                    <FlutterwaveHook
                      amount={(transactionDetails.amount)?transactionDetails.amount.toLocaleString("en-US"):0}
                      name={data.name}
                      email={data.email}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.BarGraphContainer}>
                <div className={styles.InsideHeading}>
                  <div className={styles.Heading}>Spending Summary</div>
                </div>
                <div className={styles.InnerContainer}>
                  <div className={styles.Subtext}>
                    Your spending summary for the last three months appears
                    below
                  </div>
                  <div className={styles.Subtext2}>
                    Current Month-to-Date balance is{" "}
                    {Object.keys(newObject).length !== 0
                      ? "Not computed"
                      : `${(newObject.totalCost + 1) * 10}`}
                  </div>
                  <div className={styles.MetricContainer}>
                    <MetricsCard
                      className={styles.MetricsCardGraph}
                      title={<SpendingPeriod onChange={handlePeriodChange} />}
                    >
                      <BarGraph
                        data={months}
                        height={180}
                        width={200}
                        barSize={30}
                        width_percentage="100%"
                        height_percentage="80%"
                      />
                    </MetricsCard>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.TransactionHistoryWrapper}>
              <div className={styles.TransactionHistoryContainer}>
                <div className={styles.TransactionHistoryHeading}>
                  <span
                    className={currentTab ? styles.CurrentTab : styles.Tab}
                    onClick={() => viewTransactions()}
                  >
                    Transactions
                  </span>
                  <span
                    className={nextTab ? styles.CurrentTab : styles.Tab}
                    onClick={() => viewInvoices()}
                  >
                    Invoices
                  </span>
                </div>

                {currentTab && (
                  <div className={styles.TransactionHistoryBody}>
                    <div className={styles.TransactionHistoryTable}>
                      <div className={styles.TransactionHistoryHead}>
                        <div className={styles.TransactionHistoryCell}>
                          Transaction Id
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Status
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Amount
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          Details
                        </div>
                      </div>
                      {transactions?.map((entry, index) => (
                        <div
                          className={styles.TransactionHistoryRow}
                          key={index}
                        >
                          <div className={styles.TransactionHistoryCell}>
                            {entry.transaction_id}
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            <span className={styles.PaymentStatus}>
                              {entry.status}
                            </span>
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            {entry.amount.toLocaleString("en-US")}
                          </div>
                          <div className={styles.TransactionHistoryCell}>
                            <button
                              onClick={() =>
                                openReceiptModal(
                                  transactions,
                                  entry.transaction_id
                                )
                              }
                              className={styles.PaymentDetailsButton}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {nextTab && (
                  <div className={styles.InvoiceHistoryBody}>
                    <div className={styles.InvoiceHistoryTable}>
                      <div className={styles.InvoiceHistoryHead}>
                        <div className={styles.InvoiceHistoryCell}>Date</div>
                        <div className={styles.InvoiceHistoryCell}>
                          Invoice ID
                        </div>
                        <div className={styles.InvoiceHistoryCell}>Amount</div>
                        <div className={styles.InvoiceHistoryCell}>Details</div>
                      </div>
                      <div className={styles.InvoiceHistoryRow}>
                        <div className={styles.InvoiceHistoryCell}>
                          31-01-2022
                        </div>
                        <div className={styles.InvoiceHistoryCell}>
                          87546947
                        </div>
                        <div className={styles.InvoiceHistoryCell}>200,000</div>
                        <div className={styles.InvoiceHistoryCell}>
                          <button className={styles.InvoiceDownloadButton}>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {viewReceipt && (
              <div>
                <Modal showModal={viewReceipt} onClickAway={closeReceiptModal}>
                  <div className={styles.ReceiptModal}>
                    <div className={styles.ReceiptDetailContainer}>
                      {transactionDetails && (
                        <>
                          <div className={styles.ReceiptLabel}>
                            Transaction reference
                          </div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.flutterwave_ref}
                          </div>
                          <div className={styles.ReceiptLabel}>Name</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.name}
                          </div>
                          <div className={styles.ReceiptLabel}>Email</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.email}
                          </div>
                          <div className={styles.ReceiptLabel}>
                            Payment Status
                          </div>
                          <div className={styles.ReceiptDetail}>
                            <div className={styles.PaymentStatus}>
                              {transactionDetails.status}
                            </div>
                          </div>
                          <div className={styles.ReceiptLabel}>Currency</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.currency}
                          </div>
                          <div className={styles.ReceiptLabel}>Amount Paid</div>
                          <div className={styles.ReceiptDetail}>
                            {transactionDetails.amount.toLocaleString("en-US")}
                          </div>
                        </>
                      )}

                      <div className={styles.ReceiptButton}>
                        <PrimaryButton
                          label="Close"
                          className="CancelBtn"
                          onClick={closeReceiptModal}
                        />
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectBillingPage;
