import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { map } from "jquery";
import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { MainContext } from "../core/MainContext";
import { CONFIG } from "../helpers/configFb";
import {
  getJobs,
  handleDeleteJob,
  setJob,
  updateAssignedTo,
} from "../helpers/fireStoreMain";
import DEMO from "../store/constant";
const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

class teamLeader extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);

    this.state = {
      datta: [
        {
          woNum: "John Doe",
          joblocation: "28",
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
      ],
      itemToEdit: [
        {
          jobType: "",
          estimTechName: "",
          estimTechCon: "",
          estimDate: "",
          estimTime: "",
          estimCost: "",
          estimPaidby: "",
          estimPaymentAdress: "",
          jobDoneTechName: "",
          jobDoneTechCon: "",
          jobDoneDate: "",
          jobDoneTime: "",
          jobDoneCost: "",
          jobDonePaidby: "",
          jobDonePaymentAdress: "",
          jobDoneHours: "",
          techDescription: "",
          dispId: this.setState.selectAuser,
          suppliyer: "",
          otherSuppliyer: "",
          material: "",
          proffision: "",
          scheduleddate: "",
          currentuser: "teamleader",
        },
      ],
      showselectdispatcher: false,
      selectAuser: "Select a Dispatcher",
      selectedUser: { selectedtype: "Select Dispatcher" },
      woNum: "",
      joblocation: "",
      contact: "",
      trade: "",
      nte: "",
      ivrcode: "",
      poNumb: "",
      clientName: "",
      submdate: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      jobdescr: "",
      jobList: [],
      showModal: false,
      selectedMan: "",
      selectedDisp: "",
      selectedTeamLeader: "",
      selectedStatus: "",
      selectedUName: "Select Assignee",
      selectedUserClient: "Select Assignee",
      selectedIndex: "0",
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount = async () => {
    const context = this.context;
    const jobList = await getJobs();
    this.setState({ jobList }, () => {
      this.setState({});
    });
  };

  async handleFormSubmit(event) {
    event.preventDefault(); // prevent the page from reloading

    // create a new object with the data from the input fields
    const newItem = {
      woNum: this.state.woNum,
      manager: this.state.selectedMan,
      teamLeader: this.state.selectedTeamLeader,
      dispatcher: this.state.selectedDisp,
      status: this.state.selectedStatus,
      assignedTo: this.state.selectedUName,
      assignedby: this.state.currentuser,
      //managerData
      jobData: {
        joblocation: this.state.joblocation,
        contact: this.state.contact,
        trade: this.state.trade,
        nte: this.state.nte,
        ivrcode: this.state.ivrcode,
        poNumb: this.state.poNumb,
        clientName: this.state.clientName,
        submdate: this.state.submdate,
        neededdate: this.state.neededdate,
        urgency: this.state.urgency,
        callerName: this.state.callerName,
        jobdescr: this.state.jobdescr,
        urgency: this.state.urgency,
      },
      //teamLeaderData
      teamLeaderData: {},
      //dispatcherData
      dispatcherData: {
        jobType: "",
        estimTechName: "",
        estimTechCon: "",
        estimDate: "",
        estimTime: "",
        estimCost: "",
        estimPaidby: "",
        estimPaymentAdress: "",
        jobDoneTechName: "",
        jobDoneTechCon: "",
        jobDoneDate: "",
        jobDoneTime: "",
        jobDoneHours: "",
        jobDoneCost: "",
        jobDonePaidby: "",
        jobDonePaymentAdress: "",
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
      poNumb: "",
      clientName: "",
      submdate: "",
      neededdate: "",
      urgency: "",
      callerName: "",
      jobdescr: "",
    });
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  render() {
    console.log("889899889798789798798797987", this.state.poNumb);
    const context = this.context;
    const { showselectdispatcher } = this.state;
    const {
      datta,
      woNum,
      joblocation,
      contact,
      trade,
      nte,
      ivrcode,
      poNumb,
      clientName,
      submdate,
      neededdate,
      urgency,
      callerName,
      jobdescr,
      showModal,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <div>
              <Card
                className="Recent-Users"
                tyle={{ display: "flex", flexDirection: "row" }}
              >
                <div
                  tyle={{
                    display: "flex",
                    flexDirection: "row",
                    wight: "100%",
                  }}
                >
                  {
                    " ...................................................................................."
                  }
                  {
                    " New Work Orders............................................................................................."
                  }
                </div>
                <Card.Body
                  className="px-0 py-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    wight: "165%",
                  }}
                >
                  <Table responsive hover>
                    <tbody>
                      {this.state.jobList.map((item, index) => {
                        console.log(
                          "IIIITEEEEEEEMMMMMMMMMMM0",
                          item.data.assignedby
                        );
                        if (item.data.assignedby === "manager") {
                          return (
                            <tr
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                              }}
                              key={index}
                            >
                              {/* <td>
                                <DropdownButton
                                  onSelect={(e) => {
                                    let selected = "";
                                    if (e.includes("user")) {
                                      selected = context.dispatchersList[e[0]];
                                      console.log(
                                        "user new",
                                        selected,
                                        e[0],
                                        e
                                      );
                                    }
                                    this.setState(
                                      {
                                        selectedUser: selected,
                                        selectedUName: selected
                                          ? selected.name + selected.lastName
                                          : "",
                                      },
                                      () => {
                                        console.log(
                                          `''''''''''''''''';;;;;;;;`,
                                          selected
                                        );
                                      }
                                    );
                                  }}
                                  title={
                                    this.state.selectedUser
                                      ? `${this.state.selectedUser.name}  ${this.state.selectedUser.lastName}`
                                      : "Select a user"
                                  }
                                >
                                  {context.dispatchersList.map(
                                    (item, index) => {
                                      return (
                                        <Dropdown.Item
                                          key={`${item.id}${index}user`}
                                          eventKey={`${index}user`}
                                        >
                                          {item.name} {item.lastName}
                                        </Dropdown.Item>
                                      );
                                    }
                                  )}
                                </DropdownButton>
                              </td> */}
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

                                    this.setState({
                                      showselectdispatcher: true,
                                      selectedjob: item,
                                    });
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
            </div>
          </div>
        </form>

        <table
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
              if (item.data.assignedby === "TeamLeader") {
                return (
                  <tr key={index}>
                    <td>{item.data.woNum}</td>
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
              }
            })}
          </tbody>
        </table>

        <Modal show={showselectdispatcher} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit WO</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ backgroundColor: "red", width: "100%" }}>
              <DropdownButton
                onSelect={(e) => {
                  let selected = "";
                  if (e.includes("user")) {
                    selected = context.dispatchersList[e[0]];
                    console.log("user new", selected, e[0], e);
                  }
                  this.setState(
                    {
                      selectedUser: selected,
                      selectedUName: selected
                        ? selected.name + selected.lastName
                        : "",
                    },
                    () => {
                      console.log(`''''''''''''''''';;;;;;;;`, selected);
                    }
                  );
                }}
                title={
                  this.state.selectedUser
                    ? `${this.state.selectedUser.name}  ${this.state.selectedUser.lastName}`
                    : "Select a user"
                }
              >
                {context.dispatchersList.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={`${item.id}${index}user`}
                      eventKey={`${index}user`}
                    >
                      {item.name} {item.lastName}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                const data = {
                  assignedTo: this.state.selectedDisp,
                };
                updateAssignedTo(this.state.selectedjob.data.dispId, data).then(
                  async () => {
                    const jobList = await getJobs();
                    console.log("const jobList = await getJobs();", jobList);
                    this.setState({ jobList });
                    showModal = false;
                  }
                );
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
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Proccess WO</Modal.Title>
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
          <Modal.Footer handleClose>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleFormSubmit}
              closeButton
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default teamLeader;
