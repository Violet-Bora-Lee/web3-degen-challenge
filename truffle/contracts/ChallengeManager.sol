// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Challenge.sol";

contract ChallengeManager {

    struct ChallengeInfo {
        Challenge challenge;
        address creator;
    }

    ChallengeInfo[] public challenges;

    function createChallenge(uint256 _challengeDuration, uint256 _depositAmount) external returns (Challenge) {
        Challenge newChallenge = new Challenge(_challengeDuration, _depositAmount);
        ChallengeInfo memory newChallengeInfo = ChallengeInfo({
            challenge: newChallenge,
            creator: msg.sender
        });

        challenges.push(newChallengeInfo);

        return newChallenge;
    }

    function getChallengesCount() external view returns (uint256) {
        return challenges.length;
    }

    function getChallengeByIndex(uint256 index) external view returns (Challenge, address) {
        require(index < challenges.length, "Invalid index.");
        ChallengeInfo memory info = challenges[index];
        return (info.challenge, info.creator);
    }
}
