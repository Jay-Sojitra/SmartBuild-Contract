const { ethers, upgrades } = require('hardhat');

async function main() {
  const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
  await proxy.deployed();

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxy.address
  );

  console.log('Proxy contract address: ' + proxy.address);
  // 0x872BeFAb7b77462882ae971F6236eF5cc89aDcC8
  // 0x213b44aC517b574Ead841AA5F9C93d2d07046982
  console.log('Implementation contract address: ' + implementationAddress);
  //0x724B1229897603A127724E04b29145ed9aA75Da5
  //0x724B1229897603A127724E04b29145ed9aA75Da5
  //0xC2edE166904eC0c41214c9fEc0748929261B76B7
}

main();
