// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  let owner;

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  [owner] = await hre.ethers.getSigners();

  const OwnWalletContract = await hre.ethers.getContractFactory("OwnWallet");
  const ownWalletIns = await OwnWalletContract.deploy();
  await ownWalletIns.deployed();
  console.log("OwnWallet contract address: ", ownWalletIns.address);
  await ownWalletIns.setPassKey(process.env.PASS_KEY);
  await ownWalletIns.transferOwner(); // new wallet
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
