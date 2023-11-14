// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20, Ownable {
    uint constant _tokenSupply = 1_500_000_000 * (10 ** 18);

    event Mint(address _to, uint256 _amount);

    constructor() ERC20("TestToken", "tUSDT") {
        _mint(msg.sender, _tokenSupply);

        emit Mint(msg.sender, _tokenSupply);
    }
}
