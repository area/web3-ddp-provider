# Web3-ddp-provider

This is a meteor package to be used by Web3 to allow a user to have direct
interaction with the ethereum blockchain without having an instance of `geth`
locally. This is useful for allowing Dapps to be used in a normal browser.
The meteor server expects a `geth` node's RPC to be available at `localhost:8545`.

Note that this requires centralisation - i.e. the user has to trust the

It exports a global named MeteorProvider which can be given to web3. It only
allows certain  RPC calls:

* `eth_call`
* `eth_sendRawTransaction`
* `eth_getTransactionCount`
* `eth_gasPrice`
* `eth_getTransactionByHash`

This is done in the expectation that the user will be signing their
transactions locally and not require anything more - in particular, anything
to do with the accounts hosted on the `geth` node (though there shouldn't be
any). Because we still want users to be responsible for their keys, the other
notable blocked RPC call is `eth_sendTransaction` - i.e. users cannot send
transactions to be signed by the `geth` node.

The expectation is that the user will be using something like `hooked-
web3-provider` to sign their transactions locally. A modified version that
uses DdpProvider is available too.
