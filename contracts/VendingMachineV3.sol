// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV3 is Initializable {
    // these state variables and their values
    // will be preserved forever, regardless of upgrading
    uint public numSodas;
    address public owner;
    mapping(address => bool) public isPurchased;

    function initialize(uint _numSodas) public initializer {
        numSodas = _numSodas;
        owner = msg.sender;
    }

    function purchaseSoda() public payable {
        require(numSodas > 0, "All soda are sold out.");
        require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
        numSodas--;
        isPurchased[msg.sender] = true;
    }

    function ispurchasedOrNot(address user) public view returns (bool) {
        return isPurchased[user];
    }

    function withdrawProfits() public onlyOwner {
        require(
            address(this).balance > 0,
            "Profits must be greater than 0 in order to withdraw!"
        );
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Failed to send ether");
    }

    function setNewOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }
}
