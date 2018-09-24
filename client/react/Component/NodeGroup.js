import PropTypes from "prop-types";
import React from "react";
import webservice from "../Common/Webservice";
import ReactRouterPropTypes from 'react-router-prop-types';

const propTypes = {
	node: PropTypes.string.isRequired,
	history: ReactRouterPropTypes.history.isRequired,
};
const defaultProps = {};

export default class NodeGroup extends React.Component {

	constructor(props) {
		super(props);
		this.fetchNodeDetail();
	}

	componentDidUpdate(prevProps) {
		if (this.props.node !== prevProps.node) {
			this.fetchNodeDetail();
		}
	}

	fetchNodeDetail() {
		webservice.node.get(this.props.node)
			.then(console.log);
	}

	render() {
		return (
			<div id="node-container">
				Location: {this.props.node}
			</div>
		);
	}
}

NodeGroup.propTypes = propTypes;
NodeGroup.defaultProps = defaultProps;
