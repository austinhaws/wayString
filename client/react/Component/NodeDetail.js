import PropTypes from "prop-types";
import React from "react";
import NodeClaimed from "./NodeClaimed";
import NodeUnclaimed from "./NodeUnclaimed";

const propTypes = {
	node: PropTypes.object,
};
const defaultProps = {
	node: undefined,
};

export default class NodeDetail extends React.Component {

	render() {
		return (
			<div className="node-detail">
				{this.props.node ? <NodeClaimed node={this.props.node}/> : <NodeUnclaimed node={this.props.node}/>}
			</div>
		);
	}
}

NodeDetail.propTypes = propTypes;
NodeDetail.defaultProps = defaultProps;
