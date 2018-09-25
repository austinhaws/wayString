import {AjaxStatusCore, WebserviceCore} from "dts-react-common";
import store from "../App/Store";

export const ajaxStatusCore = new AjaxStatusCore();
const webserviceCore = new WebserviceCore({
	baseUrl: globals.urlBase,
	ajaxStatusCore: ajaxStatusCore,
	allResultsCallback: response => response.data,
});

const webservice = {

	account: {
		new: () => webserviceCore.get('account/new'),
		get: phrase => webserviceCore.get(`account/get/${phrase}`),
	},


	node: {
		get: location => webserviceCore.get(`node/get/${location}`),
		claim: (parentGuid, nodeLR) => webserviceCore.post('node/claim', {
			parentGuid: parentGuid,
			nodeLR: nodeLR,
			accountGuid: store.getState().account.guid,
		}),
	},
};

export default webservice;
