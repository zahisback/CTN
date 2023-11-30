import React from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

import DEMO from "../store/constant";

import avatar1 from "../assets/images/user/avatar-1.jpg";
import avatar2 from "../assets/images/user/avatar-2.jpg";
import avatar3 from "../assets/images/user/avatar-3.jpg";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { CONFIG } from "../helpers/configFb";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUser } from "../helpers/fireStoreMain";
import { MainContext } from "../core/MainContext";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

class Dashboard extends React.Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    const context = this.context;
  };

  render() {
    const context = this.context;
    console.log("oooooooo contextttt", context.currentUser);
    const tabContent = (
      <div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}>
              <img
                className="rounded-circle"
                style={{ width: "40px" }}
                src={avatar1}
                alt="activity-user"
              />
            </a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Silje Larsen</h6>
            <span className="float-right d-flex  align-items-center">
              <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
              3784
            </span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}>
              <img
                className="rounded-circle"
                style={{ width: "40px" }}
                src={avatar2}
                alt="activity-user"
              />
            </a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Julie Vad</h6>
            <span className="float-right d-flex  align-items-center">
              <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
              3544
            </span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}>
              <img
                className="rounded-circle"
                style={{ width: "40px" }}
                src={avatar3}
                alt="activity-user"
              />
            </a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Storm Hanse</h6>
            <span className="float-right d-flex  align-items-center">
              <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
              2739
            </span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}>
              <img
                className="rounded-circle"
                style={{ width: "40px" }}
                src={avatar1}
                alt="activity-user"
              />
            </a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Frida Thomse</h6>
            <span className="float-right d-flex  align-items-center">
              <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
              1032
            </span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}>
              <img
                className="rounded-circle"
                style={{ width: "40px" }}
                src={avatar2}
                alt="activity-user"
              />
            </a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Silje Larsen</h6>
            <span className="float-right d-flex  align-items-center">
              <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
              8750
            </span>
          </div>
        </div>
        <div className="media friendlist-box align-items-center justify-content-center">
          <div className="m-r-10 photo-table">
            <a href={DEMO.BLANK_LINK}>
              <img
                className="rounded-circle"
                style={{ width: "40px" }}
                src={avatar3}
                alt="activity-user"
              />
            </a>
          </div>
          <div className="media-body">
            <h6 className="m-0 d-inline">Storm Hanse</h6>
            <span className="float-right d-flex  align-items-center">
              <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
              8750
            </span>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Work Orders Schedualed</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                      6
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">50%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="50"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Work Orders Finalized</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{" "}
                      63
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">36%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme2"
                    role="progressbar"
                    style={{ width: "35%" }}
                    aria-valuenow="35"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Yearly F. W. O</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                      1247
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">70%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{ width: "70%" }}
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Recent Updates</Card.Title>
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
                        <h6 className="mb-1">Isabella Christensen</h6>
                        <p className="m-0">
                          Lorem Ipsum is simply dummy text of…
                        </p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          11 MAY 12:56
                        </h6>
                      </td>
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
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar2}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">Mathilde Andersen</h6>
                        <p className="m-0">
                          Lorem Ipsum is simply dummy text of…
                        </p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-red f-10 m-r-15" />
                          11 MAY 10:35
                        </h6>
                      </td>
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
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar3}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">Karla Sorensen</h6>
                        <p className="m-0">
                          Lorem Ipsum is simply dummy text of…
                        </p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          9 MAY 17:38
                        </h6>
                      </td>
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
                        <h6 className="mb-1">Ida Jorgensen</h6>
                        <p className="m-0">
                          Lorem Ipsum is simply dummy text of…
                        </p>
                      </td>
                      <td>
                        <h6 className="text-muted f-w-300">
                          <i className="fa fa-circle text-c-red f-10 m-r-15" />
                          19 MAY 12:56
                        </h6>
                      </td>
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
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar2}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">Albert Andersen</h6>
                        <p className="m-0">
                          Lorem Ipsum is simply dummy text of…
                        </p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          21 July 12:56
                        </h6>
                      </td>
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
          </Col>
          <Col md={6} xl={4}>
            <Card className="card-event"></Card>
            <Card>
              <Card.Body className="border-bottom">
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-green" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">235</h3>
                    <span className="d-block text-uppercase">
                      total Job Completed
                    </span>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-map-pin f-30 text-c-blue" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">26</h3>
                    <span className="d-block text-uppercase">
                      total locations
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>{" "}
          <Col xl={4}>
            <Card className="card-social">
              <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                  <div className="col-6">
                    <h6 className="text-center m-b-10">
                      <span className="text-muted m-r-5">Target:</span>5000
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "80%", height: "6px" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h6 className="text-center  m-b-10">
                      <span className="text-muted m-r-5">Duration:</span>900
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme2"
                        role="progressbar"
                        style={{ width: "50%", height: "6px" }}
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}></Col>
          <Col md={6} xl={4}></Col>
          <Col md={6} xl={8} className="m-b-30">
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                {tabContent}
              </Tab>
              <Tab eventKey="week" title="This Week">
                {tabContent}
              </Tab>
              <Tab eventKey="all" title="All">
                {tabContent}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
