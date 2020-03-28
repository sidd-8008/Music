import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./core/Landing";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import UserDashboard from "./user/UserDashboard";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
				{/* <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} /> */}
			</Switch>
		</BrowserRouter>
	);
};

export default App;
