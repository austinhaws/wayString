import PropTypes from "prop-types";
import React from "react";
import {Button} from "dts-react-common";

const propTypes = {
	node: PropTypes.object,
};
const defaultProps = {
	node: undefined,
};

export default class NodeUnclaimed extends React.Component {

	render() {
		return (
			<React.Fragment>
				<Button label="Claim" onClick={console.log}/>
			</React.Fragment>
		);
	}
}

NodeUnclaimed.propTypes = propTypes;
NodeUnclaimed.defaultProps = defaultProps;
