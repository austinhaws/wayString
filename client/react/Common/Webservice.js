import {AjaxStatusCore, WebserviceCore} from "dts-react-common";

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
		get: location => webserviceCore.get(`node/${location}`),
	},
};

export default webservice;
