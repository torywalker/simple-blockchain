# Simple Blockchain

A basic Javascript blockchain implementation to serve as an example for how blockchains can be created, validated, exported, and loaded.

# Example Use

```javascript
const { Block, Blockchain } = require('simple-blockchain');

// Create a new blockchain
const chain = new Blockchain();

// Add the first block to the chain
console.log('Mining Block 1...');
chain.addBlock(new Block(1, '10/06/2017', { amount: 5 }));

// Add the second block to the chain
console.log('Mining Block 2...');
chain.addBlock(new Block(2, '10/10/2017', { amount: 10 }));

// Validate that the chain is valid
console.log(`Blockchain is: ${chain.isValid() ? 'VALID' : 'INVALID'}`);

// Export the chain
const exportedChain = chain.export();

// Load the chain
const importedChain = Blockchain.load(exportedChain);
console.log(`Imported Blockchain is: ${importedChain.isValid() ? 'VALID' : 'INVALID'}`);
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for code of conduct details, and the process for submitting pull requests.

## License

This project is licensed under the GNU 3 License - see the [LICENSE](LICENSE) file for details