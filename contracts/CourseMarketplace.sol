//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract CourseMarketplace {

    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint id;  //32
        uint price;  //32
        bytes32 proof;  //32    
        address owner;  //20
        State state;  //1
    }

    bool public isStopped = false;

    //mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    //mapping of courseID to courseHash
    mapping(uint => bytes32) private ownedCourseHash;

    //total number of all courses + id of the course 
    uint private totalOwnedCourses;

    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Course has invalid state!
    error InvalidState();

    /// Course is not created!
    error CourseIsNotCreated();

    /// Course has already a Owner!
    error CourseHasOwner();

    /// Sender is not course Owner!
    error SenderIsNotCourseOwner();

    modifier onylOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier onlyWhenNotStopped() {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped() {
        require(isStopped);
        _;
    }

    function stopContract() external onylOwner() {
        isStopped = true;
    }

    function resumeContract() external onylOwner() {
        isStopped = false;
    }

    function purchaseCourse (
        bytes16 courseId,  // 0x00000000000000000000000000003130
        bytes32 proof      // 0x0000000000000000000000000000313000000000000000000000000000003130
    ) external payable onlyWhenNotStopped {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        if(hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }
        uint id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id : id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function repurchaseCourse(bytes32 courseHash) external payable onlyWhenNotStopped {
         
        if (!hasCourseOwnership(courseHash)) {
            revert SenderIsNotCourseOwner();
        }

        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        Course storage course = ownedCourses[courseHash];

        if (course.state != State.Deactivated) {
            revert InvalidState();
        }

        course.state = State.Purchased;
        course.price = msg.value;
    }

    function activateCourse (bytes32 courseHash) external onylOwner onlyWhenNotStopped{

        if(!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        Course storage course = ownedCourses[courseHash];

        if(course.state != State.Purchased) {
            revert InvalidState();
        }

        course.state = State.Activated;
    }

    function deactivateCourse(bytes32 courseHash) external onylOwner onlyWhenNotStopped{

        if(!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }

        Course storage course = ownedCourses[courseHash];

        if(course.state != State.Purchased) {
            revert InvalidState();
        }

        (bool success, ) = course.owner.call{value: course.price}("");
        require(success, "Transfer failed!");

        course.state = State.Deactivated;
        course.price = 0;
    }

    function withdraw(uint amount) external onylOwner {
        require(address(this).balance >= amount, "Invalid amount");
        (bool success, ) = owner.call{value: amount}("");

        require(success, "Transfer failed!");
    }

    function emergencyWithdraw() external onylOwner onlyWhenStopped {
        (bool success, ) = owner.call{value: address(this).balance}("");

        require(success, "Transfer failed!");
    }

    function tranferOwnership(address newOwner) external onylOwner {
        setContractOwner(newOwner);
    }

    function getContractOwner() public view returns(address) {
        return owner;
    }

    function getCourseCount() external view returns(uint) {
        return totalOwnedCourses;
    }

    function getCourseHash(uint index) external view returns(bytes32) {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash) external view returns(Course memory) {
        return ownedCourses[courseHash];
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function isCourseCreated(bytes32 courseHash) private view returns(bool){
        return ownedCourses[courseHash].owner != 0x0000000000000000000000000000000000000000;    
    }

    function hasCourseOwnership(bytes32 courseHash) private view returns(bool) {
        return ownedCourses[courseHash].owner == msg.sender;
    }

    function selfDestruct() external onylOwner onlyWhenStopped {
        selfdestruct(owner);
    }

    fallback() external {}

    receive() external payable {}
} 