// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Challenge {
    using SafeMath for uint256;

    uint256 public challengeID;
    address public challengeCreator;
    uint256 public challengeDuration;  // days

    uint256 public depositAmount;
    uint256 public totalParticipants;

    address public contractCreator;

    uint256 public treasuryBalance;
    uint256 public penaltyTreasuryBalance;

    uint256 public challengeStartTime;

    struct Participant {
        uint256 deposit;
        uint256 reward;  // Added this line
        mapping(uint256 => bool) completedTasksByWeek;
    }

    mapping(address => Participant) public participants;
    address[] public participantsAddresses;

    constructor(uint256 _challengeDuration, uint256 _depositAmount) {
        require(_challengeDuration > 0 && _challengeDuration % 7 == 0, "Challenge duration should be a positive multiple of 7 days");
        challengeCreator = msg.sender;
        challengeDuration = _challengeDuration;
        depositAmount = _depositAmount;
        contractCreator = msg.sender;
        challengeStartTime = block.timestamp;  // 챌린지 시작 시간 초기화
    }

    function challengeEndTime() public view returns (uint256) {
        return challengeStartTime.add(challengeDuration.mul(1 days));
    }


    function joinChallenge() external payable {
        require(msg.value == depositAmount, "Incorrect deposit amount");
        require(participants[msg.sender].deposit == 0, "Already joined the challenge");

        participants[msg.sender].deposit = msg.value;
        treasuryBalance = treasuryBalance.add(msg.value);
        participantsAddresses.push(msg.sender);
        totalParticipants++;
    }


    function completeTask(uint256 weekNumber) external {
        require(weekNumber <= challengeDuration / 7, "Invalid week number");
        require(!participants[msg.sender].completedTasksByWeek[weekNumber], "Task for this participant already marked as completed");

        participants[msg.sender].completedTasksByWeek[weekNumber] = true;
    }

    function claimReward(uint256 weekNumber) external {
        require(participants[msg.sender].completedTasksByWeek[weekNumber], "Challenge not completed for this week");

        uint256 weeksPassed = (block.timestamp - challengeStartTime) / (7 days);
        require(weekNumber <= weeksPassed, "Cannot claim reward for future weeks");

        uint256 reward = depositAmount / challengeDuration;
        participants[msg.sender].deposit = participants[msg.sender].deposit.sub(reward);
        treasuryBalance = treasuryBalance.sub(reward);
        payable(msg.sender).transfer(reward);
    }

    function forfeitChallenge(uint256 weekNumber) external {
        require(!participants[msg.sender].completedTasksByWeek[weekNumber], "You have already completed the task for this week");

        uint256 penalty = participants[msg.sender].deposit / challengeDuration;
        participants[msg.sender].deposit = participants[msg.sender].deposit.sub(penalty);
        penaltyTreasuryBalance = penaltyTreasuryBalance.add(penalty);
    }

    event PenaltyRewardClaimed(address indexed participant, uint256 amount);

    function claimMyPenaltyReward() external {
        require(block.timestamp >= challengeEndTime(), "Challenge is not yet finished");
        require(participants[msg.sender].reward == 0, "Reward already claimed");

        uint256 challengeRewardPerParticipant = penaltyTreasuryBalance.mul(60).div(totalParticipants);

        penaltyTreasuryBalance = penaltyTreasuryBalance.sub(challengeRewardPerParticipant);

        uint256 rewardToClaim = challengeRewardPerParticipant;

        participants[msg.sender].reward = 0;
        payable(msg.sender).transfer(rewardToClaim);

        emit PenaltyRewardClaimed(msg.sender, rewardToClaim);
    }


    event CreatorRewardClaimed(uint256 amount);

    function claimCreatorPenaltyReward() external {
        require(msg.sender == contractCreator, "Only contract creator can claim the reward");
        require(block.timestamp >= challengeEndTime(), "Challenge is not yet finished");

        uint256 creatorReward = (penaltyTreasuryBalance.mul(20)
        ) / 100;
        penaltyTreasuryBalance = penaltyTreasuryBalance.sub(creatorReward);

        payable(contractCreator).transfer(creatorReward);

        emit CreatorRewardClaimed(creatorReward);
    }

    event ChallengeCreatorRewardClaimed(uint256 amount);

    function claimChallengeCreatorPenaltyReward() external {
        require(msg.sender == challengeCreator, "Only challenge creator can claim the reward");
        require(block.timestamp >= challengeEndTime(), "Challenge is not yet finished");

        uint256 challengeCreatorReward = penaltyTreasuryBalance.mul(20).div(100);
        penaltyTreasuryBalance = penaltyTreasuryBalance.sub(challengeCreatorReward);

        payable(challengeCreator).transfer(challengeCreatorReward);

        emit ChallengeCreatorRewardClaimed(challengeCreatorReward);
    }



    function autoForfeit() external {
        uint256 weeksPassed = (block.timestamp - challengeStartTime) / (7 days);
        require(!participants[msg.sender].completedTasksByWeek[weeksPassed], "You have already completed the task for this week");

        uint256 penalty = depositAmount / challengeDuration;
        participants[msg.sender].deposit = participants[msg.sender].deposit.sub(penalty);
        penaltyTreasuryBalance = penaltyTreasuryBalance.add(penalty);
    }

    function getTreasuryBalance() external view returns (uint256) {
        return treasuryBalance;
    }

    function getPenaltyTreasuryBalance() external view returns (uint256) {
        return penaltyTreasuryBalance;
    }
}
