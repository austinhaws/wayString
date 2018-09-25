import PropTypes from "prop-types";
import React from "react";
import {Button} from "dts-react-common";
import webservice from "../Common/Webservice";
import redirect from "../Common/Redirect";
import ReactRouterPropTypes from 'react-router-prop-types';
import {dispatchFieldChanged} from "../App/Reducers";

const propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	node: PropTypes.object,
	parentNode: PropTypes.object.isRequired,
	leftRight: PropTypes.oneOf(['L', 'R']).isRequired,
};
const defaultProps = {
	node: undefined,
};

export default class NodeUnclaimed extends React.Component {

	constructor(props) {
		super(props);
		this.claimNode = this.claimNode.bind(this);
	}

	claimNode() {
		webservice.node.claim(this.props.parentNode.guid, this.props.leftRight)
			.then(data => {
				dispatchFieldChanged(undefined, 'account', data.account);
				redirect.node.detail(this.props.history, data.node.guid);
			});
	}

	render() {
		return <Button label="Claim" onClick={this.claimNode}/>;
	}
}

NodeUnclaimed.propTypes = propTypes;
NodeUnclaimed.defaultProps = defaultProps;
