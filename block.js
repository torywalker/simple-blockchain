const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timeStamp, data, previousHash = '') {
    this.data = data;
    this.hash = '';
    this.index = index;
    this.nonce = 0;
    this.previousHash = previousHash;
    this.timeStamp = Date.parse(timeStamp);
  }

  calculateHash() {
    return SHA256(
      this.index
        + this.previousHash
        + this.timeStamp
        + this.nonce
        + JSON.stringify(this.data)).toString();
  }

  mine(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }

  setPreviousHash(previousHash = '') {
    this.previousHash = previousHash;
  }
};

module.exports = Block;