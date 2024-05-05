// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FarContest is ERC721, ERC721URIStorage, Ownable {
    struct Contest {
        address creator;
        string name;
        uint256 winnersCount;
        address[] winners;
    }

    uint256 internal nextId = 1;

    Contest[] public contests;

    constructor(
        address initialOwner
    ) ERC721("FarContest", "FCTT") Ownable(initialOwner) {}

    function createContest(
        string calldata _name,
        uint256 _winnersCount
    ) external payable {
        Contest memory contest = Contest({
            creator: msg.sender,
            name: _name,
            winnersCount: _winnersCount,
            winners: new address[](_winnersCount)
        });
        contests.push(contest);
        _safeMint(msg.sender, contests.length);
    }

    function setWinner(uint256 _contestId, address _winner) external onlyOwner {
        Contest storage contest = contests[_contestId];
        require(
            contest.winners.length < contest.winnersCount,
            "All winners are already added"
        );
        contest.winners.push(_winner);
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
