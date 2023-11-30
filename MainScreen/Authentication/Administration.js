import React from "react";

import {
  getDocs,
  collection,
  addDoc,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { CONFIG } from "../../helpers/configFb";
import {
  Button,
  Dropdown,
  DropdownButton,
  Modal,
  Table,
} from "react-bootstrap";

const app = initializeApp(CONFIG.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      email: "",
      password: "",
      openAddUser: false,
      name: "",
      lastName: "",
      phoneNumber: "",
      selectedtype: "Dispatcher",
      typesData: ["Admin", "Manager", "Team leader", "Dispatcher", "dataTeam"],
    };
  }

  componentDidMount = () => {};

  registerWithEmailAndPassword = async () => {
    const { name, lastName, email, password, phoneNumber, selectedtype } =
      this.state;
    console.log("registerWithEmailAndPassword", auth, email, password);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("registerWithEmailAndPasswordtttt", res);
      const user = res.user;
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        name,
        lastName,
        email,
        password,
        phoneNumber,
        selectedtype,
        authProvider: "local",
      });
    } catch (err) {
      console.error("123456789777777", err);
      alert(err.message);
    }
  };

  buttonpressed = () => {
    const { username, email, password } = this.state;
    console.log("button pressed");
    this.registerWithEmailAndPassword(username, email, password);
  };

  handleClose = () => {
    this.setState({ openAddUser: false });
  };

  render() {
    const { name, lastName, email, password, phoneNumber } = this.state;
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ openAddUser: true });
          }}
          className="btn btn-primary"
        >
          Add User
        </button>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Phone Number</th>
                <th>Title</th>
              </tr>
            </thead>
          </Table>
        </div>
        <Modal show={this.state.openAddUser} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ width: "100%" }} className="input-group mb-3">
              <span
                style={{ width: "40%" }}
                className="input-group-text"
                id="clientname-label"
              >
                Name
              </span>
              <input
                style={{ backgroundColor: "whitesmoke" }}
                type="text"
                className="form-control"
                placeholder="Enter client name..."
                value={name}
                onChange={(event) =>
                  this.setState({ name: event.target.value })
                }
              />
            </div>
            <div style={{ width: "100%" }} className="input-group mb-3">
              <span
                style={{ width: "40%" }}
                className="input-group-text"
                id="clientname-label"
              >
                Last Name
              </span>
              <input
                style={{ backgroundColor: "whitesmoke" }}
                type="text"
                className="form-control"
                placeholder="Enter Last name..."
                value={lastName}
                onChange={(event) =>
                  this.setState({ lastName: event.target.value })
                }
              />
            </div>
            <div style={{ width: "100%" }} className="input-group mb-3">
              <span
                style={{ width: "40%" }}
                className="input-group-text"
                id="clientname-label"
              >
                Email
              </span>
              <input
                style={{ backgroundColor: "whitesmoke" }}
                type="email"
                className="form-control"
                placeholder="Enter Email ..."
                value={email}
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </div>
            <div style={{ width: "100%" }} className="input-group mb-3">
              <span
                style={{ width: "40%" }}
                className="input-group-text"
                id="clientname-label"
              >
                Password
              </span>
              <input
                style={{ backgroundColor: "whitesmoke" }}
                type="password"
                className="form-control"
                placeholder="Enter Password..."
                value={password}
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </div>
            <div style={{ width: "100%" }} className="input-group mb-3">
              <span
                style={{ width: "40%" }}
                className="input-group-text"
                id="clientname-label"
              >
                Phone Number
              </span>
              <input
                style={{ backgroundColor: "whitesmoke" }}
                type="number"
                className="form-control"
                placeholder="Enter Phone Numer..."
                value={phoneNumber}
                onChange={(event) =>
                  this.setState({ phoneNumber: event.target.value })
                }
              />
            </div>
            <div>
              <DropdownButton
                onSelect={(e) => {
                  console.log("DropDownButtonOnChange", e);
                  this.setState({ selectedtype: this.state.typesData[e] });
                }}
                title={this.state.selectedtype}
              >
                <Dropdown.Item eventKey="0">
                  {this.state.typesData[0]}
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">
                  {this.state.typesData[1]}
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  {this.state.typesData[2]}
                </Dropdown.Item>
                <Dropdown.Item eventKey="3">
                  {this.state.typesData[3]}
                </Dropdown.Item>
                <Dropdown.Item eventKey="4">
                  {this.state.typesData[4]}
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.registerWithEmailAndPassword();
                this.handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Administration;
