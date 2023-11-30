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
import avatar1 from "../assets/images/user/avatar-1.jpg";
import DEMO from "../store/constant";

class Quotation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datta: [
        {
          woNum: "John Doe",
          joblocation: 28,
          contact: "New York",
          trade: "1",
          nte: "2",
          ivrcode: "3",
          poNumb: "4",
          clientName: "5",
          submdate: "6",
          neededdate: "7",
          urgency: "8",
          callerName: "9",
          jobdescr: "10",
        },
        {
          woNum: "Jane Smith",
          joblocation: 32,
          contact: "San Francisco",
          trade: "1",
          nte: "2",
          ivrcode: "3",
          poNumb: "4",
          clientName: "5",
          submdate: "6",
          neededdate: "7",
          urgency: "8",
          callerName: "9",
          jobdescr: "10",
        },
        {
          woNum: "Bob Johnson",
          joblocation: 42,
          contact: "Chicago",
          trade: "1",
          nte: "2",
          ivrcode: "3",
          poNumb: "4",
          clientName: "5",
          submdate: "6",
          neededdate: "7",
          urgency: "8",
          callerName: "9",
          jobdescr: "10",
        },
        {
          woNum: "Alice Williams",
          joblocation: 25,
          contact: "Los Angeles",
          trade: "1",
          nte: "2",
          ivrcode: "3",
          poNumb: "4",
          clientName: "5",
          submdate: "6",
          neededdate: "7",
          urgency: "8",
          callerName: "9",
          jobdescr: "10",
        },
      ],
      DDdata: ["Dispatcher 1", "Dispatcher 2", "Dispatcher 3", "Dispatcher 4"],
      selectedDDdata: "Select Dispatcher",
      woNum: "",
      joblocation: "",
      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      poNum: "",
      clientName: "",
      submdate: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      jobdescr: "",
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault(); // prevent the page from reloading

    // create a new object with the data from the input fields
    const newItem = {
      woNum: this.state.woNum,
      joblocation: this.state.joblocation,
      contact: this.state.contact,
      trade: this.state.trade,
      nte: this.state.nte,
      ivrcode: this.state.ivrcode,
      poNum: this.state.poNum,
      clientName: this.state.clientName,
      submdate: this.state.submdate,
      neededdate: this.state.neededdate,
      urgency: this.state.urgency,
      callerName: this.state.callerName,
      jobdescr: this.state.jobdescr,
    };

    // add the new item to the datta array
    this.setState({
      datta: [...this.state.datta, newItem],
      woNum: "",
      joblocation: "",
      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      poNum: "",
      clientName: "",
      submdate: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      jobdescr: "",
    });
  }

  render() {
    const {
      datta,
      woNum,
      joblocation,
      contact,
      trade,
      nte,
      ivrcode,
      poNum,
      clientName,
      submdate,
      neededdate,
      urgency,
      callerName,
      jobdescr,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "20%" }}>
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
                  type="number"
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
                  placeholder="Enter enter phone number..."
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
                  value={poNum}
                  onChange={(event) =>
                    this.setState({ poNum: event.target.value })
                  }
                />
              </div>
            </div>
            <div style={{ width: "22%" }}>
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
                  type="text"
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
                  type="text"
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div style={{ width: "60%", marginLeft: "1%" }}>
              <Card className="Recent-Users" style={{ width: "100%" }}>
                <Card.Header>
                  <Card.Title as="h5">New Work Order</Card.Title>
                </Card.Header>
                <Card.Body className="px-0 py-2">
                  <Table responsive hover>
                    <tbody>
                      <tr className="unread">
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ width: "40px" }}
                            src={avatar1}
                            alt="activity-user"
                          />
                        </td>
                        <td>
                          <h6 joblocation="mb-1">beirut</h6>
                          <p urgency="m-0">
                            Lorem Ipsum is simply dummy text of…
                          </p>
                        </td>
                        <td>
                          <h6 neededdate="text-muted">
                            <i className="fa fa-circle text-c-green f-10 m-r-15" />
                            21 July 12:56
                          </h6>
                        </td>
                        <div>
                          <DropdownButton
                            onSelect={(e) => {
                              console.log("DropDownButtonOnChange", e);
                              this.setState({
                                selectedDDdata: this.state.DDdata[e],
                              });
                            }}
                            title={this.state.selectedDDdata}
                          >
                            <Dropdown.Item eventKey="0">
                              {this.state.DDdata[0]}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="1">
                              {this.state.DDdata[1]}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                              {this.state.DDdata[2]}
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3">
                              {this.state.DDdata[3]}
                            </Dropdown.Item>
                          </DropdownButton>
                        </div>
                        <td>
                          <a
                            href={DEMO.BLANK_LINK}
                            className="label theme-bg2 text-white f-12"
                          >
                            Reject
                          </a>
                          <a
                            href={DEMO.BLANK_LINK}
                            className="label theme-bg text-white f-12"
                          >
                            Approve
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>
        </form>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>WO numb</th>
              <th>Job location</th>
              <th>contact</th>
              <th>Trade</th>
              <th>NTE</th>
              <th>IVR Code</th>
              <th>Po Number</th>
              <th>Client Name</th>
              <th>Submdate</th>
              <th>Needed Date</th>
              <th>Urgency</th>
              <th>Caller Name</th>
              <th>Job Description</th>
            </tr>
          </thead>
          <tbody>
            {datta.map((item, index) => (
              <tr key={index}>
                <td>{item.woNum}</td>
                <td>{item.joblocation}</td>
                <td>{item.contact}</td>
                <td>{item.trade}</td>
                <td>{item.nte}</td>
                <td>{item.ivrcode}</td>
                <td>{item.poNumb}</td>
                <td>{item.clientName}</td>
                <td>{item.submdate}</td>
                <td>{item.urgency}</td>
                <td>{item.callerName}</td>
                <td>{item.jobdescr}</td>v
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Quotation;
