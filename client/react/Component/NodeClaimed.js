import PropTypes from "prop-types";
import React from "react";
import {Button} from "dts-react-common";
import ReactRouterPropTypes from 'react-router-prop-types';
import redirect from '../Common/Redirect';

const propTypes = {
	node: PropTypes.object.isRequired,
	history: ReactRouterPropTypes.history.isRequired,
};

const defaultProps = {};

export default class NodeClaimed extends React.Component {

	constructor(props) {
		super(props);
		this.visitNode = this.visitNode.bind(this);
	}

	visitNode() {
		redirect.node.detail(this.props.history, this.props.node.guid);
	}

	render() {
		const rows = [
			<React.Fragment>Location: {this.props.node.location}</React.Fragment>,
			this.props.node.guid === '•' ? undefined: <div className="node-detail-row">Owner: {this.props.node.phrase}</div>,
			<Button label="Visit" onClick={this.visitNode}/>,
		];
		return (
			<React.Fragment>
				{rows.map((row, i) => <div className="node-detail-row" key={i}>{row}</div>)}
			</React.Fragment>
		);
	}
}

NodeClaimed.propTypes = propTypes;
NodeClaimed.defaultProps = defaultProps;
