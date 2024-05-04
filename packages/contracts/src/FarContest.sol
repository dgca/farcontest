// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FarContest is ERC721, ERC721URIStorage, Ownable {
    enum RewardModel {
        Tiered,
        Flat
    }

    struct Contest {
        address creator;
        string name;
        string description;
        uint256 winnersCount;
        RewardModel rewardModel;
        address[] winners;
        uint256 endDateTime;
    }

    uint256 internal nextId = 1;

    Contest[] public contests;

    constructor(
        address initialOwner
    ) ERC721("FarContest", "FCTT") Ownable(initialOwner) {}

    function createContest(
        string calldata _name,
        string calldata _description,
        uint256 _winnersCount,
        RewardModel _rewardModel,
        uint256 _endDateTime
    ) external payable {
        Contest memory contest = Contest({
            creator: msg.sender,
            name: _name,
            description: _description,
            winnersCount: _winnersCount,
            rewardModel: _rewardModel,
            winners: new address[](_winnersCount),
            endDateTime: _endDateTime
        });
        contests.push(contest);
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public payable onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
