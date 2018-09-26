import PropTypes from "prop-types";
import React from "react";
import {Button} from "dts-react-common";
import ReactRouterPropTypes from 'react-router-prop-types';
import redirect from '../../Common/Redirect';
import NodeViewSummary from "./NodeViews/NodeViewSummary";
import NodeViewBuying from "./NodeViews/NodeViewBuying";
import store from "../../App/Store";

const propTypes = {
	node: PropTypes.object.isRequired,
	history: ReactRouterPropTypes.history.isRequired,
};

const defaultProps = {};

const viewStates = {
	SUMMARY: 'summary',
	BUYING: 'buying',
};

export default class NodeClaimed extends React.Component {

	constructor(props) {
		super(props);
		this.visitNode = this.visitNode.bind(this);
		this.toggleViewState = this.toggleViewState.bind(this);

		this.state = {
			viewState: viewStates.SUMMARY,
		};
	}

	visitNode() {
		redirect.node.detail(this.props.history, this.props.node.guid);
	}

	toggleViewState() {
		let newState;
		switch (this.state.viewState) {
			case viewStates.SUMMARY:
				newState = viewStates.BUYING;
				break;
			case viewStates.BUYING:
			default:
				newState = viewStates.SUMMARY;
				break;
		}
		this.setState({viewState: newState});
	}

	render() {
		let output;
		let buttonLabel;

		switch (this.state.viewState) {
			case viewStates.SUMMARY:
				output = <NodeViewSummary {...this.props}/>;
				buttonLabel = 'Upgrade';
				break;
			case viewStates.BUYING:
				output = <NodeViewBuying {...this.props}/>;
				buttonLabel = 'Cancel';
				break;
			default:
				buttonLabel = 'Big Error';
				output = 'Error';
				break;
		}
		return (
			<div>
				{output}
				<div>
					{(store.getState().account && this.props.node.phrase === store.getState().account.phrase) ? <Button label={buttonLabel} onClick={this.toggleViewState}/> : undefined}
				</div>
			</div>
		);
	}
}

NodeClaimed.propTypes = propTypes;
NodeClaimed.defaultProps = defaultProps;
