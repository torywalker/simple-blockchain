const Block = require('./block');
const SHA256 = require('crypto-js/sha256');

class Blockchain {
  constructor(difficulty = 4) {
    this.chain = [this.createGenisisBlock()];
    this.difficulty = difficulty;
  }

  createGenisisBlock() {
    const genisisMessage = 'I want to put a ding in the universe';
    const genisisHash = SHA256(genisisMessage);
    return new Block(0, new Date().getTime(), genisisMessage, genisisHash);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.setPreviousHash(this.getLastBlock().hash)
    newBlock.mine(this.difficulty);

    this.chain.push(newBlock);
  }

  isValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currBlock = this.chain[i];
      const prevBlock = this.chain[i -1];
      const currBlockIsValid = (currBlock.hash === currBlock.calculateHash());
      const prevBlockIsValid = (currBlock.previousHash === prevBlock.hash);

      if (!currBlockIsValid || !prevBlockIsValid) return false;
    }

    return true;
  }

  // TODO: add import / export feature
};

module.exports = Blockchain;
