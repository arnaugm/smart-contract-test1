async function main() {
  const Test1 = await ethers.getContractFactory('Test1');

  // Start deployment, returning a promise that resolves to a contract object
  const test1 = await Test1.deploy();
  await test1.deployed();
  console.log('Contract deployed to address:', test1.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
