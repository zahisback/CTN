import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
  Form,
  DropdownButton,
  Collapse,
  Dropdown,
  Modal,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { CONFIG } from "../helpers/configFb";
import UcFirst from "../App/components/UcFirst";
import {
  getTechs,
  setJob,
  setTech,
  Addedby,
  techId,
} from "../helpers/fireStoreMain";
import { TableBody } from "semantic-ui-react";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

class TechList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: true,
      writeAccess: true,
      techData: {
        techId: "",
        Addedby: "",
        techName: "",
        techCon: "",
        estimCost: "",
        paidby: "",
        techZip: "",
        techState: "",
        techCoverage: "",
        techNote: "",
        techTrade: "",
        techUrgency: "",
        freeEstim: true, // Initialize freeEstim as a boolean
        showTable: true,
        newTechMobal: false,
      },
      techList: [],
      selectedTech: [],
      filteredTech: [],
      isMultiTarget: [], // Initialize isMultiTarget in the state
    };
  }

  newTechMobal = () => {};
  targetHandler = (target) => {
    if (this.state.selectedTarget === target) {
      this.setState({ selectedTarget: null });
    } else {
      this.setState({ selectedTarget: target });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      techData: {
        ...prevState.techData,
        [name]: value,
      },
    }));
  };

  handleInputKeyPress = (event, target) => {
    if (event.key === "Enter") {
      this.submitAndClose(target);
    }
  };

  submitAndClose = (target) => {
    this.targetHandler(target);
  };

  componentDidMount = async () => {
    const techList = await getTechs();
    console.log("const techlist = await gettechs();", techList);
    this.setState({ techList });
  };

  // setTech(newTech).then(async(id) => {
  //   const techId = doc(db, "tech-list", id);
  //   await updateDoc(techId, {
  //     techId: id,
  //   });
  //   const techlist = await getTechs();
  //   console.log("const jobList = await getJobs();", techlist);
  //   this.setState({ techlist });
  // });
  // const techList = await getTechs();
  //  const newTech = {
  //   techId: this.state.techId,
  async handleFormSubmit(event) {
    event.preventDefault(); // prevent the page from reloading
    // create a new object with the data from the input fields
    const newTech = {
      techId: this.state.techId,
      Addedby: this.state.Addedby,
      techName: this.state.techName,
      techCon: this.state.techCon,
      estimCost: this.state.estimCost,
      paidby: this.state.paidby,
      techZip: this.state.techZip,
      techState: this.state.techState,
      techCoverage: this.state.techCoverage,
      techNote: this.state.techNote,
      techTrade: this.state.techTrade,
      techUrgency: this.state.techUrgency,
    };

    setTech(newTech).then(async (id) => {
      const techId = doc(db, "tech-list", id);
      await updateDoc(techId, {
        techId: id,
      });
      const techList = await getTechs();
      console.log("const techlist = await gettechs();", techList);
      this.setState({ techList });
    });
    // add the new item to the datta array
    this.setState({
      techData: [...this.state.techData, newTech],
      techId: "",
      Addedby: "",
      techName: "",
      techCon: "",
      estimCost: "",
      paidby: "",
      techZip: "",
      techState: "",
      techCoverage: "",
      techNote: "",
      techTrade: "",
      techUrgency: "",
    });
  }

  addTechSubmit = async () => {
    const { techData } = this.state;

    try {
      const docRef = await addDoc(collection(db, "tech-list"), techData);

      const newTechList = [...this.state.techList, { ...techData }];
      this.setState({
        techList: newTechList,

        techData: {
          techId: "",
          Addedby: "",
          freeEstim: true,
          techName: "",
          techCon: "",
          estimCost: "",
          paidby: "",
          techZip: "",
          techState: "",
          techCoverage: "",
          techNote: "",
          techTrade: "",
          techUrgency: "",
        },
      });
    } catch (error) {
      console.error("Error adding tech:", error);
    }
  };

  render() {
    const { techData, newTech, selectedTech, selectedTarget } = this.state;
    const { isBasic, isMultiTarget, accordionKey } = this.state;
    const handleRowClick = (item) => {
      selectedTarget(item);
    };

    return (
      <>
        <div>
          <Button
            onClick={() => {
              this.setState({ newTechMobal: true });
            }}
            variant="primary"
          >
            Add Technician
          </Button>
        </div>

        {this.state.showTable && (
          <div>
            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <td>
                        <Button
                          style={{}}
                          onClick={() => this.targetHandler("target1")}
                          aria-controls="target1"
                          aria-expanded={selectedTarget === "target1"}
                        >
                          Zip Code
                        </Button>
                        <Collapse in={selectedTarget === "target1"}>
                          <div id="target1">
                            <input
                              style={{ width: 100 }}
                              onKeyPress={(event) =>
                                this.handleInputKeyPress(event, "target1")
                              }
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => this.targetHandler("target2")}
                          aria-controls="target2"
                          aria-expanded={selectedTarget === "target2"}
                        >
                          Tech Name
                        </Button>
                        <Collapse in={selectedTarget === "target2"}>
                          <div id="target2">
                            <input
                              style={{ width: 100 }}
                              onKeyPress={(event) =>
                                this.handleInputKeyPress(event, "target2")
                              }
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                        <Button
                          onClick={() => this.targetHandler("target3")}
                          aria-controls="target3"
                          aria-expanded={selectedTarget === "target3"}
                        >
                          Tech Contact
                        </Button>
                        <Collapse in={selectedTarget === "target3"}>
                          <div id="target3">
                            <input
                              style={{ width: 100 }}
                              onKeyPress={(event) =>
                                this.handleInputKeyPress(event, "target3")
                              }
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => this.targetHandler("target4")}
                          aria-controls="target4"
                          aria-expanded={selectedTarget === "target4"}
                        >
                          Tech State
                        </Button>
                        <Collapse in={selectedTarget === "target4"}>
                          <div id="target4">
                            <input
                              style={{ width: 100 }}
                              onKeyPress={(event) =>
                                this.handleInputKeyPress(event, "target4")
                              }
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => this.targetHandler("target5")}
                          aria-controls="target5"
                          aria-expanded={selectedTarget === "target5"}
                        >
                          Free Estimation
                        </Button>
                        <Collapse in={selectedTarget === "target5"}>
                          <div id="target5">
                            <input
                              style={{ width: 100 }}
                              onKeyPress={(event) =>
                                this.handleInputKeyPress(event, "target")
                              }
                            />
                          </div>
                        </Collapse>
                      </td>
                      <td>
                        {" "}
                        <Button>Tech Trade</Button>
                      </td>
                      <td>
                        {" "}
                        <Button>Tech Coverage</Button>
                      </td>
                      <td>
                        {" "}
                        <Button>Tech Urgency</Button>
                      </td>
                      <td>
                        {" "}
                        <Button>Note about tech</Button>
                      </td>
                      <td>
                        <Button>Est. Cost</Button>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.techList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.data.techZip}</td>
                        <td>{item.data.techName}</td>
                        <td>{item.data.techCon}</td>
                        <td>{item.data.techState}</td>
                        <td>{item.data.freeEstim}</td>
                        <td>{item.data.techTrade}</td>
                        <td>{item.data.techCoverage}</td>
                        <td>{item.data.techUrgency}</td>
                        <td>{item.data.estimCost}</td>
                        <td>{item.data.techNote}</td>
                        <td>{item.data.paidby}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <Modal
              show={this.state.newTechMobal}
              onHide={() => this.setState({ newTechMobal: false })}
            >
              <Modal.Header closeButton>
                <Modal.Title>New Technician</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician Name</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techName"
                      placeholder="Enter tech name..."
                      value={techData.techName}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician Contact</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techCon"
                      placeholder="Enter tech contact..."
                      value={techData.techCon}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician State</InputGroup.Text>
                    <FormControl
                      type="state"
                      name="techState"
                      placeholder="Enter tech state..."
                      value={techData.techState}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician Zip</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techZip"
                      placeholder="Enter tech zip..."
                      value={techData.techZip}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician Coverage</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techCoverage"
                      placeholder="Enter tech Coverage..."
                      value={techData.techCoverage}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician Trade</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techTrade"
                      placeholder="Enter tech Trade..."
                      value={techData.techTrade}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Technician urgency</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techUrgency"
                      placeholder="Enter tech Urgency..."
                      value={techData.techUrgency}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Note About Tech</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="techNote"
                      placeholder="Whrite Notes about Tech..."
                      value={techData.techNote}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Free Estimation</InputGroup.Text>
                    <FormControl
                      type="FormCheck"
                      name="freeEstimation"
                      placeholder="yes or no..."
                      value={techData.freeEstim}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Estimation Cost</InputGroup.Text>
                    <FormControl
                      type="text"
                      name="estimCost"
                      placeholder="Enter Estimation Cost..."
                      value={techData.estimCost}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>Payment Methode</InputGroup.Text>
                    <FormControl
                      type="list"
                      name="paidBy"
                      placeholder="Enter tech Payment methode..."
                      value={techData.paidby}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ newTech: false })}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={this.addTechSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </>
    );
  }
}

export default TechList;
