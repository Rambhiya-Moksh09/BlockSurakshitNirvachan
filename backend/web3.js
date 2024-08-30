import Web3 from "web3";
import dotenv from 'dotenv';

import Election from "../Solidity/build/contracts/Election.json" assert {type :'json'}

dotenv.config();
export const web3 = new Web3("http://localhost:7545");
//const provider = new Web3.providers.HttpProvider("http://localhost:7545");

const contractABI = Election.abi;
const contractAddress = process.env.Contract_Address; //Always changed the static address if truffle migrate --reset used
//console.log(contractAddress)
const ElectionContract = new web3.eth.Contract(contractABI,contractAddress)

export default ElectionContract;