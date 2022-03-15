import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../Header";
import SideBar from "../SideBar";
import InformationBar from "../InformationBar";
import Modal from "../../components/Modal";
import PrimaryButton from "../PrimaryButton";
import DonutChart from "../DonutChart";
import BarGraph from "../BarGraph";
import MetricsCard from "../MetricsCard";
import SpendingPeriod from "../SpendingPeriod";
import styles from "./ProjectBillingPage.module.css";
import { ReactComponent as MastercardIcon } from "../../assets/images/logo-mastercard.svg";
import { ReactComponent as VisaIcon } from "../../assets/images/visa.svg";
import { ReactComponent as FlutterwaveIcon } from "../../assets/images/flutterwave.svg";
import BlackInputText from "../BlackInputText";
import Tooltip from "../Tooltip";

const data = [
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
    receipt: data,
  },
];

class ProjectBillingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewReceipt: false,
      paymentModal: false,
      time: {
        start: 0,
        end: 0,
      },
      period: "5m",
      months: data2,
      seen_steps: [1],
      modal_current_step: 1,
      amount: "$1267",
      holder_name: "",
      card_number: "",
      expiry_month: "",
      expiry_year: "",
      cvv_number: "",
      paymentMethod: "",
    };
    this.closePaymentModal = this.closePaymentModal.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.findSum = this.findSum.bind(this);
    this.closeReceiptModal = this.closeReceiptModal.bind(this);
    this.openReceiptModal = this.openReceiptModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.RevertToMethods = this.RevertToMethods.bind(this);
    this.FromPaymentMethods = this.FromPaymentMethods.bind(this);
  }
  componentDidMount() {
    // this.setState({
    //  isLoading: true,
    // });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  RevertToMethods() {
    this.setState({
      seen_steps: [1],
      modal_current_step: 1,
    });
  }
  FromPaymentMethods() {
      this.setState({
        seen_steps: [1, 2],
        modal_current_step: 2,
      });
  }

  openPaymentModal() {
    this.setState({ paymentModal: true });
  }

  closePaymentModal() {
    this.setState({ paymentModal: false });
  }

  openReceiptModal() {
    this.setState({ viewReceipt: true });
  }

  closeReceiptModal() {
    this.setState({ viewReceipt: false });
  }

  getProjectName = (id) => {
    const { projects } = this.props;
    return projects.find((project) => project.id === id).name;
  };
  findSum() {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      sum += data[i].value;
    }
    return sum;
  }
  async handlePeriodChange(period, customTime = null) {
    this.setState({ period });
    let startTimeStamp;
    let endTimeStamp = new Date();

    if (period === "5m") {
      startTimeStamp = new Date(
        endTimeStamp.setMonth(endTimeStamp.getMonth() - 5)
      );
      endTimeStamp = new Date();
      let newMonths = [];
      for (var i = 0; i < data2.length; i++) {
        if (new Date(data2[i].date).getTime() >= startTimeStamp.getTime()) {
          newMonths.push(data2[i]);
        }
      }

      this.setState({ months: newMonths });
    }
    if (period === "all") {
      // get all months
      this.setState({ months: data2 });
    } else if (period === "custom" && customTime !== null) {
      startTimeStamp = customTime.start;
      endTimeStamp = customTime.end;
      let newMonths = [];
      for (var n = 0; n < data2.length; n++) {
        if (
          new Date(data2[n].date).getTime() >=
            new Date(startTimeStamp).getTime() &&
          new Date(data2[n].date).getTime() <= new Date(endTimeStamp).getTime()
        ) {
          newMonths.push(data2[n]);
        }
      }
      this.setState({ months: newMonths });
    }
    this.setState((prevState) => ({
      time: {
        ...prevState.time,
        end: endTimeStamp,
        start: startTimeStamp,
      },
    }));
  }
 

  render() {
    const {
      match: { params },
    } = this.props;
    const { projectID } = params;
    const { paymentModal,
       viewReceipt, 
       months, 
       seen_steps,
      modal_current_step,
      amount,
      holder_name,
      card_number,
      expiry_year,
      cvv_number,
      expiry_month,
      paymentMethod,
      } = this.state;

    return (
      <div className={styles.Page}>
        <div className={styles.TopBarSection}>
          <Header />
        </div>
        <div className={styles.MainSection}>
          <div className={styles.SideBarSection}>
            <SideBar
              name={this.getProjectName(projectID)}
              params={params}
              pageRoute={this.props.location.pathname}
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
                      The chart below shows the proportion of costs spent for
                      each service you use on the platform
                    </div>
                    <DonutChart
                      center_x={60}
                      center_y={70}
                      InnerRadius={30}
                      OuterRadius={50}
                      data={data}
                      height={150}
                      width={130}
                    />

                    <div className={styles.MonthSummary}>
                      {data.map((entry, index) => (
                        <div className={styles.ResourseDetail} key={index}>
                          <div
                            className={styles.Cube}
                            style={{
                              background: `${data[index % data.length].color}`,
                            }}
                          />
                          <div className={styles.ResourceName}>
                            {data[index % data.length].name}
                          </div>
                          <div className={styles.ResourcePrice}>
                            ${data[index % data.length].value}
                          </div>
                        </div>
                      ))}
                      <div className={styles.Total}>
                        <div className={styles.TotalTxt}>Total</div>
                        <div className={styles.ResourcePrice}>
                          ${this.findSum()}
                        </div>
                      </div>
                    </div>
                    <div className={styles.paymentButton}>
                      <PrimaryButton
                        label={"Pay Bill"}
                        onClick={this.openPaymentModal}
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
                      Current Month-to-Date balance is ${this.findSum()}
                    </div>
                    <div className={styles.MetricContainer}>
                      <MetricsCard
                        className={styles.MetricsCardGraph}
                        title={
                          <SpendingPeriod onChange={this.handlePeriodChange} />
                        }
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
                        <div className={styles.TransactionHistoryCell}>
                          Date
                        </div>
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
                        <div
                          className={styles.TransactionHistoryRow}
                          key={index}
                        >
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
                              onClick={this.openReceiptModal}
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
              {paymentModal && (
                <div>
                  <Modal
                    showModal={paymentModal}
                    onClickAway={this.closePaymentModal}
                  >
                    
                    <div className={styles.PaymentModal}>
                      <div className={styles.StepSection}>
                      <div className={styles.StepInnerSection}>
                      <div className={styles.StepNumber}>1</div>
                      <span className={seen_steps.length > 1
                       || modal_current_step === 1 ? styles.currentdot : styles.dot}
                       onClick={() => {this.RevertToMethods()}}
                       ></span>
                      </div>
                      <div className={styles.StepInnerSection}>
                      <div className={styles.StepNumber}>2</div>
                      <span className={seen_steps.length>2
                       || modal_current_step === 2 ? styles.currentdot : styles.dot}
                       onClick={() => {this.FromPaymentMethods()}}
                       ></span>
                      </div>
                      </div>
                      { seen_steps.length === 1 && modal_current_step===1 &&
                      <div className={styles.Methods}>
                      <div className={styles.PaymentHead}>
                        <div className={styles.PaymentModalHeader}>
                          Choose a payment method.
                        </div>
                        <div className={styles.StepInnerSection}>
                          <div className={styles.StepNumber}>2</div>
                          <span
                            className={
                              seen_steps.length > 2 || modal_current_step === 2
                                ? styles.currentdot
                                : styles.dot
                            }
                            onClick={() => {
                              this.FromPaymentMethods();
                            }}
                          ></span>
                        </div>
                      </div>

                      <div className={styles.PaymentModalBody}>
                        <div className={paymentMethod==="MasterCard"?
                        styles.PaymentIconSelected: styles.PaymentIcon
                          }  
                          onClick={() => {this.setState({paymentMethod:"MasterCard"})} }>
                          <MastercardIcon />
                        </div>
                        <div className={paymentMethod==="VisaCard"?
                        styles.PaymentIconSelected: styles.PaymentIcon
                        } 
                        onClick={() => {this.setState({paymentMethod:"VisaCard"})}}>
                          <VisaIcon />
                        </div>
                        <div className={paymentMethod==="FlutterWave"? 
                        styles.PaymentIconSelected: styles.PaymentIcon
                        } 
                        onClick={() => {this.setState({paymentMethod:"FlutterWave"})}}>
                          <FlutterwaveIcon />
                        </div>
                      </div>
                      <div className={styles.PaymentButtons}>
                        <PrimaryButton
                          label="CANCEL"
                          className="CancelBtn"
                          onClick={this.closePaymentModal}
                        />
                        <PrimaryButton 
                        onClick={this.FromPaymentMethods}
                        label={"PROCEED"} />
                      </div>
                     </div>}
                     { seen_steps.length === 2 && modal_current_step===2 &&
                      <>
                     <div className={styles.PaymentInput}>
                      <div className={styles.FormText}>
                       Amount 
                     </div>
                     <BlackInputText
                     name="amount"
                     value={amount}
                      />
                    </div>
                    <div className={styles.PaymentInput}>
                      <div className={styles.FormText}>
                       CardHolder's Name
                     </div>
                     <div className={styles.InputFieldWithTooltip}>
                     <BlackInputText
                    required
                    placeholder="Name on card"
                    name="holder_name"
                    value={holder_name}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className={styles.InputTooltipContainer}>
                    <Tooltip
                      showIcon
                      message="The name on the card"
                      position="left"
                    />
                  </div>
                  </div>
                  </div>
                  <div className={styles.PaymentInput}>
                      <div className={styles.FormText}>
                       Card Number
                     </div>
                     <div className={styles.InputFieldWithTooltip}>
                     <BlackInputText
                    required
                    placeholder="Card number"
                    name="card_number"
                    value={card_number}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className={styles.InputTooltipContainer}>
                    <Tooltip
                      showIcon
                      message="The number at the front of the card."
                      position="left"
                    />
                  </div>
                  </div>
                  </div>
                  <div className={styles.PaymentInput}>
                    <div className={styles.DatesOuterSection}>
                    <div className={styles.PaymentInput}>
                    <div className={styles.DatesSection}>
                    <div className={styles.FormText}>
                       Expiry Month
                     </div>
                    <Tooltip
                      showIcon
                      message="The month the card will expire, its at the front of your card"
                      position="right"
                    />
                    </div>
                    <BlackInputText
                    required
                    type="Number"
                    placeholder="12"
                    name="expiry_month"
                    value={expiry_month}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                    </div>
                    <div className={styles.PaymentInput}>
                    <div className={styles.DatesSection}>
                    <div className={styles.FormText}>
                       Expiry Year
                     </div>
                    <Tooltip
                      showIcon
                      message="The year the card will expire, its at the front of your card"
                      position="right"
                    />
                    </div>
                    <BlackInputText
                    required
                    type="Number"
                    placeholder="2025"
                    name="expiry_year"
                    value={expiry_year}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                    </div>
                
                  </div>
                  </div>
                  <div className={styles.PaymentInput}>
                      <div className={styles.FormText}>
                       CVV Number
                     </div>
                     <div className={styles.InputFieldWithTooltip}>
                     <BlackInputText
                    required
                    type="Number"
                    placeholder="CVV Number"
                    name="cvv_number"
                    value={cvv_number}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  />
                  <div className={styles.InputTooltipContainer}>
                    <Tooltip
                      showIcon
                      message="The cvv 3 digit number behind the card"
                      position="left"
                    />
                  </div>
                  </div>
                  </div>
                    
                      <div className={styles.PaymentButtons}>
                        <PrimaryButton
                          label="BACK"
                          className="CancelBtn"
                          onClick={this.RevertToMethods}
                        />
                        <PrimaryButton label={"PAY BILL"} />
                      </div>
                     </>}
                    </div>

                  </Modal>
                </div>
              )}
              {viewReceipt && (
                <div>
                  <Modal
                    showModal={viewReceipt}
                    onClickAway={this.closeReceiptModal}
                  >
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
                          <div className={styles.ResourcePrice}>
                            ${this.findSum()}
                          </div>
                        </div>
                      </div>

                      <div className={styles.ReceiptButton}>
                        <PrimaryButton
                          label="Close"
                          className="CancelBtn"
                          onClick={this.closeReceiptModal}
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
  }
}

ProjectBillingPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => {
  const { projects } = state.userProjectsReducer;
  return {
    projects,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBillingPage);
