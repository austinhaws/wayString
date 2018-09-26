import PropTypes from "prop-types";
import React from "react";
import ReactRouterPropTypes from 'react-router-prop-types';
import _ from "lodash";
import {Button} from "dts-react-common";
import redirect from "../../Common/Redirect";

const propTypes = {
	account: PropTypes.object,
	history: ReactRouterPropTypes.history.isRequired,
};
const defaultProps = {
	account: undefined,
};

export default class AccountPanel extends React.Component {

	constructor(props) {
		super(props);

		this.visitNode = this.visitNode.bind(this);
	}

	visitNode(node) {
		redirect.node.detail(this.props.history, node.guid);
	}

	render() {
		return (this.props.account ? (
			<div className="account-panel">
				<div className="account-panel-row">Name: {this.props.account.phrase}</div>
				<div className="account-panel-row">Coins: {this.props.account.coins}</div>
				<div className="account-panel-row">
					Nodes:
					{
						_.castArray(this.props.account.nodes).map(node => (
							<div className="account-panel-node" key={node.location}>
								{node.location} Undeveloped <Button label="Visit" onClick={() => this.visitNode(node)}/>
							</div>
						))
					}
				</div>
			</div>
			) : null
		);
	}
}

AccountPanel.propTypes = propTypes;
AccountPanel.defaultProps = defaultProps;
