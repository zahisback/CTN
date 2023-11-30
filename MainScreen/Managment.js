import React, { Component } from "react";
import { MainContext } from "../core/MainContext";
import { CONFIG } from "../helpers/configFb";
import DEMO from "../store/constant";
import {
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
  Form,
  DropdownButton,
  Dropdown,
  Modal,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  findWoForAdmin,
  findWoByNumber,
  findWoForCurrentUser,
  updateDispatcherData,
} from "../helpers/fireStoreMain";
import FormFileLabel from "react-bootstrap/esm/FormFileLabel";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { map } from "jquery";
import {
  getJobs,
  handleDeleteJob,
  setJob,
  updateAssignedTo,
  updateDispatcher,
  updateManager,
} from "../helpers/fireStoreMain";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

class Management extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);

    // Get today's date
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);

    this.state = {
      datta: [
        {
          woNum: "",

          joblocation: "",
          jobZip: "",
          jobState: "",
          estimNeeded: "",
          contact: "",
          trade: "",
          nte: "",
          ivrcode: "",
          ivrNumb: "",
          poNumb: "",
          clientName: "",
          submdate: formattedDate,
          neededdate: "",
          urgency: "",
          callerName: "",
          callerNumber: "",
          jobdescr: "",
        },
      ],
      itemToEdit: [
        {
          status: "ghgh",
          woNum: "John Doe",
          joblocation: "28",
          jobZip: "20016",
          jobState: "DC",
          estimNeeded: "false",
          contact: "New York",
          trade: "1",
          nte: "2",
          ivrcode: "3",
          ivrNumb: "12",
          poNumb: "4",
          clientName: "5",
          submdate: "6",
          neededdate: "7",
          urgency: "8",
          callerName: "9",
          callerNumber: "11",
          jobdescr: "10",
        },
      ],

      selectedUser: { selectedtype: "Select Dispatcher" },

      woNum: "",
      joblocation: "",
      jobZip: "",
      jobState: "",

      estimNeeded: true,
      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      ivrNumb: "",
      poNumb: "",
      clientName: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      callerNumber: "",
      jobdescr: "",
      jobList: [],
      showModal: false,
      openAddWO: false,
      showDetailModal: false,
      selectedMan: "",
      selectedDisp: "",
      selectedTeamLeader: "",
      selectedStatus: "",
      currentUser: "manager",
      selectedUName: "Select Assignee",
      selectedUserClient: "Select Assignee",
      selectedIndex: "0",
      isDragging: false,
      submdate: formattedDate,
      initialPosition: { x: 0, y: 0 },
      modalPosition: { x: 0, y: 0 },
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount = async () => {
    const context = this.context;
    const jobList = await getJobs();
    this.setState({ jobList });
  };

  async handleFormSubmit(event) {
    event.preventDefault(); // prevent the page from reloading
    // create a new object with the data from the input fields
    const newItem = {
      woNum: this.state.woNum,
      manager: this.context.currentUser,
      teamLeader: this.state.selectedTeamLeader,
      dispatcher: this.state.selectedUser.uid,
      status: this.state.selectedStatus,
      assignedTo: this.state.selectedUser,
      assignedby: this.state.currentUser,
      //jobData
      jobData: {
        joblocation: this.state.joblocation,

        jobZip: this.state.jobZip,
        jobState: this.state.jobState,
        estimNeeded: this.state.estimNeeded,

        contact: this.state.contact,
        trade: this.state.trade,
        nte: this.state.nte,
        ivrcode: this.state.ivrcode,
        ivrNumb: this.state.ivrNumb,
        poNumb: this.state.poNumb,
        clientName: this.state.clientName,
        submdate: this.state.submdate,
        neededdate: this.state.neededdate,
        urgency: this.state.urgency,
        callerName: this.state.callerName,
        callerNumber: this.state.callerNumber,
        jobdescr: this.state.jobdescr,
      },
      //teamLeaderData
      teamLeaderData: {
        dispatcher: "",
      },
      //dispatcherData
      dispatcherData: {
        estimTechName: "",
        estimTechCon: "",
        estimTechproffesion: "",
        estimDate: "",
        estimTime: "",
        estimCost: "",
        estimPaidby: "",
        estimPaymentAdress: "",
        estimTechDescription: "",
        estimscheduleddate: "",
        estimscheduledtimee: "",

        jobDoneTechName: "",
        jobDoneTechCon: "",
        jobdoneTechproffesion: "",
        jobDoneDate: "",
        jobDoneTime: "",
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

        techId: "",
      },
    };
    setJob(newItem).then(async (id) => {
      const docId = doc(db, "Jobs", id);
      await updateDoc(docId, {
        jobId: id,
      });
      const jobList = await getJobs();
      console.log("const jobList = await getJobs();", jobList);
      this.setState({ jobList });
    });
    // add the new item to the datta array
    this.setState({
      datta: [...this.state.datta, newItem],
      woNum: "",
      joblocation: "",

      jobZip: "",
      jobState: "",
      estimNeeded: "false",
      // " estimationNeeded | estimationScheduled | quotationPending  | jobDoneNeeded |  jobDoneScheduled | invoiced",

      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      ivrNumb: "",
      poNumb: "",
      clientName: "",
      submdate: "",
      urgency: "",
      callerName: "",
      callerNumber: "",
      jobdescr: "",
    });
  }
  handleDeleteJob = () => {};

  handleClose = () => {
    this.setState({ showModal: false });
    this.setState({ openAddWO: false });
    this.setState({ showDetailModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };
  openAddWO = () => {
    this.setState({ openAddWO: true });
  };
  showDetailModal = () => {
    this.setState({ showDetailModal: true });
  };

  render() {
    // console.log("889899889798789798798797987", this.state.poNumb);

    const context = this.context;
    console.log(" this.state.currentUser.uid", this.state.selectedUser.uid);
    const {
      datta,
      woNum,
      joblocation,
      jobZip,
      jobState,
      estimNeeded,
      contact,
      trade,
      nte,
      ivrcode,
      ivrNumb,
      poNumb,
      clientName,
      submdate,
      neededdate,
      urgency,
      callerName,
      callerNumber,
      jobdescr,
      showModal,
      openAddWO,
      showDetailModal,
    } = this.state;
    return (
      <div>
        <Col>
          <Col>
            <Modal
              centered
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
              show={this.state.showDetailModal}
              onHide={this.handleClose}
            >
              <Modal.Header
                closeButton
                style={{
                  display: "flex",
                  flexDirection: "row`",
                  justifyContent: "center",
                  backgroundColor: "white",
                  width: "180%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    // width: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <tr
                    style={{
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "center",
                      // width: "180%",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <th>Estimation</th>
                    <th> {"===============>"}</th>
                    <th>Quotation</th>
                    <th> {"===============>"}</th>
                    <th>JobDone</th>
                    <th> {"===============>"}</th>
                    <th> Invoicing</th>
                    <th> {"===============>"}</th>
                    <th>COMPLETED</th>
                  </tr>
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
                </div>
              </Modal.Header>
            </Modal>
            {/* {heda te3 display jobdata} */}
            <Modal
              style={{
                marginLeft: "-3%",
              }}
              show={this.state.openAddWO}
              onHide={this.handleClose}
              centered
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  width: "180%",
                  backgroundColor: "white",
                }}
              >
                <Modal.Header
                  style={{
                    // marginLeft: "30%",
                    display: "flex",
                    flexDirection: "column`",
                    justifyContent: "center",
                  }}
                  closeButton
                >
                  <Modal.Title as="h5">Add New Work Order</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 py-2">
                  <Form onSubmit={this.handleFormSubmit}>
                    <Row>
                      <Col md={6}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div className="mb-6" md={6}>
                            <div className="input-group mb-3">
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text align-items-center"
                                id="wo-number-label"
                              >
                                Wo #
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="text"
                                className="form-control"
                                placeholder="Enter wo Number..."
                                aria-label="WoNumber"
                                aria-describedby="woNumber-label"
                                value={woNum}
                                onChange={(event) =>
                                  this.setState({ woNum: event.target.value })
                                }
                              />
                            </div>
                            <div className="input-group mb-3">
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="job-location-label"
                              >
                                Job Location
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="text"
                                className="form-control"
                                placeholder="Enter job location..."
                                aria-label="JobLocation"
                                aria-describedby="joblocation-label"
                                value={joblocation}
                                onChange={(event) =>
                                  this.setState({
                                    joblocation: event.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="input-group mb-3">
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="job-location-label"
                              >
                                Job state
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="text"
                                className="form-control"
                                placeholder="Enter job State..."
                                aria-label="jpbState"
                                aria-describedby="jobstate-label"
                                value={jobState}
                                onChange={(event) =>
                                  this.setState({
                                    jobState: event.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="input-group mb-3">
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="job-location-label"
                              >
                                Job Zip
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="text"
                                className="form-control"
                                placeholder="Enter job Zip..."
                                aria-label="jobZip"
                                aria-describedby="jobzip-label"
                                value={jobZip}
                                onChange={(event) =>
                                  this.setState({
                                    jobZip: event.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="input-group mb-3">
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="contact-label"
                              >
                                Contact
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="text"
                                className="form-control"
                                placeholder="Enter phone number..."
                                aria-label="Contact"
                                aria-describedby="contact-label"
                                value={contact}
                                onChange={(event) =>
                                  this.setState({ contact: event.target.value })
                                }
                              />
                            </div>
                            <div
                              style={{ width: "100%" }}
                              className="input-group mb-3"
                            >
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="trade-label"
                              >
                                Trade
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="text"
                                className="form-control"
                                placeholder="Enter Trade type..."
                                aria-label="Trade"
                                aria-describedby="trade-label"
                                value={trade}
                                onChange={(event) =>
                                  this.setState({ trade: event.target.value })
                                }
                              />
                            </div>
                            <div className="input-group mb-3">
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="neededdate-label"
                              >
                                Needed date
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="date"
                                className="form-control"
                                placeholder="Enter Needed Date..."
                                aria-label="NeededDate"
                                aria-describedby="neededdate-label"
                                value={neededdate}
                                onChange={(event) =>
                                  this.setState({
                                    neededdate: event.target.value,
                                  })
                                }
                              />
                            </div>
                            <div
                              style={{ width: "100%" }}
                              className="input-group mb-3"
                            >
                              <span
                                style={{ width: "40%" }}
                                className="input-group-text"
                                id="submdate-label"
                              >
                                Submitted Date
                              </span>
                              <input
                                style={{ backgroundColor: "whitesmoke" }}
                                type="date"
                                className="form-control"
                                placeholder="Enter Submitted Date..."
                                aria-label="Submitteddate"
                                aria-describedby="submdate-label"
                                value={submdate}
                                onChange={(event) =>
                                  this.setState({
                                    submdate: event.target.value,
                                  })
                                }
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <Form.Group
                                style={{ marginTop: "3%", width: "50%" }}
                              >
                                <Form.Check
                                  style={{ transform: "scale(1.3)" }} // corrected scale attribute
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    let updatedJobStatus = isChecked
                                      ? "estimationNeeded"
                                      : "jobDoneNeeded";

                                    // Check if isChecked is false and set jobStatus to 'jobDoneNeeded'
                                    if (!isChecked) {
                                      updatedJobStatus = "jobDoneNeeded";
                                    }

                                    this.setState({
                                      estimNeeded: isChecked,
                                      selectedStatus: updatedJobStatus,
                                    });
                                  }}
                                  custom
                                  type="checkbox"
                                  id="checkbox1"
                                  label="Estimation Needed"
                                />
                              </Form.Group>

                              <p style={{ marginLeft: "-25%", color: "red" }}>
                                {this.state.errorMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div>
                            <div className="mb-6" md={6}>
                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="nte-label"
                                >
                                  NTE
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter nte..."
                                  aria-label="NTE"
                                  aria-describedby="nte-label"
                                  value={nte}
                                  onChange={(event) =>
                                    this.setState({ nte: event.target.value })
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="ivrcode-label"
                                >
                                  Ivr Code
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter ivr code..."
                                  aria-label="IvrCode"
                                  aria-describedby="ivrcode-label"
                                  value={ivrcode}
                                  onChange={(event) =>
                                    this.setState({
                                      ivrcode: event.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="ivrNumb-label"
                                >
                                  Ivr Number
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter ivr Number..."
                                  aria-label="IvrNumber"
                                  aria-describedby="ivrnumber-label"
                                  value={ivrNumb}
                                  onChange={(event) =>
                                    this.setState({
                                      ivrNumb: event.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="poNumb-label"
                                >
                                  Po Number
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Po Number..."
                                  aria-label="PoNumber"
                                  aria-describedby="ponumber-label"
                                  value={poNumb}
                                  onChange={(event) => {
                                    console.log(
                                      "yyyyyyyyyyyyyyyyyyyyyyyyyyy",
                                      event.target.value
                                    );
                                    this.setState({
                                      poNumb: event.target.value,
                                    });
                                  }}
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="clientname-label"
                                >
                                  Client Name
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter client name..."
                                  aria-label="ClientName"
                                  aria-describedby="clientname-label"
                                  value={clientName}
                                  onChange={(event) =>
                                    this.setState({
                                      clientName: event.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="urgency-label"
                                >
                                  Urgency
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Urgency..."
                                  aria-label="Urgency"
                                  aria-describedby="urgency-label"
                                  value={urgency}
                                  onChange={(event) =>
                                    this.setState({
                                      urgency: event.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="callername-label"
                                >
                                  Caller Name
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Caller Name..."
                                  aria-label="CallerName"
                                  aria-describedby="callername-label"
                                  value={callerName}
                                  onChange={(event) =>
                                    this.setState({
                                      callerName: event.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="callernumber-label"
                                >
                                  Caller Number
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Caller Number..."
                                  aria-label="CallerNumber"
                                  aria-describedby="callernumber-label"
                                  value={callerNumber}
                                  onChange={(event) =>
                                    this.setState({
                                      callerNumber: event.target.value,
                                    })
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "100%" }}
                                className="input-group mb-3"
                              >
                                <span
                                  style={{ width: "40%" }}
                                  className="input-group-text"
                                  id="jobdescr-label"
                                >
                                  Job Description
                                </span>
                                <input
                                  style={{ backgroundColor: "whitesmoke" }}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Detailled job description..."
                                  aria-label="JobDescription"
                                  aria-describedby="jobdescr-label"
                                  value={jobdescr}
                                  onChange={(event) =>
                                    this.setState({
                                      jobdescr: event.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                      </Col>
                      <div
                        style={{
                          width: "100%",
                          marginLeft: "10%",
                        }}
                        className="input-group mb-3"
                      >
                        <DropdownButton
                          key={1}
                          style={{}}
                          onSelect={(e) => {
                            console.log(
                              "baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3333333333333",
                              e
                            );
                            let selected = "";
                            if (e.includes("dispatcher")) {
                              selected = context.dispatchersList[e[0]];
                            } else {
                              selected = context.teamLeadersList[e[0]];
                            }

                            this.setState(
                              {
                                selectedUser: selected,
                                selectedUName:
                                  selected.name + selected.lastName,
                              },
                              () => {
                                console.log(
                                  `''''''''''''''''';;;;;;;;`,
                                  selected
                                );
                              }
                            );
                          }}
                          title={this.state.selectedUName}
                        >
                          {context.teamLeadersList && (
                            <React.Fragment>
                              <Dropdown.Header>Team leaders</Dropdown.Header>
                              <Dropdown.Divider />
                              {context.teamLeadersList.map((item, index) => (
                                <Dropdown.Item
                                  key={`teamLeader-${item.id}`}
                                  eventKey={`${index}-teamLeader`}
                                >
                                  {item.name} {item.lastName}
                                </Dropdown.Item>
                              ))}
                            </React.Fragment>
                          )}

                          {context.dispatchersList && (
                            <React.Fragment>
                              <Dropdown.Header>Dispatchers</Dropdown.Header>
                              <Dropdown.Divider />
                              {context.dispatchersList.map((item, index) => (
                                <Dropdown.Item
                                  key={`dispatcher-${item.id}`}
                                  eventKey={`${index}-dispatcher`}
                                >
                                  {item.name} {item.lastName}
                                </Dropdown.Item>
                              ))}
                            </React.Fragment>
                          )}
                        </DropdownButton>

                        <button
                          style={{ marginLeft: "20%" }}
                          type="submit"
                          className="btn btn-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </Row>
                  </Form>
                </Modal.Body>{" "}
              </div>
            </Modal>
          </Col>

          <Card className="NewWorkOrders">
            <Card.Header>
              <Card.Title className="text-center" as="h5">
                New Work Orders
              </Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  {this.state.jobList.map((item, index) => {
                    console.log(
                      "IIIITEEEEEEEMMMMMMMMMMM0",
                      item.data.assignedby
                    );
                    if (
                      (item.data.assignedby === "client") |
                      (item.data.assignedby === "Salesteam")
                    ) {
                      return (
                        <tr
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                          }}
                          key={index}
                        >
                          <DropdownButton
                            onSelect={(e) => {
                              let selected = "";
                              if (e.includes("dispatcher")) {
                                selected = context.dispatchersList[e[0]];
                              } else {
                                selected = context.teamLeadersList[e[0]];
                              }
                              this.setState({
                                selectedUser: selected,
                                selectedIndex: index,
                                selectedUserClient:
                                  selected.name + selected.lastName,
                              });
                            }}
                            title={
                              index === this.state.selectedIndex
                                ? this.state.selectedUserClient
                                : "Select Assignee"
                            }
                          >
                            <Dropdown.Header>Team leaders</Dropdown.Header>
                            <Dropdown.Divider />
                            {context.teamLeadersList.map((item, index) => (
                              <Dropdown.Item
                                key={`${item.id}_teamLeader`}
                                eventKey={`${index}_teamLeader`}
                              >
                                {item.name} {item.lastName}
                              </Dropdown.Item>
                            ))}
                            <Dropdown.Divider />
                            <Dropdown.Header>Dispatchers</Dropdown.Header>
                            <Dropdown.Divider />
                            {context.dispatchersList.map((item, index) => (
                              <Dropdown.Item
                                key={`${item.id}_dispatcher`}
                                eventKey={`${index}_dispatcher`}
                              >
                                {item.name} {item.lastName}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                          <td>
                            <a
                              onClick={(e) => {
                                console.log("REJJJJEEEEECCTTTTTTTTTTT", e);
                                handleDeleteJob(item.data.jobId).then(
                                  async () => {
                                    const jobList = await getJobs();
                                    console.log(
                                      "const jobList = await getJobs();",
                                      jobList
                                    );
                                    this.setState({ jobList });
                                  }
                                );
                              }}
                              href={DEMO.BLANK_LINK}
                              className="label theme-bg2 text-white f-12"
                            >
                              Reject
                            </a>
                            <a
                              href={DEMO.BLANK_LINK}
                              onClick={(e) => {
                                console.log(
                                  "AAAAPPPPRRRRREEEEEOOOOVVEEEE",
                                  item
                                );
                                const data = {
                                  assignedTo: this.state.selectedUser,
                                };
                                updateAssignedTo(item.data.jobId, data).then(
                                  async () => {
                                    updateManager(
                                      item.data.jobId,
                                      context.currentUser.uid
                                    );
                                    updateDispatcher(
                                      item.data.jobId,
                                      data
                                    ).then(async () => {
                                      const jobList = await getJobs();
                                      console.log(
                                        "const jobList = await getJobs();",
                                        jobList
                                      );
                                      this.setState({ jobList });
                                    });
                                  }
                                );
                              }}
                              className="label theme-bg text-white f-12"
                            >
                              Approve
                            </a>
                          </td>
                          <td>{item.data.woNum}</td>
                          <td>{item.data.jobData.joblocation}</td>
                          <td>{item.data.jobData.trade}</td>
                          <td>{item.data.jobData.nte}</td>
                          <td>{item.data.jobData.clientName}</td>
                          <td>{item.data.jobData.neededdate}</td>
                          <td>{item.data.jobData.urgency}</td>
                          <td>{item.data.jobData.jobdescr}</td>
                          <td
                            style={{ paddingTop: "3px", display: "flex" }}
                          ></td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Table
          responsive
          hover
          style={{ backgroundColor: "white" }}
          className="table mt-3"
          id="tablepadding"
        >
          <thead>
            {" "}
            <Button
              onClick={() => {
                this.setState({ openAddWO: true });
              }}
              className="btn btn-primary"
              type="Modal"
            >
              Add New W.O.
            </Button>{" "}
            <InputGroup
              centered
              size="sm"
              className="mb-3"
              style={{
                // marginTop: "5%",
                // display: "flex",
                // flexDirection: "row",
                // marginLeft: "150%",
                width: 250,
              }}
            >
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
                    if (this.state.woNbSearch !== "") {
                      findWoForAdmin(this.state.woNbSearch)
                        .then((resp) => {
                          this.setState({ jobList: resp });
                        })
                        .catch((e) => console.log("uuuuuuuuerrorrrrr", e));
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
                  // console.log("ddddd", nb.target.value);
                  this.setState({ woNbSearch: nb.target.value });
                }}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />{" "}
            </InputGroup>
            <tr>
              <th
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                WO numb
              </th>
              <th>Job location</th>
              <th>contact</th>
              <th>Trade</th>
              <th>NTE</th>
              <th>IVR Code</th>
              <th>Po Number</th>
              <th>Client Name</th>
              <th>Submitted date</th>
              <th>Needed Date</th>
              <th>Urgency</th>
              <th>Caller Name</th>
              <th>Job Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.jobList.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    this.setState({
                      selectedJob: item,
                    });
                  }}
                >
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      this.setState({
                        showDetailModal: true,
                        selectedJob: item,
                      });
                    }}
                  >
                    {item.data.woNum}
                  </td>
                  <td>{item.data.jobData.joblocation}</td>
                  <td>{item.data.jobData.contact}</td>
                  <td>{item.data.jobData.trade}</td>
                  <td>{item.data.jobData.nte}</td>
                  <td>{item.data.jobData.ivrcode}</td>
                  <td>{item.data.jobData.poNumb}</td>
                  <td>{item.data.jobData.clientName}</td>
                  <td>{item.data.jobData.submdate}</td>
                  <td>{item.data.jobData.neededdate}</td>
                  <td>{item.data.jobData.urgency}</td>
                  <td>{item.data.jobData.callerName}</td>
                  <td>{item.data.jobData.jobdescr}</td>
                  <td
                    style={{
                      paddingTop: "3px",
                      display: "flex",
                    }}
                  >
                    <DropdownButton
                      onSelect={async (e) => {
                        console.log("DropDownButtonOnChange", e);
                        this.setState({
                          selectedJob: item,
                        });

                        if (e === "1") {
                          await handleDeleteJob(item.data.jobId);
                          const jobList = await getJobs();
                          this.setState({ jobList });
                        } else if (e === "0") {
                          this.openModal();
                          this.setState({
                            itemToEdit: item.data,
                            editItemIndex: index,
                          });
                        }
                      }}
                      title={""}
                    >
                      <Dropdown.Item eventKey="0">Edit</Dropdown.Item>
                      <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit WO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="wo-number-label"
                >
                  Wo #
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter wo Number..."
                  aria-label="WoNumber"
                  aria-describedby="woNumber-label"
                  value={this.state.itemToEdit.woNum}
                  onChange={(event) =>
                    this.setState({ woNum: event.target.value })
                  }
                />
              </div>

              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="job-location-label"
                >
                  Job Location
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter job location..."
                  aria-label="JobLocation"
                  aria-describedby="joblocation-label"
                  value={joblocation}
                  onChange={(event) =>
                    this.setState({ joblocation: event.target.value })
                  }
                />
              </div>

              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="contact-label"
                >
                  Contact
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number..."
                  aria-label="Contact"
                  aria-describedby="contact-label"
                  value={contact}
                  onChange={(event) =>
                    this.setState({ contact: event.target.value })
                  }
                />
              </div>

              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="trade-label"
                >
                  Trade
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter Trade type..."
                  aria-label="Trade"
                  aria-describedby="trade-label"
                  value={trade}
                  onChange={(event) =>
                    this.setState({ trade: event.target.value })
                  }
                />
              </div>

              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="nte-label"
                >
                  NTE
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter nte..."
                  aria-label="NTE"
                  aria-describedby="nte-label"
                  value={nte}
                  onChange={(event) =>
                    this.setState({ nte: event.target.value })
                  }
                />
              </div>

              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="ivrcode-label"
                >
                  Ivr Code
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter ivr code..."
                  aria-label="IvrCode"
                  aria-describedby="ivrcode-label"
                  value={ivrcode}
                  onChange={(event) =>
                    this.setState({ ivrcode: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="ivrNumbcode-label"
                >
                  Ivr Number
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter ivr Number..."
                  aria-label="ivrNumber"
                  aria-describedby="ivrNumb-label"
                  value={ivrNumb}
                  onChange={(event) =>
                    this.setState({ ivrNumb: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="poNumb-label"
                >
                  Po Number
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter Po Number..."
                  aria-label="PoNumber"
                  aria-describedby="ponumber-label"
                  value={poNumb}
                  onChange={(event) =>
                    this.setState({ poNumb: event.target.value })
                  }
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="clientname-label"
                >
                  Client Name
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter client name..."
                  aria-label="ClientName"
                  aria-describedby="clientname-label"
                  value={clientName}
                  onChange={(event) =>
                    this.setState({ clientName: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="submdate-label"
                >
                  Submitted Date
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="date"
                  className="form-control"
                  placeholder="Enter Submitted Date..."
                  aria-label="Submitteddate"
                  aria-describedby="submdate-label"
                  value={submdate}
                  onChange={(event) =>
                    this.setState({ submdate: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="neededdate-label"
                >
                  Needed date
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="date"
                  className="form-control"
                  placeholder="Enter needed date..."
                  aria-label="NeededDate"
                  aria-describedby="neededdate-label"
                  value={neededdate}
                  onChange={(event) =>
                    this.setState({ neededdate: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="urgency-label"
                >
                  Urgency
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter Urgency..."
                  aria-label="Urgency"
                  aria-describedby="urgency-label"
                  value={urgency}
                  onChange={(event) =>
                    this.setState({ urgency: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="callername-label"
                >
                  Caller Name
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter Caller Name..."
                  aria-label="CallerName"
                  aria-describedby="callername-label"
                  value={callerName}
                  onChange={(event) =>
                    this.setState({ callerName: event.target.value })
                  }
                />
              </div>
              <div style={{ width: "100%" }} className="input-group mb-3">
                <span
                  style={{ width: "40%" }}
                  className="input-group-text"
                  id="jobdescr-label"
                >
                  Job Description
                </span>
                <input
                  style={{ backgroundColor: "whitesmoke" }}
                  type="text"
                  className="form-control"
                  placeholder="Enter Detailled job description..."
                  aria-label="JobDescription"
                  aria-describedby="jobdescr-label"
                  value={jobdescr}
                  onChange={(event) =>
                    this.setState({ jobdescr: event.target.value })
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.updateDoc}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Management;
