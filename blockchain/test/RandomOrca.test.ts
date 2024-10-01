import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Random Orca Tests", function () {

  async function deployFixture() {
    const RandomOrcaFactory = await hre.ethers.getContractFactory("RandomOrca");
    const RandomOrcaInstance = await RandomOrcaFactory.deploy();

    await RandomOrcaInstance.waitForDeployment();

    const RandomOrcaContractAddress:string = await RandomOrcaInstance.getAddress();

    const signers = await hre.ethers.getSigners();

    return {signers, RandomOrcaInstance, RandomOrcaContractAddress};
  }

  it("should", async () => {
    const {signers, RandomOrcaInstance, RandomOrcaContractAddress} = await loadFixture(deployFixture);

    
  });
});
