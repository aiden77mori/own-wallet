// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OwnWallet {
    using SafeERC20 for IERC20;

    address private owner;
    uint256 private passKey;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    fallback() external payable {}

    function sendToken(
        address _token,
        address _to,
        uint256 _amount,
        uint256 _key
    ) public onlyOwner {
        IERC20 token = IERC20(_token);

        require(passKey > 0, "PASSKEY_REQUIRED");
        require(passKey == _key, "PASSKEY_MATCH");
        require(token.balanceOf(address(this)) >= _amount, "AMOUNT_EXCEED");

        SafeERC20.safeTransfer(token, _to, _amount);
    }

    function sendTokenAll(
        address _token,
        address _to,
        uint256 _key
    ) public onlyOwner {
        require(passKey > 0, "PASSKEY_REQUIRED");
        require(passKey == _key, "PASSKEY_MATCH");

        IERC20 token = IERC20(_token);

        uint256 allAmount = token.balanceOf(address(this));
        SafeERC20.safeTransfer(token, _to, allAmount);
    }

    function sendETH(address _to, uint256 _key) public onlyOwner {
        require(passKey > 0, "PASSKEY_REQUIRED");
        require(passKey == _key, "PASSKEY_MATCH");

        payable(_to).transfer(address(this).balance);
    }

    function setPassKey(uint256 _key) public onlyOwner {
        passKey = _key;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }

    function transferOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
}
