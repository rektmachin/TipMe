const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

const web3 = new Web3('http://localhost:8545');  // Change to Base blockchain endpoint

const source = fs.readFileSync('./contracts/TipContract.sol', 'utf8');
const input = {
  language: 'Solidity',
  sources: {
    'TipContract.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const bytecode = output.contracts['TipContract.sol'].TipContract.evm.bytecode.object;
const abi = output.contracts['TipContract.sol'].TipContract.abi;

(async () => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi);

  const deployedContract = await contract.deploy({ data: '0x' + bytecode })
    .send({ from: accounts[0], gas: 1500000 });

  console.log('Contract deployed at address:', deployedContract.options.address);
})();
