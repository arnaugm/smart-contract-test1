require('dotenv').config();
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

const contract = require('../artifacts/contracts/Test1.sol/Test1.json');

const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;
const contractAddress = '0x094323315830396042A38B82daB8d783A0De928f';

const web3 = createAlchemyWeb3(API_URL);
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce

  // the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
        if (!err) {
          console.log(
            'The hash of your transaction is: ',
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!",
          );
        } else {
          console.log(
            'Something went wrong when submitting your transaction:',
            err,
          );
        }
      });
    })
    .catch((err) => {
      console.log(' Promise failed:', err);
    });
}

mintNFT(
  'https://gateway.pinata.cloud/ipfs/QmbM9HRnfw1r4yXLMtEnAnEyhSRVMe1AFqSgqZJLHonTYW',
);
