import Home from "./components/Home";
import Counter from "./components/Counter";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import CallbackPage from "./components/CallbackPage";
import userManager from "./userManager";
import axios from "axios";
import UserInfo from "./components/UserInfo";
import Contact from "./components/Contact";
import Nav from "./components/Nav";

const Routes = props => {
  console.log(props);
  // wait for user to be loaded, and location is known
  if (props.isLoadingUser || !props.location) {
    return <div>Loading</div>;
  }
  // if location is callback page, return only CallbackPage route to allow signin process
  // IdentityServer 'bug' with hash history: if callback page contains a '#' params are appended with no delimiter
  // eg. /callbacktoken_id=...
  const url = props.location.pathname.substring(0, 9);
  if (url === "/callback") {
    const rest = props.location.pathname.substring(9);
    return <CallbackPage {...props} signInParams={`${url}#${rest}`} />;
  }

  // check if user is signed in
  userManager.getUser().then(user => {
    if (user && !user.expired) {
      // Set the authorization header for axios
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + user.access_token;
    }
  });

  const isConnected = !!props.user;

  return (
    <React.Fragment>
      <Nav isConnected={isConnected} path={props.location.pathname} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/user" component={UserInfo} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
    isLoadingUser: state.oidc.isLoadingUser,
    location: state.router.location
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
