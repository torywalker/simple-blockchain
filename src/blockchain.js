const SHA256 = require('crypto-js/sha256');
const Block = require('./block');

class Blockchain {
  constructor(config) {
    const { chain, difficulty = 4, genisis } = config || {};

    this.chain = chain || [this.createGenisisBlock(genisis)];
    this.difficulty = difficulty;
  }

  createGenisisBlock(genisis = 'I want to put a ding in the universe') {
    const hash = SHA256(genisis).toString();
    return new Block({
      timeStamp: new Date().getTime(),
      data: genisis,
      hash,
    });
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.setPreviousHash(this.getLastBlock().hash);
    newBlock.mine(this.difficulty);

    this.chain.push(newBlock);
  }

  isValid(chain = this.chain) {
    for (let i = 1; i < chain.length; i++) {
      const currBlock = chain[i];
      const prevBlock = chain[i - 1];
      const currBlockIsValid = (currBlock.hash === currBlock.calculateHash());
      const prevBlockIsValid = (currBlock.previousHash === prevBlock.hash);

      if (!currBlockIsValid || !prevBlockIsValid) return false;
    }

    return true;
  }

  static deserialize(chain) {
    if (typeof chain === 'string') {
      try {
        return JSON.parse(chain).map(c => new Block(c));
      } catch (e) {
        throw new Error(`Unable to deserialize chain. Error: ${e.message}`);
      }
    }

    return chain;
  }

  static load(serializedChain) {
    const chain = Blockchain.deserialize(serializedChain);

    if (Array.isArray(chain)) {
      const blockchain = new Blockchain({ chain });

      if (!blockchain.isValid()) {
        throw new Error('Invalid input: chain is not valid');
      }

      return blockchain;
    }

    throw new Error('Invalid input: chain must be an array.');
  }

  export() {
    return JSON.stringify(this.chain);
  }
}

module.exports = Blockchain;
