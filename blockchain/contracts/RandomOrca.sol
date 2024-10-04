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

    event MessagePosted(address indexed from, string author, string content, uint256 indexed tokenId, uint256 imageId, uint256 timestamp);
    event MessageDeleted(address indexed from, uint256 indexed tokenId, uint256 timestamp);

    struct Message {
        address from;
        string author;
        string content;
        uint256 tokenId;
        uint256 timestamp;
    }

    Message[] public messages;

    constructor()
        ERC721("Random Orca", "ORC")
        Ownable(msg.sender)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmQqS7grnEoeWiVvv2HgDvDVs7KXzD3eoVJbRw62TDyymY/";
    }

    function safeMint(string calldata author, string calldata content)
        public
    {
        require(bytes(content).length > 0 , "Empty messages are not allowed");
        require(bytes(author).length > 0, "Empty names are not allowed");
        uint256 timestamp = block.timestamp;

        messages.push(Message({
            from:msg.sender,
            author:author,
            content:content,
            tokenId:_nextTokenId,
            timestamp:timestamp
        }));

        uint256 imageId = ((_nextTokenId - 1) % MAX_IMAGES) + 1;

        emit MessagePosted(msg.sender, author, content,_nextTokenId, imageId, timestamp);

        _safeMint(msg.sender, _nextTokenId);
        
        _setTokenURI(_nextTokenId, Strings.toString(imageId));
        _nextTokenId += 1;
    }

    function getMessages() external view returns (Message[] memory) {
        return messages;
    }

    function burn(uint256 tokenId) public onlyOwner {
        uint256 timestamp = block.timestamp;
        for (uint256 i = 0; i < messages.length; i++) {
            if(tokenId == messages[i].tokenId){
                emit MessageDeleted(messages[i].from, messages[i].tokenId, timestamp);
                messages[i] = messages[messages.length - 1];
                messages.pop();
            }
        }
        _burn(tokenId);
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
