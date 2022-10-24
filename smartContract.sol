// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.15;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function decimals() external view returns (uint8);

    function symbol() external view returns (string memory);

    function name() external view returns (string memory);

    function getOwner() external view returns (address);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address _owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed value
    );
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 indexed value
    );
}

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    // getRoundData and latestRoundData should both raise "No data present"
    // if they do not have data to report, instead of returning unset values
    // which could be misinterpreted as actual reported values.
    function getRoundData(uint80 _roundId)
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract ChessGainsToken is IERC20 {
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => uint256) internal _balances;
    AggregatorV3Interface internal priceFeed;

    uint256 private _totalSupply;
    uint8 private _decimals;
    string private _symbol;
    string private _name;
    address payable public owner;
    address public admin;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        owner = payable(msg.sender);
        admin = msg.sender;
        _name = "Chess Gains";
        _symbol = "CHSS";
        _decimals = 0;
        _totalSupply = 1000000;
        _balances[owner] = _totalSupply;

        priceFeed = AggregatorV3Interface(
            0xAB594600376Ec9fD91F8e885dADF0CE036862dE0
        ); // MATIC / USD - Mainnet

        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can perform this action");
        _;
    }

    modifier onlyAdmin() {
        require(
            (msg.sender == admin) || (msg.sender == owner),
            "only admin or owner can perform this action"
        );
        _;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(msg.sender == owner, "Only owner can transfer ownership");
        emit OwnershipTransferred(owner, address(0));
        owner = payable(newOwner);
    }

    function renounceOwnership() public onlyOwner {
        require(msg.sender == owner, "Only owner can renounce ownership");
        emit OwnershipTransferred(owner, address(0));
        owner = payable(address(0));
    }

    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address tokenOwner, address tokenSpender)
        external
        view
        returns (uint256)
    {
        return _allowances[tokenOwner][tokenSpender];
    }

    function approve(address tokenSpender, uint256 amount)
        external
        returns (bool)
    {
        _approve(msg.sender, tokenSpender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender] - amount);
        return true;
    }

    function increaseAllowance(address tokenSpender, uint256 addedValue)
        public
        returns (bool)
    {
        _approve(
            msg.sender,
            tokenSpender,
            _allowances[msg.sender][tokenSpender] + addedValue
        );
        return true;
    }

    function decreaseAllowance(address tokenSpender, uint256 subtractedValue)
        public
        returns (bool)
    {
        _approve(
            msg.sender,
            tokenSpender,
            _allowances[msg.sender][tokenSpender] - subtractedValue
        );
        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "Can't transfer from the zero address");
        require(recipient != address(0), "Can't transfer to the zero address");

        _balances[sender] = _balances[sender] - amount;
        _balances[recipient] = _balances[recipient] + amount;

        emit Transfer(sender, recipient, amount);
    }

    function _approve(
        address tokenOwner,
        address tokenSpender,
        uint256 amount
    ) internal {
        require(
            tokenOwner != address(0),
            "The approver can't be the zero address"
        );
        require(
            tokenSpender != address(0),
            "The spender can't be the zero address"
        );

        _allowances[tokenOwner][tokenSpender] = amount;
        emit Approval(tokenOwner, tokenSpender, amount);
    }

    function buyTokens() public payable {
        uint latestPrice = uint(getLatestPrice());
        require(
            (msg.value * latestPrice) / 10**24 >= 95,
            "the minimum value should be 1 dollar"
        );

        uint amount = (msg.value * latestPrice) / 10**25;

        _balances[owner] = _balances[owner] - amount;
        _balances[msg.sender] = _balances[msg.sender] + amount;

        emit Transfer(owner, msg.sender, amount);
    }

    function withdrawBalance() public onlyAdmin {
        owner.transfer(address(this).balance);
    }

    // this function gets the latest price of BUSD/BNB to determine the minimum amount for entering the lottery
    function getLatestPrice() public view returns (int) {
        (
            ,
            /*uint80 roundID*/
            int price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }
}

contract ChessGainsEngine {
    address payable public owner;
    address public admin;
    uint public ownerShare;
    uint public winnerShare;

    constructor() {
        owner = payable(msg.sender);
        admin = msg.sender;
        ownerShare = 500;
        winnerShare = 5000;
    }

    event ParticipantEntry(address indexed participant, uint indexed time);
    event PrizeTransfer(
        address indexed to,
        uint indexed amount,
        uint indexed time
    );
    event RewardTransfer(
        address indexed to,
        uint indexed amount,
        uint indexed time
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can perform this action");
        _;
    }

    modifier onlyAdmin() {
        require(
            (msg.sender == admin) || (msg.sender == owner),
            "only admin or owner can perform this action"
        );
        _;
    }

    function setAdmin(address newAdmin) public onlyOwner {
        admin = newAdmin;
    }

    function setOwnerShare(uint number) public onlyOwner {
        ownerShare = number;
    }

    function setWinnerShare(uint number) public onlyOwner {
        winnerShare = number;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function enter() public payable {
        uint latestPrice = uint(getLatestPrice());
        require(
            (msg.value * latestPrice) / 10**24 >= 95,
            "the minimum value should be 1 dollar"
        );
        emit ParticipantEntry(msg.sender, block.timestamp);
    }

    function getLatestPrice() public view returns (uint) {
        return
            uint(
                ChessGainsToken(0x6cf09208a84b289922146e7847612ff59a1c92fe)
                    .getLatestPrice()
            );
    }

    function payPrize(address payable winner, uint amount) public onlyAdmin {
        require(
            address(this).balance > amount,
            "requested amount exceeds contract balance"
        );
        uint prize = ((amount * winnerShare) / 10000);
        uint ownerReward = ((amount * ownerShare) / 10000);

        winner.transfer(prize);
        owner.transfer(ownerReward);

        emit PrizeTransfer(winner, prize, block.timestamp);
    }

    function payRest(address payable recipient, uint amount) public onlyAdmin {
        require(
            address(this).balance > amount,
            "requested amount exceeds contract balance"
        );
        recipient.transfer(amount);

        emit RewardTransfer(recipient, amount, block.timestamp);
    }

    function transferOwnership(address payable newOwner) public onlyOwner {
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = payable(address(0));
    }
}
