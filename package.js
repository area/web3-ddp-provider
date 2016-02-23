Package.describe({
  name: 'colony:web3-ddp-provider',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'A web3 provider that allows communication with a geth node hosted on the backend via DDP',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('web3-ddp-provider-client.js', ['client']);
  api.addFiles('web3-ddp-provider-server.js', ['server']);
  api.export("DdpProvider", 'client');

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('colony:web3-ddp-provider');
  api.addFiles('web3-ddp-provider-tests.js');
});
