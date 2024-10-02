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

  it("should get token URI", async () => {
    const {signers, RandomOrcaInstance, RandomOrcaContractAddress} = await loadFixture(deployFixture);

    const instanceOne = RandomOrcaInstance.connect(signers[1]);

    await instanceOne.safeMint("Danilo", "nananananana");

    const tokenURI = await RandomOrcaInstance.tokenURI(1);

    expect(tokenURI).to.equal("https://coffee-holy-toucan-222.mypinata.cloud/ipfs/QmQqS7grnEoeWiVvv2HgDvDVs7KXzD3eoVJbRw62TDyymY/1.json");
    
  });

  it("should safe mint NFTs", async () => {
    const {signers, RandomOrcaInstance, RandomOrcaContractAddress} = await loadFixture(deployFixture);

    const instanceOne = RandomOrcaInstance.connect(signers[1]);
    const instanceTwo = RandomOrcaInstance.connect(signers[2]);
    const instanceThree = RandomOrcaInstance.connect(signers[3]);

    await instanceOne.safeMint("Danilo", "nananananana");

    await instanceOne.safeMint("Danilo", "babababababa");

    await instanceTwo.safeMint("Marilia", "Hello, it is me!");
    await instanceTwo.safeMint("Marilia", "Good job!");

    await instanceThree.safeMint("Mateus", "Great work!");


    await instanceOne.safeMint("Danilo", "nemnemnemnem");

    await instanceOne.safeMint("Danilo", "papapapapapapap");

    const balanceOfOne = await RandomOrcaInstance.balanceOf(signers[1]);

    const balanceOfTwo = await RandomOrcaInstance.balanceOf(signers[2]);

    const balanceOfThree = await RandomOrcaInstance.balanceOf(signers[3]);

    const allMessages = await RandomOrcaInstance.getMessages();

    expect(balanceOfOne).to.equal(4);
    expect(balanceOfTwo).to.equal(2);
    expect(balanceOfThree).to.equal(1);
    
    expect(allMessages.length).to.equal(7);
    
  });

  it("should not safe mint NFTs (empty messages)", async () => {
    const {signers, RandomOrcaInstance, RandomOrcaContractAddress} = await loadFixture(deployFixture);

    const instanceOne = RandomOrcaInstance.connect(signers[1]);

    await expect(instanceOne.safeMint("Danilo", "")).to.be.revertedWith("Empty messages are not allowed");
    
  });


  it("should burn NFTs", async () => {
    const {signers, RandomOrcaInstance, RandomOrcaContractAddress} = await loadFixture(deployFixture);

    const instanceOne = RandomOrcaInstance.connect(signers[1]);
    const instanceTwo = RandomOrcaInstance.connect(signers[2]);
    const instanceThree = RandomOrcaInstance.connect(signers[3]);

    await instanceOne.safeMint("Danilo", "nananananana");

    await instanceOne.safeMint("Danilo", "babababababa");

    await instanceTwo.safeMint("Marilia", "Hello, it is me!");
    await instanceTwo.safeMint("Marilia", "Good job!");

    await instanceThree.safeMint("Bad Person", "Unappropriate message");

    await instanceOne.safeMint("Danilo", "nemnemnemnem");

    await instanceOne.safeMint("Danilo", "papapapapapapap");

    
    await RandomOrcaInstance.burn(5);

    const balanceOfBadPerson = await RandomOrcaInstance.balanceOf(signers[3]);

    expect(balanceOfBadPerson).to.equal(0);


    const allMessages = await RandomOrcaInstance.getMessages();


    expect(allMessages.length).to.equal(6);
    
  });


  it("should NOT burn NFTs (not owner)", async () => {
    const {signers, RandomOrcaInstance, RandomOrcaContractAddress} = await loadFixture(deployFixture);

    const instanceOne = RandomOrcaInstance.connect(signers[1]);
    const instanceTwo = RandomOrcaInstance.connect(signers[2]);
    const instanceThree = RandomOrcaInstance.connect(signers[3]);

    await instanceOne.safeMint("Danilo", "nananananana");

    await instanceOne.safeMint("Danilo", "babababababa");

    await instanceTwo.safeMint("Marilia", "Hello, it is me!");
    await instanceTwo.safeMint("Marilia", "Good job!");

    await instanceThree.safeMint("Mateus", "Great work!");

    await instanceOne.safeMint("Danilo", "nemnemnemnem");

    await instanceOne.safeMint("Danilo", "papapapapapapap");

    
    await expect(instanceOne.burn(5)).to.be.revertedWithCustomError(RandomOrcaInstance, "OwnableUnauthorizedAccount");

    
    
  });


});
