import PropTypes from "prop-types";
import React from "react";

const propTypes = {
	node: PropTypes.object.isRequired,
};
const defaultProps = {};

export default class NodeClaimed extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div className="node-detail-row">Location: {this.props.node.location}</div>
				{this.props.node.guid === '•' ? undefined: <div className="node-detail-row">Owner: {this.props.node.owner}</div>}
			</React.Fragment>
		);
	}
}

NodeClaimed.propTypes = propTypes;
NodeClaimed.defaultProps = defaultProps;
