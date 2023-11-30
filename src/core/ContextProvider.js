import React, { PureComponent } from "react";
import { MainContext } from "./MainContext";

class MyProvider extends PureComponent {
  state = {
    currentUser: null,
    dispatchersList: [],
    teamLeadersList: [],
    managersList: [],
    userSignedIn: false,
  };

  componentDidMount = () => {};

  setCurrentUser = (data) => {
    console.log("setCurrentUser", data);
    this.setState({ currentUser: data });
  };
  setDispatchersList = (data) => {
    this.setState({ dispatchersList: data });
  };
  setTeamLeadersList = (data) => {
    this.setState({ teamLeadersList: data });
  };
  setManagersList = (data) => {
    this.setState({ managersList: data });
  };
  setUserSignedIn = (data) => {
    this.setState({ userSignedIn: data });
  };

  render() {
    return (
      <MainContext.Provider
        value={{
          currentUser: this.state.currentUser,
          dispatchersList: this.state.dispatchersList,
          teamLeadersList: this.state.teamLeadersList,
          managersList: this.state.managersList,
          userSignedIn: this.state.userSignedIn,
          setCurrentUser: this.setCurrentUser,
          setDispatchersList: this.setDispatchersList,
          setTeamLeadersList: this.setTeamLeadersList,
          setManagersList: this.setManagersList,
          setUserSignedIn: this.setUserSignedIn,
        }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

export default MyProvider;
