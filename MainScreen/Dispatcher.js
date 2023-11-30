import React, { Component } from "react";
import { MainContext } from "../core/MainContext";
import { CONFIG } from "../helpers/configFb";
import {
  Row,
  Col,
  Card,
  Badge,
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  Modal,
  DropdownButton,
  Dropdown,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip,
  ModalBody,
  FormCheck,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  dispDoc,
  findWoByNumber,
  findWoForCurrentUser,
  updateDispatcherData,
  jobData,
  updateChanges,
  setJobStatus,
} from "../helpers/fireStoreMain";
import FormFileLabel from "react-bootstrap/esm/FormFileLabel";
import UcFirst from "../App/components/UcFirst";
import { TableBody } from "semantic-ui-react";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

const estimtable = document.getElementById("esTimmNeededTable");
const jobdonetable = document.getElementById("jobDoneTable");


class Dispatcher extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);
    
    

    this.state = {
      showTable: true,
      writeAccess: true,

      estimTechName: "",
      estimTechCon: "",
      estimTechproffesion: "",
      estimCost: "",
      estimPaidby: "",
      estimPaymentAdress: "",
      estimTechDescription: "",
      estimscheduleddate: "",
      estimscheduledtimee: "",

      jobDoneTechName: "",
      jobDoneTechCon: "",
      jobdoneTechproffesion: "",
      jobDoneCost: "",
      jobDonePaidby: "",
      jobDonePaymentAdress: "",
      jobDoneHours: "",
      jobDoneTechDescription: "",
      suppliyer: "",
      otherSuppliyer: "",
      material: "",
      jobdonescheduledate: "",
      jobdonescheduledtime: "",

      dispId: "",
      jobType: "",

      data: {
        estimTechName: "",
        estimTechCon: "",
        estimTechproffesion: "",
        estimCost: "",
        estimPaidby: "",
        estimPaymentAdress: "",
        estimTechDescription: "",
        estimscheduleddate: "",
        estimscheduledtimee: "",

        jobDoneTechName: "",
        jobDoneTechCon: "",
        jobdoneTechproffesion: "",
        jobDoneCost: "",
        jobDonePaidby: "",
        jobDonePaymentAdress: "",
        jobDoneHours: "",
        jobDoneTechDescription: "",
        suppliyer: "",
        otherSuppliyer: "",
        material: "",
        jobdonescheduledate: "",
        jobdonescheduledtime: "",

        dispId: "",
        jobType: "",
      },
      errorMessage: "",
      woNbSearch: "",
      subClicked: false,
      onFindWOClick: false,
      jobDoneNeededCount: 0,
      estimNeededCount: 0,

      estimationListModal: false,
      JobDoneListModal: false,
      on1stsubmitclick: false,
      on2cdsubmitclick: false,
      onestimclicktoconfirm: false,

      estimNeededList: [],
      jobDoneList: [],
      jobList: [],
      estimJobList: [],
      jobDoneJobList: [],
      selectedJob: {},

      closeJobItemModal: false,
      modalDisplayWOdetails: false,
      estimationProcess: false,

      estimationFinalize: false,
     
    };
  }

  estimationProcess = () => {};
  on1stsubmitclick = () => {};
  on2cdsubmitclick = () => {};
  onestimclicktoconfirm = () => {};
  onFindWOClick = () => {};
  estimationListModal = () => {};
  JobDoneListModal = () => {};
  checkbox1Checked = () => {};

  onSubmitEstimation = () => {
    const data = {
      estimTechName: this.state.estimTechName,
      estimTechCon: this.state.estimTechCon,
      estimTechproffesion: this.state.estimTechproffesion,
      estimCost: this.state.estimCost,
      estimPaidby: this.state.estimPaidby,
      estimPaymentAdress: this.state.estimPaymentAdress,
      estimTechDescription: this.state.estimTechDescription,
      estimscheduleddate: this.state.estimscheduleddate,
      estimscheduledtimee: this.state.estimscheduledtimee,

      jobDoneTechName: this.state.jobDoneTechName,
      jobDoneTechCon: this.state.jobDoneTechCon,
      jobdoneTechproffesion: this.state.jobdoneTechproffesion,
      jobDoneCost: this.state.jobDoneCost,
      jobDonePaidby: this.state.jobDonePaidby,
      jobDonePaymentAdress: this.state.jobDonePaymentAdress,
      jobDoneHours: this.state.jobDoneHours,
      jobDoneTechDescription: this.state.jobDoneTechDescription,
      suppliyer: this.state.suppliyer,
      otherSuppliyer: this.state.otherSuppliyer,
      material: this.state.material,
      jobdonescheduledate: this.state.jobdonescheduledate,
      jobdonescheduledtime: this.state.jobdonescheduledtime,

      jobType: this.state.jobType,
    };

    // Assuming 'updateDispatcherData' and 'setJobStatus' return promises
    updateDispatcherData(this.state.selectedJob.id, data)
      .then(() => {
        return setJobStatus(this.state.selectedJob.id, "estimationScheduled");
      })
      .then(() => {
        // Handle any further actions after setting job status
      })
      .catch((error) => {
        // Handle errors here
      });
  };
  onSubmitJobDone = (item) => {
    const data = {
      estimTechName: item.data.dispatcherData.estimTechName,
      estimTechCon: item.data.dispatcherData.estimTechCon,
      estimTechproffesion: item.data.dispatcherData.estimTechproffesion,
      estimCost: item.data.dispatcherData.estimCost,
      estimPaidby: item.data.dispatcherData.estimPaidby,
      estimPaymentAdress: item.data.dispatcherData.estimPaymentAdress,
      estimTechDescription: item.data.dispatcherData.estimTechDescription,
      estimscheduleddate: item.data.dispatcherData.estimscheduleddate,
      estimscheduledtimee: item.data.dispatcherData.estimscheduledtimee,

      jobDoneTechName: this.state.jobDoneTechName,
      jobDoneTechCon: this.state.jobDoneTechCon,
      jobdoneTechproffesion: this.state.jobdoneTechproffesion,
      jobDoneCost: this.state.jobDoneCost,
      jobDonePaidby: this.state.jobDonePaidby,
      jobDonePaymentAdress: this.state.jobDonePaymentAdress,
      jobDoneHours: this.state.jobDoneHours,
      jobDoneTechDescription: this.state.jobDoneTechDescription,
      suppliyer: this.state.suppliyer,
      otherSuppliyer: this.state.otherSuppliyer,
      material: this.state.material,
      jobdonescheduledate: this.state.jobdonescheduledate,
      jobdonescheduledtime: this.state.jobdonescheduledtime,

      jobType: this.state.jobType,
    };

    // Assuming 'updateDispatcherData' and 'setJobStatus' return promises
    updateDispatcherData(this.state.selectedJob.id, data)
      .then(() => {
        return setJobStatus(this.state.selectedJob.id, "jobDoneScheduled");
      })
      .then(() => {
        // Handle any further actions after setting job status
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  updateDimensions = () => {
    console.log("7777777777777", window.innerWidth);
    this.setState({ innerWidth: window.innerWidth });
    const width = window.innerWidth;
  };
  countStatus = (status) => {
    const count = this.state.jobList.filter(
      (item) => item.data.status === status
    ).length;
    return count;
  };

  componentDidMount() {
    const estimNeededCount = this.countStatus("estimationNeeded");
    const jobDoneNeededCount = this.countStatus("jobDoneNeeded");

    this.setState({
      estimNeededCount,
      jobDoneNeededCount,
    });
  }

  componentDidMount() {
    this.countEstimNeeded(); // Call the count function on mount
  }
  countEstimNeeded = () => {
    const count = this.state.jobList.filter(
      (item) => item.data.status === "estimationNeeded"
    );

    this.setState({ estimNeededCount: count });
  };

  componentDidMount() {
    this.countJobDoneNeeded(); // Call the count function on mount
  }
  countJobDoneNeeded = () => {
    const count = this.state.jobList.filter(
      (item) => item.data.status === "jobDoneNeeded"
    ).length;

    this.setState({ jobDoneNeededCount: count });
  };

  componentDidMount = async () => {
    window.addEventListener("resize", this.updateDimensions);
    const context = this.context;
    console.log("context.currentUser.uid", context.currentUser);

    if (context.currentUser !== null) {
      const estimNeededList =
        (await findWoForCurrentUser(context.currentUser.uid)) |
        (this.state.jobStatus === "estimationNeeded");

      const jobDoneList =
        (await findWoForCurrentUser(context.currentUser.uid)) |
        (this.state.jobStatus === "jobDoneNeeded");

      const jobList = await findWoForCurrentUser(context.currentUser.uid).then(
        (resp) => {
          const a = this.getEstimatedPending(resp);
          const b = this.getJobDonePending(resp);
          this.setState({
            jobList: resp,
            estimationPending: a.tostring,
            jobDonePending: b.tostring,
          });
        }
      );

      // this.setState({
      //   estimNeededList,
      //   jobDoneList,
      //   // jobList,
      // });
    }
  };

  getEstimatedPending = async (list) => {
    let count = 0;
    list.map((item) => {
      if (item.data.status === "estimationNeeded") count = count + 1;
    });
    this.setState({ estimNeededCount: count });
    console.log("pendinnnnnnnnfffgggggg estimationn", count);
    return count;
  };
  getJobDonePending = async (list) => {
    let count = 0;
    list.map((item) => {
      if (item.data.status === "jobDoneNeeded") count = count + 1;
    });
    this.setState({ jobDoneNeededCount: count });
    console.log("pendinnnnnnnnfffgggggg jobdone", count);
    return count;
  };

  handleClose = () => {
    this.setState({ estimationProcess: false });
    this.setState({ closeJobItemModal: false });
    this.setState({ estimationListModal: false });
    this.setState({ JobDoneListModal: false });
    this.setState({ on1stsubmitclick: false });
    this.setState({ onestimclicktoconfirm: false });
    this.setState({ on2cdsubmitclick: false });
    this.setState({ onSubmitClick: false });
    this.setState({ modalDisplayWOdetails: false });
    this.setState({ estimationFinalize: false });
  };
  onPressed = () => {
    const { password } = this.state;
    this.setState({
      data: {
        estimTechName: "",
        estimTechCon: "",
        estimTechproffesion: "",
        estimCost: "",
        estimPaidby: "",
        estimPaymentAdress: "",
        estimTechDescription: "",
        estimscheduleddate: "",
        estimscheduledtimee: "",

        jobDoneTechName: "",
        jobDoneTechCon: "",
        jobdoneTechproffesion: "",
        jobDoneCost: "",
        jobDonePaidby: "",
        jobDonePaymentAdress: "",
        jobDoneHours: "",
        jobDoneTechDescription: "",
        suppliyer: "",
        otherSuppliyer: "",
        material: "",
        jobdonescheduledate: "",
        jobdonescheduledtime: "",

        dispId: "",
        jobType: "",
      },
    });
  };

  render() {
    const { selectedTarget } = this.state;
    const context = this.context;
    console.log("ontext.currentUser.uidTTTTTTTTT", this.state.selectedJob);
    // const numberofEstimLine = this.getEstimatedPending(this.state.jobList);

    const tabEstimationbContent = (
      <row
        style={{
          display: "flex",
        }}
      >
        <div>
          {" "}
          <div>
            <Col>
              {" "}
              <row>
                {" "}
                <button
                  color="lightblue"
                  style={{}}
                  onClick={() => this.targetHandler("target1")}
                  aria-controls="target1"
                  aria-expanded={selectedTarget === "target1"}
                >
                  UpLoad Pictures
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <button
                  color="lightblue"
                  style={{}}
                  onClick={() => this.targetHandler("target2")}
                  aria-controls="target2"
                  aria-expanded={selectedTarget === "target2"}
                >
                  UpLoad SignOff Sheet
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <button
                  onClick={() => this.targetHandler("target3")}
                  aria-controls="target3"
                  aria-expanded={selectedTarget === "target3"}
                >
                  Upload Tech's Quotation
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <button
                  onClick={() => this.targetHandler("target4")}
                  aria-controls="target4"
                  aria-expanded={selectedTarget === "target4"}
                >
                  Upload Tech's Recommendations
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <Button
                  onClick={() =>
                    (this.state.selectedJob.data = "JobDoneNeeded")
                  }
                >
                  Finish On Site
                </Button>{" "}
              </row>{" "}
            </Col>{" "}
          </div>
          <Form.Control
            aria-controls="target5"
            aria-expanded={selectedTarget === "target5"}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1%",
            }}
            placeholder=" Tech's Recommendations"
            as="textarea"
            rows="3"
          />{" "}
          <div style={{ width: "100%" }} className="input-group mb-3">
            <span
              style={{ width: "40%" }}
              className="input-group-text"
              id="submdate-label"
            >
              Tech Can finish it on :
            </span>
            <input
              style={{ backgroundColor: "whitesmoke" }}
              type="date"
              className="form-control"
              placeholder=""
              value=""
              onChange={(event) =>
                this.setState({
                  jobdonescheduledate: event.target.value,
                })
              }
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1%",
              }}
              onClick={() => this.targetHandler("target3")}
              aria-controls="target3"
              aria-expanded={selectedTarget === "target3"}
            >
              Submit to Finalize Estimation
            </Button>
          </div>
        </div>
      </row>
    );

    const tabbJobdoneContent = (
      <row
        style={{
          display: "flex",
        }}
      >
        <div>
          {" "}
          <div>
            <Col>
              {" "}
              <row>
                {" "}
                <button
                  color="lightblue"
                  style={{}}
                  onClick={() => this.targetHandler("target1")}
                  aria-controls="target1"
                  aria-expanded={selectedTarget === "target1"}
                >
                  UpLoad b4 & After
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <button
                  color="lightblue"
                  style={{}}
                  onClick={() => this.targetHandler("target2")}
                  aria-controls="target2"
                  aria-expanded={selectedTarget === "target2"}
                >
                  UpLoad SignOff Sheet
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <button
                  onClick={() => this.targetHandler("target3")}
                  aria-controls="target3"
                  aria-expanded={selectedTarget === "target3"}
                >
                  Upload Tech's Quotation
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <button
                  onClick={() => this.targetHandler("target4")}
                  aria-controls="target4"
                  aria-expanded={selectedTarget === "target4"}
                >
                  Upload Tech's Recommendations
                </button>{" "}
              </row>{" "}
              <row>
                {" "}
                <Button
                  onClick={() => this.targetHandler("target4")}
                  aria-controls="target4"
                  aria-expanded={selectedTarget === "target4"}
                >
                  Finish On Site
                </Button>{" "}
              </row>{" "}
            </Col>{" "}
          </div>
          <Form.Control
            aria-controls="target5"
            aria-expanded={selectedTarget === "target5"}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1%",
            }}
            placeholder=" Tech's Recommendations"
            as="textarea"
            rows="3"
          />{" "}
          <div style={{ width: "100%" }} className="input-group mb-3">
            <span
              style={{ width: "40%" }}
              className="input-group-text"
              id="submdate-label"
            >
              Tech Can finish it on :
            </span>
            <input
              style={{ backgroundColor: "whitesmoke" }}
              type="date"
              className="form-control"
              placeholder=""
              value=""
              onChange={(event) =>
                this.setState({
                  jobdonescheduledate: event.target.value,
                })
              }
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1%",
              }}
              onClick={() => this.targetHandler("target3")}
              aria-controls="target3"
              aria-expanded={selectedTarget === "target3"}
            >
              Submit to Finalize Estimation
            </Button>
          </div>
        </div>
      </row>
    );

    const buttonBadgesEst = (
      <Button variant={""}>
        <UcFirst text={""} />
        <Badge
          variant="light"
          style={{ fontSize: 14, color: "red" }}
          className="ml-1"
        >
          {this.state.estimNeededCount}
        </Badge>
      </Button>
    );

    const buttonBadgesJobDone = (
      <Button variant={""}>
        <UcFirst text={""} />
        <Badge
          variant="light"
          style={{ fontSize: 14, color: "red" }}
          className="ml-1"
        >
          {this.state.jobDoneNeededCount}
        </Badge>
      </Button>
    );

    return (
      <div>
        {" "}
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Modal
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "-4%",
            }}
            show={this.state.JobDoneListModal}
            onHide={this.handleClose}
            centered
          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Schedule New Job Done
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "white", width: "200%" }}>
              <Card className="NewWorkOrders">
                <Card.Body className="px-0 py-2">
                  <Table
                    responsive
                    hover
                    style={{ backgroundColor: "white" }}
                    className="table mt-3"
                    id="tablepadding"
                  > <thead>
                   <tr>
                  <th>WO numb</th>
                  <th>Job location</th>
                  <th>contact</th>
                  <th>Trade</th>
                  <th>NTE</th>
                  <th>Client Name</th>
                  <th>Submitted date</th>
                  <th>Needed Date</th>
                  <th>Urgency</th>
                  <th>Job Description</th>
                </tr>
                    </thead>
                    <tbody>
                      {this.state.jobList.map((item, index) => {
                        // Add a condition to filter rows based on jobStatus
                        if (item.data.status === "jobDoneNeeded") {
                          return (
                            <tr
                              key={index}
                              onClick={() => {
                                console.log("PRESSSEEDDDDDDD");
                                this.setState({
                                  closeJobItemModal: true,
                                 
                                  selectedJob: item,
                                });
                              }}
                            >
                              <td>{item.data.woNum}</td>
                        <td>{item.data.jobData.joblocation}</td>
                        <td>{item.data.jobData.contact}</td>
                        <td>{item.data.jobData.trade}</td>
                        <td>{item.data.jobData.nte}</td>
                        <td>{item.data.jobData.clientName}</td>
                        <td>{item.data.jobData.submdate}</td>
                        <td>{item.data.jobData.neededdate}</td>
                        <td>{item.data.jobData.urgency}</td>
                        <td>{item.data.jobData.jobdescr}</td>
                              <td
                                style={{
                                  paddingTop: "3px",
                                  display: "flex",
                                }}
                              ></td>
                            </tr>
                          );
                        } else {
                          // Return null if the condition isn't met to skip rendering the row
                          return null;
                        }
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer
              style={{
                height: "80%",
                backgroundColor: "whitesmoke",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
            ></Modal.Footer>
          </Modal>

          {/* {heda te3 new jobdone list} */}

          <Modal
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "-4%",
            }}
            show={this.state.estimationListModal}
            onHide={this.handleClose}
            centered
          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Schedule New estimation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "white", width: "200%" }}>
              <Card className="NewWorkOrders">
                <Card.Body className="px-0 py-2">
                  <Table
                    responsive
                    hover
                    style={{ backgroundColor: "white" }}
                    className="table mt-3"
                    id="tablepadding"
                  >
                    <thead>
                    <tr>
                  <th>WO numb</th>
                  <th>Job location</th>
                  <th>contact</th>
                  <th>Trade</th>
                  <th>NTE</th>
                  <th>Client Name</th>
                  <th>Submitted date</th>
                  <th>Needed Date</th>
                  <th>Urgency</th>
                  <th>Job Description</th>
                </tr>
                    </thead>
                    <tbody>
                      {this.state.jobList.map((item, index) => {
                        if (item.data.status === "estimationNeeded") {
                          return (
                            <tr
                              key={index}
                              onClick={() => {
                                console.log("PRESSSEEDDDDDDD");
                                this.setState({
                                  estimationProcess: true,
                                  estimationListModal: false,
                                  selectedJob: item,
                                });
                              }}
                              style={{
                                backgroundColor:
                                  item.data.jobData.neededdate === "today"? "red" : "lightorange",
                              }}
                            >
                           <td>{item.data.woNum}</td>
                        <td>{item.data.jobData.joblocation}</td>
                        <td>{item.data.jobData.contact}</td>
                        <td>{item.data.jobData.trade}</td>
                        <td>{item.data.jobData.nte}</td>
                        <td>{item.data.jobData.clientName}</td>
                        <td>{item.data.jobData.submdate}</td>
                        <td>{item.data.jobData.neededdate}</td>
                        <td>{item.data.jobData.urgency}</td>
                        <td>{item.data.jobData.jobdescr}</td>
                              <td
                                style={{
                                  paddingTop: "3px",
                                  display: "flex",
                                }}
                              ></td>
                            </tr>
                          );
                        } else {
                          // Return null if the condition isn't met to skip rendering the row
                          return null;
                        }
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Modal.Body>
            <Modal.Footer
              style={{
                height: "80%",
                backgroundColor: "whitesmoke",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
            ></Modal.Footer>
          </Modal>
          {/* heda te3 estimation list */}

          <Modal
            centered
            style={{
              marginLeft: "-4%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "InfoText",
            }}
            show={this.state.estimationProcess}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "130%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  width: "130%",
                  // backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Estimation Proccessing
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              md={3}
              style={{
                width: "130%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form>
                <Row>
                  <Col style={{ marginleft: "-55%" }}>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%" }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text>Tech Name</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Tech Name"
                        style={{
                          background: "whitesmoke",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimTechName: text.target.value,
                          });
                        }}
                        title={this.state.selectedDDdata}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%" }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text>Tech Contact</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Tech Contact"
                        style={{
                          background: "whitesmoke",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimTechCon: text.target.value,
                          });
                        }}
                        title={this.state.selectedDDdata}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Profession
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimTechproffesion: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Trade
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({ jobType: text.target.value });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          NTE
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({ estimCost: text.target.value });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Date
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="date"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimscheduleddate: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Time
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="time"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimscheduledtimee: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md={5}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Note About Job</Form.Label>
                      <Form.Control
                        style={{
                          width: "110%",
                          display: "flex",
                          backgroundColor: "whitesmoke",
                          flexDirection: "row",
                        }}
                        onChange={(text) => {
                          this.setState({
                            estimTechDescription: text.target.value,
                          });
                        }}
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>{" "}
                    <div>
                      <InputGroup
                        size="sm"
                        className="mb-3"
                        style={{ width: "110%", marginTop: 20 }}
                      >
                        <InputGroup.Prepend style={{ width: "44%" }}>
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Submited Date
                          </InputGroup.Text>{" "}
                        </InputGroup.Prepend>
                        <FormFileLabel
                          aria-label="Small"
                          style={{
                            background: "whitesmoke",
                            display: "flex",
                            borderColor: "grey",
                          }}
                        />

                        <d
                          style={{
                            marginLeft: "10%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Assuming selectedJob is set somewhere in your component's state */}
                          {this.state.selectedJob && (
                            <div>
                              {this.state.selectedJob?.data?.jobData?.submdate}
                            </div>
                          )}
                        </d>
                      </InputGroup>
                      <InputGroup
                        size="sm"
                        className="mb-3"
                        style={{ width: "110%", marginTop: 20 }}
                      >
                        <InputGroup.Prepend style={{ width: "43%" }}>
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Needed Date
                          </InputGroup.Text>{" "}
                        </InputGroup.Prepend>
                        <FormFileLabel
                          aria-label="Small"
                          style={{
                            background: "whitesmoke",
                            display: "flex",
                            borderColor: "grey",
                          }}
                        />

                        <d
                          style={{
                            marginLeft: "10%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Assuming selectedJob is set somewhere in your component's state */}
                          {this.state.selectedJob && (
                            <div>
                              {
                                this.state.selectedJob?.data?.jobData
                                  ?.neededdate
                              }
                            </div>
                          )}
                        </d>
                      </InputGroup>

                      <InputGroup
                        size="sm"
                        className="mb-3"
                        style={{ width: "110%", marginTop: 20 }}
                      >
                        <InputGroup.Prepend style={{ width: "43%" }}>
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Your Name
                          </InputGroup.Text>{" "}
                        </InputGroup.Prepend>
                        <FormFileLabel
                          aria-label="Small"
                          style={{
                            background: "whitesmoke",
                            display: "flex",
                            borderColor: "grey",
                          }}
                        />
                        <d
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {context.currentUser != null
                            ? context.currentUser.name +
                              " " +
                              context.currentUser.lastName
                            : this.state.userName}
                        </d>
                      </InputGroup>
                    </div>
                    <div>
                      <div></div>{" "}
                      <div
                        style={{
                          width: "",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "-9%",
                        }}
                      >
                        <Button
                          variant="primary"
                          style={{ width: "50%", marginTop: "8%" }}
                          onClick={() => {
                            this.setState({ on1stsubmitclick: true });
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          style={{ width: "50%", marginTop: "8%" }}
                          variant="secondary"
                          onClick={() => {
                            this.handleClose();
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer
              style={{
                width: "130%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >

              <div> Hello there, we need someone for<h7 style={{color:"red"}}> {this.state.selectedJob?.data?.jobData?.trade}</h7>{"  "}
                      to:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.jobdescr}</h7>{"   "}
                     At:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.joblocation}</h7>{"   "}          
                     Asap please, Maximum by:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.neededdate}</h7>{"   "}
                     . You guys do free estimation, right? 
                     <h7 style={{color:"green"}} >YES?</h7> AWESOME!   
                     {" "} <h7 style={{color:"green"}} > No?</h7>  how much you guys charge? the best i can do is:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.nte}-25$</h7> {"   "}
                     no? ok ok give me a minute i will ask my manager, i might be able to get you: <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.nte}</h7>

              </div>
                            

            </Modal.Footer>
          </Modal>
          {/* //heda te3 click on work orders in table  estimation processing*/}

          <Modal
            centered
            style={{
              marginLeft: "-4%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
            show={this.state.closeJobItemModal}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                backgroundColor: "white",
                width: "130%",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  width: "130%",

                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Job Proccessing
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              md={3}
              style={{
                width: "130%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Form>
                <Row>
                  <Col style={{ marginleft: "-55%" }}>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%" }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text>Tech Name</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Tech Name"
                        style={{
                          background: "whitesmoke",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobDoneTechName: text.target.value,
                          });
                        }}
                        title={this.state.selectedDDdata}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%" }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text>Tech Contact</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Tech Contact"
                        style={{
                          background: "whitesmoke",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobDoneTechCon: text.target.value,
                          });
                        }}
                        title={this.state.selectedDDdata}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Profession
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobdoneTechproffesion: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>

                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          NTE
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({ jobDoneCost: text.target.value });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Date
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="date"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          background: "whitesmoke",
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobdonescheduledate: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "93%", marginTop: 20 }}
                    >
                      <InputGroup.Prepend style={{ width: "44%" }}>
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Scheduled Time
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="time"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        style={{
                          display: "flex",
                          borderColor: "grey",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobdonescheduledtime: text.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md={5}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Note About Job</Form.Label>
                      <Form.Control
                        style={{
                          width: "110%",
                          display: "flex",
                          backgroundColor: "whitesmoke",
                          flexDirection: "row",
                        }}
                        onChange={(text) => {
                          this.setState({
                            jobDoneTechDescription: text.target.value,
                          });
                        }}
                        as="textarea"
                        rows="3"
                      />
                    </Form.Group>{" "}
                    <div>
                      <InputGroup
                        size="sm"
                        className="mb-3"
                        style={{ width: "110%", marginTop: 20 }}
                      >
                        <InputGroup.Prepend style={{ width: "44%" }}>
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Submited Date
                          </InputGroup.Text>{" "}
                        </InputGroup.Prepend>
                        <FormFileLabel
                          aria-label="Small"
                          style={{
                            background: "whitesmoke",
                            display: "flex",
                            borderColor: "grey",
                          }}
                        />

                        <d
                          style={{
                            marginLeft: "10%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Assuming selectedJob is set somewhere in your component's state */}
                          {this.state.selectedJob && (
                            <div>
                              {this.state.selectedJob?.data?.jobData?.submdate}
                            </div>
                          )}
                        </d>
                      </InputGroup>
                      <InputGroup
                        size="sm"
                        className="mb-3"
                        style={{ width: "110%", marginTop: 20 }}
                      >
                        <InputGroup.Prepend style={{ width: "43%" }}>
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Needed Date
                          </InputGroup.Text>{" "}
                        </InputGroup.Prepend>
                        <FormFileLabel
                          aria-label="Small"
                          style={{
                            background: "whitesmoke",
                            display: "flex",
                            borderColor: "grey",
                          }}
                        />

                        <d
                          style={{
                            marginLeft: "10%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {/* Assuming selectedJob is set somewhere in your component's state */}
                          {this.state.selectedJob && (
                            <div>
                              {
                                this.state.selectedJob?.data?.jobData
                                  ?.neededdate
                              }
                            </div>
                          )}
                        </d>
                      </InputGroup>

                      <InputGroup
                        size="sm"
                        className="mb-3"
                        style={{ width: "110%", marginTop: 20 }}
                      >
                        <InputGroup.Prepend style={{ width: "43%" }}>
                          <InputGroup.Text id="inputGroup-sizing-sm">
                            Your Name
                          </InputGroup.Text>{" "}
                        </InputGroup.Prepend>
                        <FormFileLabel
                          aria-label="Small"
                          style={{
                            background: "whitesmoke",
                            display: "flex",
                            borderColor: "grey",
                          }}
                        />
                        <d
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          {context.currentUser != null
                            ? context.currentUser.name +
                              " " +
                              context.currentUser.lastName
                            : this.state.userName}
                        </d>
                      </InputGroup>
                    </div>
                    <div>
                      <div></div>{" "}
                      <div
                        style={{
                          width: "",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "-9%",
                        }}
                      >
                        <Button
                          variant="primary"
                          style={{ width: "50%", marginTop: "8%" }}
                          onClick={() => {
                            this.setState({ onestimclicktoconfirm: true });
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          style={{ width: "50%", marginTop: "8%" }}
                          variant="secondary"
                          onClick={() => {
                            this.handleClose();
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer
              style={{
                width: "130%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
              }}
            > 
              <div> Hello there, we need someone for<h7 style={{color:"red"}}> {this.state.selectedJob?.data?.jobData?.trade}</h7>{"  "}
                    to:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.jobdescr}</h7>{"   "}
                    At:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.joblocation}</h7>{"   "}          
                    Asap please, Maximum by:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.neededdate}</h7>{"   "}
                    . You guys do free estimation, right? 
                     <h7 style={{color:"green"}} >YES?</h7> AWESOME!   
                     {" "} <h7 style={{color:"green"}} > No?</h7>  how much you guys charge? the best i can do is:{"   "} <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.nte}-25$</h7> {"   "}
                     no? ok ok give me a minute i will ask my manager, i might be able to get you: <h7 style={{color:"red"}}>{this.state.selectedJob?.data?.jobData?.nte}</h7>
                             
              </div>
            
            </Modal.Footer>
          </Modal>
          {/* //heda te3 click on work orders in table  jobdone processing*/}

          <Modal
            centered
            style={{
              marginTop: "15%",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
            show={this.state.onestimclicktoconfirm}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  justifyContent: "center",
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Confirm to Submit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
              }}
            >
              <div className="input-group mb-4">
                <input
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "center",
                  }}
                  type="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
            </Modal.Body>
            <div
              style={{
                // width: "100%",
                justifyContent: "center",
                backgroundBlendMode: "darken",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              Please Enter Your Password to Confirm
            </div>
            <Modal.Footer
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <button
                onClick={() => {
                  this.onPressed();
                  this.onSubmitJobDone(this.state.selectedJob);
                  this.handleClose();
                }}
              >
                Submit
              </button>
            </Modal.Footer>
          </Modal>
          {/* heda te3 confirm password to submit  schedualed job done */}

          <Modal
            centered
            style={{
              marginTop: "15%",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
            show={this.state.on1stsubmitclick}
            onHide={this.handleClose}
          >
            <Modal.Header
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
              closeButton
            >
              <Modal.Title
                style={{
                  justifyContent: "center",
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                Confirm to Submit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
              }}
            >
              <div className="input-group mb-4">
                <input
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    justifyContent: "center",
                  }}
                  type="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </div>
            </Modal.Body>
            <div
              style={{
                // width: "100%",
                justifyContent: "center",
                backgroundBlendMode: "darken",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              Please Enter Your Password to Confirm Schedule estimation
            </div>
            <Modal.Footer
              style={{
                justifyContent: "center",
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <button
                onClick={() => {
                  // this.updateChanges.jobStatus = "estimationScheduled";
                  this.onPressed();
                  this.onSubmitEstimation(
                    this.state.selectedJob.data.status === "estimationScheduled"
                  );
                  this.handleClose();
                }}
              >
                Submit
              </button>
            </Modal.Footer>
          </Modal>
          {/* heda te3 confirm password to submit  schedualed estimation*/}

          <Modal
            style={{
              display: "flex",
              flexDirection: "row",

              marginLeft: "-4%",
            }}
            show={this.state.modalDisplayWOdetails}
            onHide={this.handleClose}
            centered
          >
            {" "}
            <Modal.Body
              centered
              style={{ backgroundColor: "white", width: "200%" }}
            >
              <div
                centered
                style={{
                  backgroundColor: "lightblue",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                STATUS:{this.state.selectedJob?.data?.status}
              </div>
              <Card className="NewWorkOrders">
                <thead>
                  <tr>
                    <th> {" ==== "}</th>
                    <th
                      style={{
                        display: "flex",
                        color:
                          this.state.selectedJob?.data?.status ===
                          "estimationScheduled"
                            ? "red"
                            : "grey",
                      }}
                    >
                      {"  ESTIMATION"}
                    </th>
                    <th>{"=============>"}</th>
                    <th
                      style={{
                        // marginLeft: 12,
                        display: "flex",
                        color:
                          this.state.selectedJob?.data?.status ===
                          "quotationPending"
                            ? "red"
                            : "grey",
                      }}
                    >
                      {"QUOTATION"}
                    </th>
                    <th>{"===============>"}</th>
                    <th
                      style={{
                        // marginLeft: 12,
                        display: "flex",
                        color:
                          (this.state.selectedJob?.data?.status ===
                            "jobDoneScheduled") |
                          "jobDoneNeeded"
                            ? "red"
                            : "grey",
                      }}
                    >
                      {"JOBDONE"}
                    </th>
                    <th>{"===============>"}</th>
                    <th>{"INVOICING"}</th>
                    <th>{"===============>"}</th>
                    <th>{"COMPLETED"}</th>
                  </tr>
                </thead>
                <Card.Body className="px-0 py-2">
                  <InputGroup size="sm" className="mb-3">
                    <FormFileLabel aria-label="Small" />

                    <d
                      style={{
                        width: "20%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.selectedJob && (
                        <div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.estimscheduleddate
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.estimscheduledtimee
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.estimTechName
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.estimTechCon
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.estimCost
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.estimTechDescription
                            }
                          </div>
                        </div>
                      )}
                    </d>

                    <td>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                    </td>

                    <d
                      style={{
                        width: "20%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.selectedJob && (
                        <div>
                          <div>
                            {/* {quotaaaaaaaaaaaaaationnnnnnnnnnnnnnn} */}
                            {this.state.selectedJob?.data?.status}
                          </div>
                        </div>
                      )}
                    </d>

                    <td>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                    </td>
                    <d
                      style={{
                        width: "19%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.selectedJob && (
                        <div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobdonescheduledate
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobdonescheduledtime
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobDoneTechName
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobDoneTechCon
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobdoneTechproffesionzz
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobDoneHours
                            }
                          </div>
                          <div>
                            {
                              this.state.selectedJob?.data?.dispatcherData
                                ?.jobDoneTechDescription
                            }
                          </div>
                        </div>
                      )}
                    </d>
                    <td>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                    </td>
                    <d
                      style={{
                        width: "20%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.selectedJob && (
                        <div>
                          <div>{this.state.selectedJob?.data?.status}</div>
                        </div>
                      )}
                    </d>
                    <td>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                      <div>{"||"}</div>
                    </td>
                    <td>{/* Display relevant job details here */}</td>
                  </InputGroup>
                </Card.Body>
                <div>
                  {this.state.selectedJob?.data?.status ===
                    "estimationScheduled" && tabEstimationbContent}

                  {this.state.selectedJob?.data?.status ===
                    "jobDoneScheduled" && tabbJobdoneContent}
                </div>
              </Card>
            </Modal.Body>
            <Modal.Footer
              style={{
                height: "80%",
                backgroundColor: "whitesmoke",
                width: "200%",
                display: "flex",
                flexDirection: "row",
              }}
            ></Modal.Footer>
          </Modal>

          {/* heda te3 display job schedualled details */}
        </div>
        ;
        {this.state.showTable && (
          <div>
            <Row
              style={{
                flexDirection: "row",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    this.setState({ estimationListModal: true });
                  }}
                  className="btn btn-primary"
                >
                  {"Estim. to schedule"}
                  {buttonBadgesEst}
                </Button>
                <p>
                  Pending:{buttonBadgesEst}Urgent:{buttonBadgesEst}
                </p>
              </div>{" "}
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  display: "flex",
                  width: "8%",
                  // backgroundColor: "red",
                }}
              >
                {" "}
              </div>
              <div>
                <Button
                  render
                  onClick={() => {
                    this.setState({ JobDoneListModal: true });
                  }}
                  className="btn btn-primary"
                >
                  {"JOBS to schedule"} {buttonBadgesJobDone}
                </Button>{" "}
                <p>
                  {" "}
                  Pending:{buttonBadgesJobDone}Urgent:
                  {buttonBadgesJobDone}
                </p>
              </div>
              <div
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  display: "flex",
                  width: "8%",
                  // backgroundColor: "red",
                }}
              >
                {" "}
              </div>
            </Row>  

            <Table
              responsive
              hover
              style={{ backgroundColor: "white" }}
              className="table mt-3"
              id="tablepadding"
              Label="Schedualed W.O."
            >
              <thead>
                <div
                  style={{
                    width: "500%",
                    display: "flex",
                    flexDirection: "ROW",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <h5 centered>Scheduled W.O.</h5>{" "}
                    <h6>
                      <i className="fa fa-circle text-c-yellow f-10 m-r-15">
                        <h5 className="text-c-yellow f-10 m-r-15">estim.</h5>
                      </i>

                      <i className="fa fa-circle text-c-blue f-10 m-r-15">
                        <h5 className="text-c-blue f-10 m-r-15">Job Done</h5>
                      </i>
                    </h6>
                  </div>{" "}
                </div>
                <tr>
                  <th>WO numb</th>
                  <th>Job location</th>
                  <th>contact</th>
                  <th>Trade</th>
                  <th>NTE</th>
                  <th>Client Name</th>
                  <th>Submitted date</th>
                  <th>Needed Date</th>
                  <th>Urgency</th>
                  <th>Job Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.jobList.map((item, index) => {
                  if (
                    item.data.status === "estimationScheduled" ||
                    item.data.status === "jobDoneScheduled"
                  ) {
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          this.setState({
                            modalDisplayWOdetails: true,
                            selectedJob: item,
                          });
                        }}
                        style={{
                          backgroundColor:
                            item.data.status === "estimationScheduled"
                              ? "lightyellow"
                              : "lightblue",
                        }}
                      >
                        <td>{item.data.woNum}</td>
                        <td>{item.data.jobData.joblocation}</td>
                        <td>{item.data.jobData.contact}</td>
                        <td>{item.data.jobData.trade}</td>
                        <td>{item.data.jobData.nte}</td>
                        <td>{item.data.jobData.clientName}</td>
                        <td>{item.data.jobData.submdate}</td>
                        <td>{item.data.jobData.neededdate}</td>
                        <td>{item.data.jobData.urgency}</td>
                        <td>{item.data.jobData.jobdescr}</td>
                      </tr>
                    );
                  } else {
                    // Return null if the condition isn't met to skip rendering the row
                    return null;
                  }
                })}
              </tbody>
            </Table>
            <Card
              style={{
                flexDirection: "column",
                justifyContent: "center",
                display: "flex",
             
              }}
              className="NewWorkOrders"
            >
              <Card.Header>
                <Card.Title
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                  }}
                  className="text-center"
                  as="h5"
                >
                  <InputGroup size="sm" className="mb-3" style={{ width: 300 }}>
                    <InputGroup.Prepend
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                      }}
                    >
                      <Button
                        onClick={async () => {
                          console.log(
                            ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
                            this.state.woNbSearch
                          );
                          this.setState({ onFindWOClick: true });
                          if (this.state.woNbSearch != "") {
                            findWoByNumber(
                              this.state.woNbSearch,
                              this.context.currentUser.uid
                            )
                              .then((resp) => {
                                this.setState({ jobList: resp });
                              })
                              .catch((e) =>
                                console.log("uuuuuuuuerrorrrrr", e)
                              );
                          } else {
                            const jobList = await findWoForCurrentUser(
                              context.currentUser.uid
                            );
                            console.log(
                              "JOOOOOBBBBBBBBBBBB LLLISSTTTTTT",
                              jobList
                            );
                            this.setState({ jobList });
                          }
                        }}
                        className="btn btn-primary"
                      >
                        {" "}
                        {"    Find WO "}
                      </Button>{" "}
                    </InputGroup.Prepend>
                    <FormControl
                      onChange={(nb) => {
                        this.setState({ woNbSearch: nb.target.value });
                      }}
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />{" "}
                  </InputGroup>
                  Opened Work Orders
                </Card.Title>
              </Card.Header>

              <Card.Body className="px-0 py-2">
              <Table
              responsive
              hover
              style={{ backgroundColor: "white" }}
              className="table mt-3"
              id="tablepadding"
              Label="Schedualed W.O."
            >
                  <thead>
                    <tr>
                    <th>WO numb</th>
                  <th>Job location</th>
                  <th>contact</th>
                  <th>Trade</th>
                  <th>NTE</th>
                  <th>Client Name</th>
                  <th>Submitted date</th>
                  <th>Needed Date</th>
                  <th>Urgency</th>
                  <th>Job Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.jobList.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => {
                            console.log("PRESSSEEDDDDDDD");
                            this.setState({
                              closeJobItemModal: true,
                              selectedJob: item,
                            });
                          }}
                      
                        >
                          <td>{item.data.woNum}</td>
                        <td>{item.data.jobData.joblocation}</td>
                        <td>{item.data.jobData.contact}</td>
                        <td>{item.data.jobData.trade}</td>
                        <td>{item.data.jobData.nte}</td>
                        <td>{item.data.jobData.clientName}</td>
                        <td>{item.data.jobData.submdate}</td>
                        <td>{item.data.jobData.neededdate}</td>
                        <td>{item.data.jobData.urgency}</td>
                        <td>{item.data.jobData.jobdescr}</td>
                          <td
                            style={{
                              paddingTop: "3px",
                              display: "flex",
                            }}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Dispatcher;
