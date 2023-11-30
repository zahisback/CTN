import DEMO from "../store/constant";
import React, { Component } from "react";
import { MainContext } from "../core/MainContext";
import { CONFIG } from "../helpers/configFb";
import {
  Card,
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";

// import UcFirst from '../App/components/UcFirst';
import avatar1 from "../assets/images/user/avatar-1.jpg";
import avatar2 from "../assets/images/user/avatar-2.jpg";
import avatar3 from "../assets/images/user/avatar-3.jpg";
// import Aux from "../../hoc/_Aux";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { map } from "jquery";
import { getJobs, handleDeleteJob, setJob } from "../helpers/fireStoreMain";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

class ClientPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: true,
      writeAccess: true,
      datta: [
        {
          woNum: "",
          joblocation: "",
          contact: "",
          trade: "",
          nte: "",
          ivrcode: "",
          ivrNumb: "",
          poNumb: "",
          clientName: "",
          submdate: "",
          neededdate: "",
          urgency: "",
          callerName: "",
          callerNumber: "",
          jobdescr: "",
        },
      ],
      itemToEdit: [
        {
          woNum: "John Doe",
          joblocation: "28",
          contact: "New York",
          trade: "1",
          nte: "2",
          ivrcode: "3",
          ivrNumb: "11",
          poNumb: "4",
          clientName: "5",
          submdate: "6",
          neededdate: "7",
          urgency: "8",
          callerName: "9",
          callerNumber: "12",
          jobdescr: "10",
        },
      ],
      selectedUser: { selectedtype: "Select Dispatcher" },
      woNum: "",
      joblocation: "",
      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      ivrNumb: "",
      poNumb: "",
      clientName: "",
      submdate: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      callerNumber: "",
      jobdescr: "",
      jobList: [],
      showModal: false,
      selectedMan: "",
      selectedDisp: "",
      selectedTeamLeader: "",
      selectedStatus: "",
      currentUser: "client",
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
      manager: this.state.selectedMan,
      teamLeader: this.state.selectedTeamLeader,
      dispatcher: this.state.selectedDisp,
      status: "",
      assignedTo: this.state.selectedUser,
      assignedby: this.state.currentUser,
      //jobData
      jobData: {
        joblocation: this.state.joblocation,
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
      teamLeaderData: {},
      //dispatcherData
      dispatcherData: {
        jobType: "",
        TechName: "",
        TechCon: "",
        Date: "",
        Time: "",
        Hours: "",
        Cost: "",
        Paidby: "",
        PaymentAdress: "",
        dispId: "",
        suppliyer: "",
        otherSuppliyer: "",
        material: "",
        proffision: "",
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
      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      ivrNumb: "",
      poNumb: "",
      clientName: "",
      submdate: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      callerNumber: "",
      jobdescr: "",
    });
  }

  updateDimensions = () => {
    console.log("7777777777777", window.innerWidth);
    this.setState({ innerWidth: window.innerWidth });
    const width = window.innerWidth;
  };
  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);
  };
  setJobType = (type) => {
    this.setState({ jobType: type });
  };

  render() {
    const { innerWidth } = this.state;
    console.log(".>>>>>>>>>>>>>", this.state.jobType);
    console.log(this.state.subClicked);

    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Form.Group style={{ width: "50%" }}>
            <Form.Check
              onChange={(e) => {
                console.log(
                  "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
                  e.target.checked
                );
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
        <div style={{ display: "flex", flexDirection: "row", width: "150%" }}>
          <div>
            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 0 }}
            >
              <InputGroup.Prepend style={{ width: "38%", marginTop: 0 }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Client Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.clientName === "" &&
                    this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputClientname", text.target.value);
                  this.setState({ clientName: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%", marginTop: 0 }}>
                <InputGroup.Text id="inputGroup-sizing-sm">WO#</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.woNum === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputwo", text.target.value);
                  this.setState({ woNum: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Job Location
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.joblocation === "" &&
                    this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputJobLocation", text.target.value);
                  this.setState({ joblocation: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Contact
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.contact === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputContact", text.target.value);
                  this.setState({ contact: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Trade
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.trade === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputTrade", text.target.value);
                  this.setState({ trade: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">NTE</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.nte === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputnte", text.target.value);
                  this.setState({ nte: text.target.value });
                }}
              />
            </InputGroup>
          </div>
          <div style={{}}>
            <InputGroup size="sm" className="mb-3" style={{ width: "90%" }}>
              <InputGroup.Prepend style={{ width: "44%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Submitted Date
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="date"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.submdate === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("submitteddate", text.target.value);
                  this.setState({ submdate: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "44%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Needed Date
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type="date"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.neededdate === "" &&
                    this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputneededDate", text.target.value);
                  this.setState({ neededdate: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "44%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Urgency
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.urgency === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputurgency", text.target.value);
                  this.setState({ urgency: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "44%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Your Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.callerName === "" &&
                    this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputyourName", text.target.value);
                  this.setState({ callerName: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "90%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "44%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  Your Contat
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.callerNumber === "" &&
                    this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputcallerNumber", text.target.value);
                  this.setState({ callerNumber: text.target.value });
                }}
              />
            </InputGroup>

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
                onClick={(e) => {
                  this.setState({ subClicked: true });
                  if (
                    this.state.clientName.length < 1 ||
                    this.state.joblocation.length < 1 ||
                    this.state.urgency.length < 1 ||
                    this.state.contact.length < 1 ||
                    this.state.neededdate.length < 1 ||
                    this.state.submdate.length < 1 ||
                    this.state.ivrcode.length < 1 ||
                    this.state.ivrNumb.length < 1 ||
                    this.state.nte.length < 1 ||
                    this.state.callerName.length < 1 ||
                    this.state.callerNumber.length < 1
                  ) {
                    console.log("");
                    this.setState({
                      errorMessage: "Fields in red are Required",
                    });
                  } else {
                    this.handleFormSubmit(e);
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <div style={{ width: "15%" }}>
            <InputGroup size="sm" className="mb-3" style={{ width: "80%" }}>
              <InputGroup.Prepend style={{ width: "38%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  PO Number
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.poNumb === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputpoNumb", text.target.value);
                  this.setState({ poNumb: text.target.value });
                }}
              />
            </InputGroup>

            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "80%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  IVR Number
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.ivrNumb === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputivrNum", text.target.value);
                  this.setState({ ivrNumb: text.target.value });
                }}
              />
            </InputGroup>
            <InputGroup
              size="sm"
              className="mb-3"
              style={{ width: "80%", marginTop: 20 }}
            >
              <InputGroup.Prepend style={{ width: "38%", display: "flex" }}>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  IVR code
                </InputGroup.Text>
              </InputGroup.Prepend>

              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                style={{
                  display: "flex",
                  borderColor:
                    this.state.ivrcode === "" && this.state.subClicked === true
                      ? "red"
                      : "grey",
                }}
                onChange={(text) => {
                  console.log("inputivrcode", text.target.value);
                  this.setState({ ivrcode: text.target.value });
                }}
              />
            </InputGroup>

            <div>
              <Form.Group
                style={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  Job Description
                </Form.Label>
                <Form.Control
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderColor:
                      this.state.jobdescr === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    this.setState({ jobdescr: text.target.value });
                  }}
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
            </div>
          </div>
          <div>
            <Button
              variant="primary"
              style={{ width: "60%", marginLeft: "-20%" }}
            >
              Upload Documents
            </Button>

            <dir>
              <p style={{ width: "60%", marginLeft: "-65%" }}>
                {" "}
                Select your Avatar{" "}
              </p>
              <div className="unread">
                <div>
                  <Form.Group style={{ marginLeft: "-70%" }}>
                    <Form.Check
                      style={{ marginTop: 30 }}
                      custom
                      type="radio"
                      name="supportedRadios"
                      id="supportedRadio3"
                    />
                    <Form.Check
                      style={{ marginTop: 26 }}
                      custom
                      type="radio"
                      name="supportedRadios"
                      id="supportedRadio4"
                    />
                    <Form.Check
                      style={{ marginTop: 26 }}
                      custom
                      type="radio"
                      name="supportedRadios"
                      id="supportedRadio5"
                    ></Form.Check>
                  </Form.Group>
                </div>
                <dir style={{ marginTop: -150 }}>
                  <dir style={{ display: "flex", marginLeft: "-150%" }}>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
                      src={avatar1}
                      alt="activity-user"
                    />
                  </dir>
                  <dir style={{ display: "flex", marginLeft: "-150%" }}>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
                      src={avatar2}
                      alt="activity-user"
                    />
                  </dir>
                  <dir style={{ display: "flex", marginLeft: "-150%" }}>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
                      src={avatar3}
                      alt="activity-user"
                    />
                  </dir>
                </dir>
              </div>
            </dir>
          </div>

          {<div></div>}
        </div>

        {this.state.showTable && (
          <div>
            <div style={{ width: "65%" }}>
              <Card style={{ flex: 1 }}>
                <Card.Body as="h5">
                  Work Orders
                  <div>
                    <InputGroup
                      size="sm"
                      className="mb-3"
                      style={{ width: "25%" }}
                    >
                      <InputGroup.Prepend>
                        <Button variant="primary">Find WO</Button>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={(text) => {
                          this.setState({ name: text });
                        }}
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                    </InputGroup>
                  </div>
                  <table
                    style={{ backgroundColor: "white" }}
                    className="table mt-3"
                    id="tablepadding"
                  >
                    <thead>
                      <tr>
                        <th>WO numb</th>
                        <th>Job location</th>
                        <th>Trade</th>
                        <th>NTE</th>
                        <th>Submitted date</th>
                        <th>Needed Date</th>
                        <th>Urgency</th>
                        <th>Job Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.jobList.map((item, index) => {
                        if (item.data.assignedby === "client") {
                          return (
                            <tr key={index}>
                              <td>{item.data.woNum}</td>
                              <td>{item.data.jobData.joblocation}</td>
                              <td>{item.data.jobData.trade}</td>
                              <td>{item.data.jobData.nte}</td>
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
                        }
                      })}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ClientPortal;
