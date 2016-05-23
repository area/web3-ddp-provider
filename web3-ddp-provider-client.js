DdpProvider = function() {};


DdpProvider.prototype.sendAsync = function(payload, callback) {

    //We only whitelist some methods
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
        ].indexOf(payload.method) === -1) {
        return callback(new Error("This provider doesn't support that method"))
    }


    Meteor.call('web3DdpProviderExec', JSON.stringify(payload), function(err, res) {
        var error, result;
        try {
            result = JSON.parse(res.content);
        } catch (e) {
            error = new Error();
        }
        callback(error, result);
    });
}
