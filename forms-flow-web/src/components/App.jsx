import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import SideBar from "../containers/SideBar";

import NavBar from "../containers/NavBar";
import Footer from "../components/Footer";
// import TopNav from "../containers/TopNav";
import "../assets/styles/layouts.scss";
require("typeface-nunito-sans");

class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <div>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <NavBar />
            {/* <TopNav /> */}
            <div className="wrapper">
              <SideBar store={store} />

              <div className="container-fluid content">
                <Switch>
                  {/* <Route path="/public"><PublicRoute store={store}/></Route> */}
                  <Route path="/">
                    <PrivateRoute store={store} />
                  </Route>
                </Switch>
                <Footer />
              </div>
            </div>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.any.isRequired,
  store: PropTypes.any.isRequired,
};

export default App;
