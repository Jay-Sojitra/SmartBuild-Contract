const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0x213b44aC517b574Ead841AA5F9C93d2d07046982';

async function main() {
  // const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
  // const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);
  const VendingMachineV4 = await ethers.getContractFactory('VendingMachineV4');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV4);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  console.log('upgraded', await upgraded);
  console.log("The current contract owner is: " + await upgraded.owner());
  console.log('Implementation contract address: ' + implementationAddress);
}

main();
