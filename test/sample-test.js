const { utils } = require("ethers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

let owner;
let user;
let walletIns;
let tokenIns;
let passKey;

describe("FCMarket Contract Test", function () {
  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    passKey = process.env.PASS_KEY;
  });
  it("Deploy OwnWawllet Contract", async function () {
    const OwnWalletContract = await ethers.getContractFactory("OwnWallet");
    walletIns = await OwnWalletContract.deploy();
    await walletIns.deployed();
    console.log("OwnWallet contract address: ", walletIns.address);
  });
  it("Deploy Own Wallet Role Contract", async function () {
    const TestTokenContract = await ethers.getContractFactory("TestToken");
    tokenIns = await TestTokenContract.deploy();
    await tokenIns.deployed();
    console.log("tUSDT contract address: ", tokenIns.address);
    const ownerBalance = await tokenIns.balanceOf(owner.address);
    expect(await tokenIns.totalSupply()).to.equal(ownerBalance);
    await tokenIns.transfer(walletIns.address, utils.parseEther("10000"));
    expect(await tokenIns.balanceOf(walletIns.address)).to.be.equal(
      utils.parseEther("10000")
    );
    await owner.sendTransaction({
      to: walletIns.address,
      value: ethers.utils.parseEther("10"),
    });
    const contractETHBalance = await ethers.provider.getBalance(
      walletIns.address
    );
    expect(contractETHBalance).to.be.equal(ethers.utils.parseEther("10"));
  });
  it("Withdraw token from OwnWallet", async function () {
    await expect(
      walletIns.sendToken(
        tokenIns.address,
        user.address,
        utils.parseEther("5000"),
        passKey
      )
    ).to.revertedWith("PASSKEY_REQUIRED");
    await walletIns.setPassKey(passKey);
    await expect(
      walletIns.sendToken(
        tokenIns.address,
        user.address,
        utils.parseEther("5000"),
        10000
      )
    ).to.revertedWith("PASSKEY_MATCH");
    await expect(walletIns.connect(user).setPassKey(passKey)).to.revertedWith(
      "ONLY_OWNER"
    );
    await walletIns.sendToken(
      tokenIns.address,
      user.address,
      utils.parseEther("5000"),
      passKey
    );
    expect(await tokenIns.balanceOf(walletIns.address)).to.be.equal(
      utils.parseEther("5000")
    );
    expect(await tokenIns.balanceOf(user.address)).to.be.equal(
      utils.parseEther("5000")
    );
    await walletIns.sendTokenAll(tokenIns.address, user.address, passKey);
    expect(await tokenIns.balanceOf(walletIns.address)).to.be.equal(0);
  });
  it("Withdraw token from OwnWallet by user", async () => {
    await expect(
      walletIns
        .connect(user)
        .sendToken(
          tokenIns.address,
          user.address,
          utils.parseEther("5000"),
          passKey
        )
    ).to.be.revertedWith("ONLY_OWNER");
    await expect(
      walletIns
        .connect(user)
        .sendTokenAll(tokenIns.address, user.address, passKey)
    ).to.be.revertedWith("ONLY_OWNER");
  });
  it("Withdraw ETH from OwnWallet", async () => {
    const userBeforeETHBalance = await ethers.provider.getBalance(user.address);
    console.log(userBeforeETHBalance);
    await walletIns.sendETH(user.address, passKey);
    const contractETHBalance = await ethers.provider.getBalance(
      walletIns.address
    );
    const userAfterETHBalance = await ethers.provider.getBalance(user.address);
    console.log(userAfterETHBalance);
    expect(contractETHBalance).to.be.equal(0);
  });
  it("Withdraw ETH from OwnWallet by user", async () => {
    await expect(
      walletIns.connect(user).sendETH(user.address, passKey)
    ).to.be.revertedWith("ONLY_OWNER");
  });
  it("Transfer owner", async () => {
    await walletIns.transferOwner(user.address);
    await tokenIns.transfer(walletIns.address, utils.parseEther("100"));
    await expect(
      walletIns.sendToken(
        tokenIns.address,
        user.address,
        utils.parseEther("100"),
        passKey
      )
    ).to.be.revertedWith("ONLY_OWNER");
    await walletIns
      .connect(user)
      .sendToken(
        tokenIns.address,
        user.address,
        utils.parseEther("100"),
        passKey
      );
  });
});
