const Block = require('./block');
const Blockchain = require('./blockchain');

// Create a new blockchain
const coin = new Blockchain();

// Add the first block to the chain
console.log('mining log 1');
coin.addBlock(new Block(1, '10/06/2017', { amount: 5 }));

// Add the second block to the chain
console.log('mining log 2');
coin.addBlock(new Block(2, '10/10/2017', { amount: 10 }));

// Validate that the chain is valid
const isValid = coin.isValid();
console.log(`Blockchain is: ${isValid ? 'VALID' : 'INVALID'}`);

// TODO: Export the chain