import React, { useState } from 'react';
import Web3 from 'web3';

const App = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const sendTip = async () => {
    if (!window.ethereum) return alert('MetaMask not found!');

    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const tipAmount = web3.utils.toWei(amount, 'ether');

    const tipContract = new web3.eth.Contract([
      {
        "constant": false,
        "inputs": [{ "name": "recipient", "type": "address" }],
        "name": "sendTip",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      }
    ], 'YOUR_CONTRACT_ADDRESS_HERE');

    await tipContract.methods.sendTip(recipient).send({
      from: accounts[0],
      value: tipAmount
    });
  };

  return (
    <div>
      <h2>Send a Tip</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTip}>Send Tip</button>
    </div>
  );
};

export default App;
