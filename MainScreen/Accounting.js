import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
// import UcFirst from '../App/components/UcFirst';
import avatar1 from "../assets/images/user/avatar-1.jpg";
import avatar2 from "../assets/images/user/avatar-2.jpg";
import avatar3 from "../assets/images/user/avatar-3.jpg";
import { userPrev } from "../helpers/UserPrev";
import DEMO from "../store/constant";
// import Aux from "../../hoc/_Aux";

class ClientPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: true,
      writeAccess: true,
      data: {
        clientName: "",
        jobType: "",
        wo: "",
        joblocation: "",
        contact: "",
        trade: "",
        dateSubmitted: "",
        dateNeeded: "",
        Urgency: "",
        nte: "",
        yourName: "",
        poNumb: "",
        ivrNumb: "",
        ivrCode: "",
        yourContact: "",
      },
      errorMessage: "",
      subClicked: false,
      jobType: "",
      clientName: "",
      wo: "",
      joblocation: "",
      contact: "",
      trade: "",
      dateSubmitted: "",
      dateNeeded: "",
      Urgency: "",
      nte: "",
      yourName: "",
      poNumb: "",
      ivrNumb: "",
      ivrCode: "",
      yourContact: "",

      //style
      innerWidth: window.innerWidth,
    };
  }

  onSubmitClick = () => {
    this.setState(
      {
        data: {
          clientName: this.state.clientName,
          jobType: this.state.jobType,
          WO: this.state.wo,
          joblocation: this.state.joblocation,
          contact: this.state.contact,
          trade: this.state.trade,
          dateSubmitted: this.state.dateSubmitted,
          dateNeeded: this.state.dateNeeded,
          Urgency: this.state.Urgency,
          nte: this.state.nte,
          yourName: this.state.yourName,
          poNumb: this.state.poNumb,
          ivrNumb: this.state.ivrNumb,
          ivrCode: this.state.ivrCode,
          yourContact: this.state.yourContact,
        },
      },
      () => {
        console.log("??????????????", this.state.data);
        // firestore.collection('batata').doc('sflkfsljsdkf').update()
      }
    );
  };

  // handleErrors = (item)=>{
  // if (item ==="Client Name" ) {
  //     this.setState(({errorMessage:"required"}))

  // } else if (item ==="WO#" ) {

  // } else     if (item ==="Client Name" ) {

  // } else   if (item ==="Client Name" ) {

  // } else    if (item ==="Client Name" ) {

  // } else {

  // }
  // }
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
    if ((userPrev = "dispatcher"))
      return (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Group style={{ width: "50%" }}>
              <Form.Check
                inline
                custom
                type="radio"
                label="Estimation"
                name="supportedRadio"
                id="supportedRadio21"
                onChange={(res) => {
                  if (res.bubbles) {
                    this.setState({ jobType: "Estimation" });
                    // console.log('Estimation');
                  }
                }}
                style={{ width: "20%", fontSize: 16 }}
                size={"20%"}
              />
              <Form.Check
                inline
                custom
                type="radio"
                label="Job Done"
                name="supportedRadio"
                id="supportedRadio22"
                onChange={(res) => {
                  if (res.bubbles) {
                    this.setState({ jobType: "jobDone" });
                    // console.log('jobe doneee');
                  }
                }}
                style={{ width: "20%", fontSize: 16 }}
                size={"20%"}
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
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    WO#
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{
                    display: "flex",
                    borderColor:
                      this.state.wo === "" && this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputwo", text.target.value);
                    this.setState({ wo: text.target.value });
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
                      this.state.contact === "" &&
                      this.state.subClicked === true
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
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    NTE
                  </InputGroup.Text>
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
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{
                    display: "flex",
                    borderColor:
                      this.state.dateSubmitted === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputsubmittedDate", text.target.value);
                    this.setState({ dateSubmitted: text.target.value });
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
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{
                    display: "flex",
                    borderColor:
                      this.state.dateNeeded === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputneededDate", text.target.value);
                    this.setState({ dateNeeded: text.target.value });
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
                      this.state.Urgency === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputurgency", text.target.value);
                    this.setState({ Urgency: text.target.value });
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
                      this.state.yourName === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputyourName", text.target.value);
                    this.setState({ yourName: text.target.value });
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
                      this.state.yourContact === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputyourContact", text.target.value);
                    this.setState({ yourContact: text.target.value });
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
                  onClick={() => {
                    this.setState({ subClicked: true });
                    if (
                      this.state.clientName.length < 1 ||
                      this.state.joblocation.length < 1 ||
                      this.state.Urgency.length < 1 ||
                      this.state.contact.length < 1 ||
                      this.state.dateNeeded.length < 1 ||
                      this.state.dateSubmitted.length < 1 ||
                      this.state.ivrCode.length < 1 ||
                      this.state.ivrNumb.length < 1 ||
                      this.state.nte.length < 1 ||
                      this.state.yourName.length < 1 ||
                      this.state.jobType === ""
                    ) {
                      console.log("");
                      this.setState({
                        errorMessage: "Fields in red are Required",
                      });
                    } else {
                      this.onSubmitClick("");
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
                      this.state.ivrNumb === "" &&
                      this.state.subClicked === true
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
                      this.state.ivrCode === "" &&
                      this.state.subClicked === true
                        ? "red"
                        : "grey",
                  }}
                  onChange={(text) => {
                    console.log("inputivrCode", text.target.value);
                    this.setState({ ivrCode: text.target.value });
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
                <tr className="unread">
                  <tr>
                    <Form.Group style={{ marginLeft: "-150%" }}>
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
                  </tr>
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
                </tr>
              </dir>
            </div>

            {<div></div>}
          </div>

          {this.state.showTable && (
            <div>
              <div style={{ width: "65%" }}>
                <Card style={{ flex: 1 }}>
                  <Card.Body as="h5">
                    Jobs Completed
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
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>WO#</th>
                          <th>Job Location</th>
                          <th>Contact</th>
                          <th>Trade</th>
                          <th>NTE</th>
                          <th>Submited Date</th>
                          <th>Needed Date</th>
                          <th>Job status</th>
                        </tr>
                      </thead>
                    </Table>
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
