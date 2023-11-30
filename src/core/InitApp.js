import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { CONFIG } from "../helpers/configFb";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getAllDispatchers,
  getAllManagers,
  getAllTeamLeaders,
  getUser,
} from "../helpers/fireStoreMain";
import { MainContext } from "../core/MainContext";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

export class InitApp extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> app init"
    );

    this.handleUser();
  };

  handleUser = async () => {
    const context = this.context;
    const auth = await getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;", user);
      if (user) {
        context.setUserSignedIn(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        getUser(uid).then((resp) => {
          console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;????????????", resp);

          if (resp != undefined && resp != null) {
            context.setCurrentUser(resp);
            if (
              resp.selectedtype === "Admin" ||
              resp.selectedtype === "Manager" ||
              resp.selectedtype === "Team leader"
            ) {
              console.log("++++++++++++++", uid);
              getAllDispatchers().then((resp) => {
                context.setDispatchersList(resp);
              });
              if (
                resp.selectedtype === "Admin" ||
                resp.selectedtype === "Manager"
              ) {
                getAllTeamLeaders().then((resp) => {
                  context.setTeamLeadersList(resp);
                });

                if (resp.selectedtype === "Admin") {
                  getAllManagers().then((resp) => {
                    context.setManagersList(resp);
                  });
                }
              }
            }
          } else {
            console.log("invalid user");
            context.setCurrentUser(null);
            // auth.signOut();
          }
        });
        // ...
      } else {
        context.setUserSignedIn(false);
        // User is signed out
        // ...
      }
    });
  };

  render() {
    return <div />;
  }
}

export default InitApp;
