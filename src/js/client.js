import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Layout from "./components/Layout";
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

//require("../css/style.scss");

class App extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Layout}>
					<Route path="userList" name="userList" component={UserList}></Route>
					<Route path="userDetail(/:id)" name="userDetail" component={UserDetail}></Route>
				</Route>
			</Router>
		);
	}
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
