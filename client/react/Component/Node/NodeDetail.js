import PropTypes from "prop-types";
import React from "react";
import NodeClaimed from "./NodeClaimed";
import NodeUnclaimed from "./NodeUnclaimed";
import ReactRouterPropTypes from 'react-router-prop-types';

const propTypes = {
	node: PropTypes.object,
	parentNode: PropTypes.object,
	history: ReactRouterPropTypes.history.isRequired,
	leftRight: PropTypes.oneOf(['L', 'R']),
};
const defaultProps = {
	node: undefined,
	parentNode: undefined,
	leftRight: undefined,
};

export default class NodeDetail extends React.Component {

	render() {
		return (
			<div className="node-detail">
				{
					this.props.node ?
						<NodeClaimed node={this.props.node} history={this.props.history}/> :
						<NodeUnclaimed
							node={this.props.node}
							parentNode={this.props.parentNode}
							history={this.props.history}
							leftRight={this.props.leftRight}
						/>
				}
			</div>
		);
	}
}

NodeDetail.propTypes = propTypes;
NodeDetail.defaultProps = defaultProps;
