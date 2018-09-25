import PropTypes from "prop-types";
import React from "react";
import webservice from "../Common/Webservice";
import ReactRouterPropTypes from 'react-router-prop-types';
import {dispatchFieldChanged} from "../App/Reducers";
import NodeDetail from "./NodeDetail";

const propTypes = {
	node: PropTypes.string.isRequired,
	history: ReactRouterPropTypes.history.isRequired,
	nodeGroup: PropTypes.shape({
		node: PropTypes.object,
		left: PropTypes.object,
		right: PropTypes.object,
		parent: PropTypes.object,
	}),
};
const defaultProps = {
	nodeGroup: undefined,
};

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
		webservice.node.get(this.props.node).then(node => dispatchFieldChanged(undefined, 'nodeGroup', node));
	}

	render() {
		return this.props.nodeGroup.node ? (
			<div id="node-container">
				<div className="node-group-row">
					<div className="left-choice"><NodeDetail node={this.props.nodeGroup.left}/></div>
					<div className="right-choice"><NodeDetail node={this.props.nodeGroup.right}/></div>
				</div>

				<div className="node-group-row">
					<div className="main-node"><NodeDetail node={this.props.nodeGroup.node}/></div>
				</div>

				{
					this.props.nodeGroup.parent ?
						(<div className="node-group-row">
							{this.props.nodeGroup.node.location.substring(-1) === 'R' ? undefined : <div></div>}
							<div className="parent-node"><NodeDetail node={this.props.nodeGroup.parent}/></div>
							{this.props.nodeGroup.node.location.substring(-1) === 'L' ? undefined : <div></div>}
						</div>) : undefined
				}
			</div>
			) : null
		;
	}
}

NodeGroup.propTypes = propTypes;
NodeGroup.defaultProps = defaultProps;
