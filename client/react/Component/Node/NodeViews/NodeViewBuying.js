import PropTypes from "prop-types";
import React from "react";
import {Button} from "dts-react-common";
import ReactRouterPropTypes from 'react-router-prop-types';
import Buyables from '../../../Common/Enums/Buyables';

const propTypes = {
	node: PropTypes.object.isRequired,
	history: ReactRouterPropTypes.history.isRequired,
};

const defaultProps = {};

export default class NodeViewBuying extends React.Component {
	constructor(props) {
		super(props);

		this.buy = this.buy.bind(this);
	}

	buy(buyable) {
		console.log(`Buy me a ${buyable}`);
	}

	render() {
		return (
			<div>
				<div>Farm <Button label="Buy" onClick={() => this.buy(Buyables.FARM)}/></div>
			</div>
		);
	}
}

NodeViewBuying.propTypes = propTypes;
NodeViewBuying.defaultProps = defaultProps;
