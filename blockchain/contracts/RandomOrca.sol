// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomOrca is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    uint256 private _nextTokenId = 1;
    uint256 private constant MAX_IMAGES = 12;

    constructor()
        ERC721("Random Orca", "ORC")
        Ownable(msg.sender)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://ANYTHING/";
    }

    function safeMint()
        public
        onlyOwner
    {
        _safeMint(msg.sender, _nextTokenId);
        uint256 imageId = ((_nextTokenId - 1) % MAX_IMAGES) + 1; // Cyclic image reference
        _setTokenURI(_nextTokenId, Strings.toString(imageId)); // Set the token URI to reference the image
        _nextTokenId += 1;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        uint256 imageId = ((tokenId - 1) % MAX_IMAGES) + 1;
        return string.concat(_baseURI(), Strings.toString(imageId), ".json");
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
