import {createStore} from "redux";
import reducers from "./Reducers.js";

const store = createStore((state, action) => {
		// === reducers ===
		let reducer = false;

		// is reducer valid?
		if (action.type in reducers) {
			reducer = reducers[action.type];
		}

		// ignore redux/react "system" reducers
		if (!reducer && action.type.indexOf('@@') !== 0) {
			console.error('unknown reducer action:', action.type, action)
		}

		// DO IT!
		return reducer ? reducer(state, action) : state;
	}, {
		// === default data ===
		account: undefined,
		nodeGroup: {},
	}
    // for chrome redux plugin
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);
export default store;
