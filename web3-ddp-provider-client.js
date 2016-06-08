DdpProvider = function() {};
DdpProvider.prototype.isConnected = function() {
  return new Promise(function(resolve, reject) {
    try {

      this.sendAsync({
          id: 9999999999,
          jsonrpc: '2.0',
          method: 'net_listening',
          params: []
      }, processResult);

      function processResult (error, result) {
        if(error) return reject(error, false);
        return resolve(true);
      }

    } catch(err) {
      return reject(err, false);
    }
  });
};

DdpProvider.prototype.sendAsync = function(payload, callback) {
    //We only whitelist some methods
    var checkIfMethodIsAllowed = function(payload) {
      if ([
            'eth_call',
            'eth_sendRawTransaction',
            'eth_newPendingTransactionFilter',
            'eth_newBlockFilter',
            'eth_newFilter',
            'eth_uninstallFilter',
            'eth_getFilterChanges',
            'eth_getFilterLogs',
            'eth_getTransactionReceipt',
            'eth_getLogs',
            'eth_getTransactionCount',
            'eth_gasPrice',
            'eth_getTransactionByHash',
            'eth_estimateGas',
            'eth_getBalance'
        ].indexOf(payload.method) === -1) {
        throw new Error("This provider doesn't support that method");
      }
    };

    try {

      if(payload instanceof Array) {
        payload.map(checkIfMethodIsAllowed);
      } else {
        checkIfMethodIsAllowed(payload);
      }

      Meteor.call('web3DdpProviderExec', JSON.stringify(payload), function(err, res) {
        var error, result;
        try {
            result = JSON.parse(res.content);
            console.log('result: ', result);
        } catch (e) {
            error = e;
        }

        callback(error, result);
      });

    } catch (error) {
      return callback(error);
    }
}
