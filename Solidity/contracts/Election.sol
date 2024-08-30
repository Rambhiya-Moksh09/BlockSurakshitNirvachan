// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    mapping(address => bool) admins;
    string public name;
    string public description;
    bool public started;
    bool public ended;

    constructor() {
        admins[msg.sender] = true;
        started = false;
        ended = false;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Only Admin");
        _;
    }

    function addAdmin(address _address) public onlyAdmin {
        admins[_address] = true;
    }

    // *********************************************** CANDIDATE MANAGEMENT ***********************************************************\\\
    struct Candidate {
        string name;
        string info;
        bool exists;
    }
    mapping(string => Candidate) public candidates;
    string[] public candidateNames;

    function addCandidate(
        string memory _candidateName,
        string memory _info
    ) public onlyAdmin {
        candidates[_candidateName] = Candidate({
            name: _candidateName,
            info: _info,
            exists: true
        });
        candidateNames.push(_candidateName);
    }

    function getCandidates() public view returns (string[] memory) {
        return candidateNames;
    }

    //****************************************** ELECTION MANAGEMENT  *************************************************\\
    function setElectionDetails(
        string memory _name,
        string memory _description
    ) public onlyAdmin {
        name = _name;
        description = _description;
        started = true;
        ended = false;
    }

    function getElectionName() public view returns (string memory) {
        return name;
    }

    function getElectionDescription() public view returns (string memory) {
        return description;
    }

    function getTotalCandidates() public view returns (uint256) {
        return candidateNames.length;
    }

    // **************************************************** VOTER & VOTING MANAGEMENT **************************************************\\
    struct Vote {
        string voterId;
        string candidate;
    }
    Vote[] public votes;
    mapping(bytes32 => bool) public hasVoted; // Hashed voter ID

    function vote(string memory _voterId, string memory _candidateName) public {
        require(started && !ended, "Election not active");
        require(candidates[_candidateName].exists, "No such candidate");

        bytes32 hashedVoterId = keccak256(abi.encodePacked(_voterId));
        require(!hasVoted[hashedVoterId], "Already Voted");

        votes.push(Vote({voterId: _voterId, candidate: _candidateName}));
        hasVoted[hashedVoterId] = true;
    }

    function getVotes() public view onlyAdmin returns (Vote[] memory) {
        return votes;
    }

    function endElection() public onlyAdmin {
        require(started == true && ended == false, "Election already ended");
        ended = true;
    }

    function resetElection() public onlyAdmin {
        require(started == true && ended == true, "Election not ended");

        for (uint32 i = 0; i < candidateNames.length; i++) {
            delete candidates[candidateNames[i]];
        }

        name = "";
        description = "";

        delete votes;
        delete candidateNames;
        started = false;
        ended = false;
    }

    function getStatus() public view returns (string memory) {
        if (started && ended) {
            return "finished";
        }
        if (started && !ended) {
            return "running";
        }
        return "not-started";
    }
}
