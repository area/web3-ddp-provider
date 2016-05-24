Meteor.methods({
    'web3DdpProviderExec': function(call) {

        if ([
                'eth_call',
                'eth_sendRawTransaction',
                'eth_newPendingTransactionFilter',
                'eth_newBlockFilter',
                'eth_newFilter',
                'eth_uninstallFilter',
                'eth_getFilterChanges',
                'eth_getFilterLogs',
                'eth_getLogs',
                'eth_getTransactionCount',
                'eth_gasPrice',
                'eth_getTransactionByHash',
                'eth_estimateGas',
                'eth_getBalance'
            ].indexOf(JSON.parse(call).method) === -1) {
            return new Error("This provider doesn't support that method")
        }

        let gethAddress = '127.0.0.1';
        if (process.env.GETH_ADDRESS) {
            gethAddress = process.env.GETH_ADDRESS;
        }
        let gethPort = '8545';
        if (process.env.GETH_PORT) {
            gethPort = process.env.GETH_PORT;
        }

        return Meteor.http.call("POST", "http://" + gethAddress + ":" + gethPort, {
            content: call
        });
    }
});
