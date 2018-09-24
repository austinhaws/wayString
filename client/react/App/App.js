import PropTypes from "prop-types";
import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Redirect, withRouter} from "react-router";
import webservice, {ajaxStatusCore} from "../Common/Webservice";
import {dispatchFieldChanged} from "./Reducers";
import NodeGroup from "../Component/NodeGroup";

const propTypes = {
	account: PropTypes.object,
};
const defaultProps = {
	account: undefined,
};

class AppClass extends React.Component {

	constructor(props) {
		super(props);

		// get current account guid from localstorage
		const accountGuid = localStorage.getItem('accountPhrase');

		// if not found, then create new account
		webservice.account[accountGuid ? 'get' : 'new'](accountGuid)
			.then(account => {
				// store accountGuid in localstorage
				localStorage.setItem('accountPhrase', account.phrase);

				// dispatch set account information
				dispatchFieldChanged(undefined, 'account', account);
			});
	}

	render() {
		return (
			<div id="app-container">
				<div id="top-title-container">
					<div id="top-title">Way String</div>
					<div id="right-account">
						Your Id: {this.props.account ? this.props.account.phrase : 'Loading...'} <button>Login to Save</button>
					</div>
				</div>
				<div id="main-container">
					{(ajaxStatusCore.isAjaxing() && (!this.props.characters.length || !this.props.bodies.length || !this.props.files.length)) ? <div>Loading...</div> :
						<Switch>
							<Route path="/node/:node" render={router => <NodeGroup node={router.match.params.node} {...this.props}/>}/>
							<Route render={() => <Redirect to="/node/•"/>}/>
						</Switch>
					}
				</div>
				<div id="credit-footer"></div>
			</div>
		);
	}
}

AppClass.propTypes = propTypes;
AppClass.defaultProps = defaultProps;

const App = withRouter(connect(state => state)(AppClass));

render(<BrowserRouter basename="/waystring/client"><Provider store={store}><App/></Provider></BrowserRouter>, document.getElementById('react'));
