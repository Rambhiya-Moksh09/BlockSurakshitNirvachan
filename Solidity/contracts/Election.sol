// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    mapping(address => bool) admins;
    address[] public adminList;

    string public name;
    string public description;
    bool public started;
    bool public ended;

    constructor() {
        admins[msg.sender] = true;
        adminList.push(msg.sender);
        started = false;
        ended = false;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender] == true, "Only Admin");
        _;
    }

    function addAdmin(address _address) public onlyAdmin {
        require(!admins[_address], "Address is already an admin");
        admins[_address] = true;
        adminList.push(_address);
    }

    function getAdmins() public view returns (address[] memory) {
        return adminList;
    }

    // *********************************************** CANDIDATE MANAGEMENT ***********************************************************\\\
    struct Candidate {
        string name;
        string info;
        bool exists;
    }
    mapping(uint => Candidate) public candidates;
    string[] public candidateNames;
    string[] public Info;
    uint public candidateCount;

    function addCandidate(
        string memory _candidateName,
        string memory _info
    ) public onlyAdmin {
        candidates[candidateCount] = Candidate({
            name: _candidateName,
            info: _info,
            exists: true
        });
        candidateCount++;
        candidateNames.push(_candidateName);
        Info.push(_info);
    }

    function getCandidates()
        public
        view
        returns (string[] memory, string[] memory)
    {
        return (candidateNames, Info);
    }

    function deleteCandidate(uint256 index) public onlyAdmin {
        require(index < candidateCount, "Invalid Candidate Index");
        require(candidates[index].exists, "Candidate does not exist");

        // Mark the candidate as deleted in the mapping
        candidates[index].exists = false;

        // Remove the candidate's name and info from the arrays
        if (index < candidateNames.length - 1) {
            candidateNames[index] = candidateNames[candidateNames.length - 1];
            Info[index] = Info[Info.length - 1];
        }

        candidateNames.pop();
        Info.pop();

        // Decrease the candidate count
        candidateCount--;
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

    function getElectionDetails()
        public
        view
        returns (string memory, string memory)
    {
        return (name, description);
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
        require(candidates[candidateCount].exists, "No such candidate");

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

        // Reset mapping by setting candidates as non-existent
        for (uint i = 0; i < candidateCount; i++) {
            candidates[i].exists = false;
        }

        // Reset arrays
        delete candidateNames;
        delete Info;

        // Reset other state variables
        name = "";
        description = "";
        delete votes;
        candidateCount = 0;
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
