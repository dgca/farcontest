import hre from "hardhat";

import { updateContractAddresses } from "../lib/update-contract-addresses";

async function deployFarContest() {
  const [deployerClient] = await hre.viem.getWalletClients();
  const farContest = await hre.viem.deployContract("FarContest", [
    deployerClient.account.address,
  ]);
  console.log(`FarContest deployed to ${farContest.address}`);
  return farContest;
}

async function main() {
  const farContest = await deployFarContest();

  if (hre.network.name === "localhost") {
    updateContractAddresses("localhost", {
      FarContest: farContest.address,
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
