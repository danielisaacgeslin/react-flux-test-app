import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

//require("../css/style.scss");

class App extends React.Component {
	render() {
		return (
			<Layout />
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
