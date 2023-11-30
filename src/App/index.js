import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";
import route from "../route";
import SignIn1 from "../MainScreen/Authentication/SignIn/SignIn1";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { CONFIG } from "../helpers/configFb";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MainContext } from "../core/MainContext";

const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

const auth = getAuth();
// const user = auth.currentUser;

class App extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
    };
  }

  async componentDidMount() {
    const context = this.context;
    // const dbData = collection(db, "wo-Estimation");
    // const woEstSnapShot = await getDocs(dbData);
    // const woEstimation = woEstSnapShot.docs.map((doc) => doc.data());

    onAuthStateChanged(auth, (user) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", user);
      if (user) {
        this.setState({ loggedIn: true });
        context.setUserSignedIn(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        this.setState({ loggedIn: false });
        context.setUserSignedIn(false);
        // User is signed out
        // ...
      }
    });
  }
  render() {
    const context = this.contex;
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      context,
      this.state.loggedIn
    );
    if (this.state.loggedIn === false && this.state.loggedIn !== null) {
      // if (context.userSignedIn === false && context.userSignedIn !== null) {
      return <SignIn1 />;
    } else {
      const menu = routes.map((route, index) => {
        return route.component ? (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={(props) => <route.component {...props} />}
          />
        ) : null;
      });
      return (
        <Aux>
          <ScrollToTop>
            <Suspense fallback={<Loader />}>
              <Switch>
                {menu}
                <Route path="/" component={AdminLayout} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Aux>
      );
    }
  }
}

export default App;
