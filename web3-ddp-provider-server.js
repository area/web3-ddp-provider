Meteor.methods({
	'web3DdpProviderExec': function(call) {
		if (['eth_call', 'eth_sendRawTransaction', 'eth_getTransactionCount', 'eth_gasPrice', 'eth_getTransactionByHash','eth_estimateGas','eth_getBalance'].indexOf(JSON.parse(call).method) === -1) {
			return new Error("This provider doesn't support that method")
		}

		return Meteor.http.call("POST", "http://localhost:8545", {
			content: call
		});
	}
});
