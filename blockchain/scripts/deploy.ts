import hre from "hardhat";
import {saveDeployment} from "deployment-history";

async function main() {
    const networkName:string = (await hre.ethers.provider.getNetwork()).name;
    const RandomOrcaFactory = await hre.ethers.getContractFactory("RandomOrca");
    const RandomOrcaInstance = await RandomOrcaFactory.deploy();

    await RandomOrcaInstance.waitForDeployment();

    const RandomOrcaContractAddress:string = await RandomOrcaInstance.getAddress();

    saveDeployment({contractAddress:RandomOrcaContractAddress,contractName:"Random Orca", network:networkName});

    console.log(`Random Orca Contract Address = ${RandomOrcaContractAddress}\nNetwork = ${networkName}`);
}

main().catch((err)=>{
    console.error(err);
    process.exitCode = 1;
});