import React from "react";
import { NavLink } from "react-router-dom";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { CONFIG } from "../../../helpers/configFb";
const app = initializeApp(CONFIG.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class SignIn1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      email: "",
      password: "",
    };
  }

  componentDidMount = () => {
    console.log("????????????????????????????????????????????? signin");
  };

  logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log({ res });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  onPressed = () => {
    const { email, password } = this.state;
    this.logInWithEmailAndPassword(email, password);
  };

  render() {
    return (
      <Aux>
        {/* <Breadcrumb/> */}
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </div>
                {/* <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div> */}
                <button
                  className="btn btn-primary shadow-2 mb-4"
                  onClick={() => {
                    this.onPressed();
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignIn1;
