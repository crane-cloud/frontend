import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../Spinner";
import { API_BASE_URL } from "../../config";

const data1 = [
  { name: "CPU / $1 per 1K seconds", value: 400, color: "#0088FE" },
  { name: "RAM / $4 per GB", value: 300, color: "#00C49F" },
  { name: "Network / $1 per request", value: 300, color: "#FFBB28" },
  { name: "Storage/ $1 per GB", value: 200, color: "#FF8042" },
  { name: "Database/ $1 per GB", value: 67, color: "#99D2E9" },
];
const data2 = [
  { date: "2021-08", amount: 1398 },
  { date: "2021-09", amount: 9800 },
  { date: "2021-10", amount: 3908 },
  { date: "2021-11", amount: 4800 },
  { date: "2021-12", amount: 3800 },
  { date: "2022-01", amount: 1267 },
  { date: "2022-02", amount: 1267 },
];
const transactionData = [
  {
    id: "875469470120",
    date: "02-17-2020",
    paymentMethod: "Master Card",
    amount: "$1,267",
    status: {
      text: "Successful",
      color: "#408140",
    },
    receipt: data1,
  },
];
const ProjectBillingPage = (props) => {
  const { projectID } = useParams();
  const { projects } = useSelector((state) => state.userProjectsReducer);
  const { data } = useSelector((state) => state.user);
  const [viewReceipt, setViewReceipt] = useState(false);

  const [months, setMonths] = useState(data2);
  const [transactions, setTransactions] = useState(transactionData);
  // const [payment, setPayment] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/projects/${projectID}/transactions`
      );
      setMonths(response.data.months);
      setTransactions(response.data.transactions);
     // handle error
     if(response.data.error){
        setError(response.data.error);
      }
    };
    fetchData();
  }, [projectID]);

  const openReceiptModal = () => {
    setViewReceipt(true);
  };
  const closeReceiptModal = () => {
    setViewReceipt(false);
  };
  const getProjectName = (id) => {
    return projects.find((project) => project.id === id).name;
  };
  const findSum = () => {
    var sum = 0;
    for (var i = 0; i < data1.length; i++) {
      sum += data1[i].value;
    }
    return sum;
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
                      <div className={styles.ResourcePrice}>${findSum()}</div>
                    </div>
                  </div>
                  <div className={styles.paymentButton}>
                    <FlutterwaveHook
                      amount={30000}
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
                    Current Month-to-Date balance is ${findSum()}
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
                  Transaction History
                </div>
                <div className={styles.TransactionHistoryBody}>
                  <div className={styles.TransactionHistoryTable}>
                    <div className={styles.TransactionHistoryHead}>
                      <div className={styles.TransactionHistoryCell}>Date</div>
                      <div className={styles.TransactionHistoryCell}>
                        Transaction Id
                      </div>
                      <div className={styles.TransactionHistoryCell}>
                        Payment Method
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
                    {transactionData.map((entry, index) => (
                      <div className={styles.TransactionHistoryRow} key={index}>
                        <div className={styles.TransactionHistoryCell}>
                          {entry.date}
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          {entry.id}
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          {entry.paymentMethod}
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          <span
                            className={styles.Status}
                            style={{ background: entry.status.color }}
                          >
                            {entry.status.text}
                          </span>
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          {entry.amount}
                        </div>
                        <div className={styles.TransactionHistoryCell}>
                          <button
                            onClick={openReceiptModal}
                            className={styles.PaymentDetailsButton}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {viewReceipt && (
              <div>
                <Modal showModal={viewReceipt} onClickAway={closeReceiptModal}>
                  <div className={styles.ReceiptModal}>
                    <div className={styles.ReceiptDetailContainer}>
                      <div>
                        <div className={styles.ReceiptLabel}>
                          Transaction ID
                        </div>
                        <div className={styles.ReceiptDetail}>
                          {transactionData[0].id}
                        </div>
                      </div>
                      <div>
                        <div className={styles.ReceiptLabel}>Date</div>
                        <div className={styles.ReceiptDetail}>
                          {transactionData[0].date}
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.ReceiptLabel}
                      style={{ padding: "0.8rem" }}
                    >
                      Receipt
                    </div>
                    <div className={styles.MonthSummary}>
                      {transactionData[0].receipt.map((entry, index) => (
                        <div className={styles.ResourseDetail} key={index}>
                          <div
                            className={styles.Cube}
                            style={{
                              background: `${
                                transactionData[0].receipt[
                                  index % transactionData[0].receipt.length
                                ].color
                              }`,
                            }}
                          />
                          <div className={styles.ResourceName}>
                            {
                              transactionData[0].receipt[
                                index % transactionData[0].receipt.length
                              ].name
                            }
                          </div>
                          <div className={styles.ResourcePrice}>
                            $
                            {
                              transactionData[0].receipt[
                                index % transactionData[0].receipt.length
                              ].value
                            }
                          </div>
                        </div>
                      ))}
                      <div className={styles.Total}>
                        <div className={styles.TotalTxt}>Paid</div>
                        <div className={styles.ResourcePrice}>${findSum()}</div>
                      </div>
                    </div>

                    <div className={styles.ReceiptButton}>
                      <PrimaryButton
                        label="Close"
                        className="CancelBtn"
                        onClick={closeReceiptModal}
                      />
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
