import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import store from "redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "styles/index.css";
import "primeflex/primeflex.css";

import App from "app/App";
import Login from "features/user/Login";
import { Provider } from "react-redux";
import PrivateRoute from "components/PrivateRoute";
import CustomMessageBox from "components/CustomMessageBox";
import CustomConfirmBox from "components/CustomConfirmBox";
import { FORGOT_PASSWORD, RESET_PASSWORD } from "constants/appPath";
import ForgotPasswordEmail from "features/user/ForgotPassword";
import RestPassword from "features/user/RestPassword";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<CustomMessageBox />
			<CustomConfirmBox />
			<Router>
				<Switch>
					<Route path="/login" component={Login} exact={true} />{" "}
					<Route
						path={FORGOT_PASSWORD}
						component={ForgotPasswordEmail}
						exact={true}
					/>
					<Route
						path={RESET_PASSWORD}
						component={RestPassword}
						exact={true}
					/>
					<PrivateRoute path="/" component={App} exact={false} />{" "}
				</Switch>{" "}
			</Router>{" "}
		</Provider>{" "}
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
