angular.module('induction.config', [
]).constant('constants',
		{
	baseUrl: 'http://192.168.1.247:8080/induction/', //'http://115.248.248.92/posh/', // "http://115.248.248.92:8080/induction/", // http://115.248.248.92
	url:{
		auth:{
			url: 'api/auth',
			method: 'POST'
		}
	}
});
