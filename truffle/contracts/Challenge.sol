// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Challenge {
    uint256 public challengeID;
    uint256 public challengeDuration;  // days
    uint256 public depositAmount;

    uint256 public totalParticipants;

    address public contractCreator;

    uint256 public treasuryBalance;
    uint256 public penaltyTreasuryBalance;

    uint256 public challengeStartTime;

    struct Participant {
        uint256 deposit;
        mapping(uint256 => bool) completedTasksByWeek;
    }

    mapping(address => Participant) public participants;
    address[] public participantsAddresses;

    constructor(uint256 _challengeDuration, uint256 _depositAmount) {
        require(_challengeDuration > 0 && _challengeDuration % 7 == 0, "Challenge duration should be a positive multiple of 7 days");
        challengeDuration = _challengeDuration;
        depositAmount = _depositAmount;
        contractCreator = msg.sender;
        challengeStartTime = block.timestamp;  // 챌린지 시작 시간 초기화
    }

    function challengeEndTime() public view returns (uint256) {
        return challengeStartTime + challengeDuration * 1 days;
    }


    function joinChallenge() external payable {
        require(msg.value == depositAmount, "Incorrect deposit amount");
        require(participants[msg.sender].deposit == 0, "Already joined the challenge");

        participants[msg.sender].deposit = msg.value;
        treasuryBalance += msg.value;
        participantsAddresses.push(msg.sender);
        totalParticipants++;
    }


    function completeTask(uint256 weekNumber) external {
        require(weekNumber <= challengeDuration, "Invalid week number");
        require(!participants[msg.sender].completedTasksByWeek[weekNumber], "Task for this participant already marked as completed");

        participants[msg.sender].completedTasksByWeek[weekNumber] = true;
    }

    function claimReward(uint256 weekNumber) external {
        require(participants[msg.sender].completedTasksByWeek[weekNumber], "Challenge not completed for this week");

        uint256 reward = participants[msg.sender].deposit / challengeDuration;
        participants[msg.sender].deposit -= reward;
        treasuryBalance -= reward;
        payable(msg.sender).transfer(reward);
    }

    function forfeitChallenge(uint256 weekNumber) external {
        require(!participants[msg.sender].completedTasksByWeek[weekNumber], "You have already completed the task for this week");

        uint256 penalty = participants[msg.sender].deposit / challengeDuration;
        participants[msg.sender].deposit -= penalty;
        penaltyTreasuryBalance += penalty;
    }

    function distributePenaltyTreasury() external {
        require(block.timestamp >= challengeEndTime(), "Challenge is not yet finished");

        require(msg.sender == contractCreator, "Only contract creator can distribute the treasury");

        uint256 creatorReward = (penaltyTreasuryBalance * 20) / 100;
        uint256 challengeReward = (penaltyTreasuryBalance * 60) / 100;
        uint256 challengeCreatorReward = (penaltyTreasuryBalance * 20) / 100;

        payable(contractCreator).transfer(creatorReward);
        for (uint i = 0; i < participantsAddresses.length; i++) {
            address participantAddress = participantsAddresses[i];
            if (participants[participantAddress].deposit == 0) {
                payable(participantAddress).transfer(challengeReward / totalParticipants);
            }
        }

        penaltyTreasuryBalance = 0;
    }

    function getTreasuryBalance() external view returns (uint256) {
        return treasuryBalance;
    }

    function getPenaltyTreasuryBalance() external view returns (uint256) {
        return penaltyTreasuryBalance;
    }
}
