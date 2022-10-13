// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.15;

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

contract ChessGainsToken is IERC20 {
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => uint256) internal _balances;

    uint256 private _totalSupply;
    uint8 private _decimals;
    string private _symbol;
    string private _name;
    address public owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        owner = msg.sender;
        _name = "Chess Gains";
        _symbol = "CHSS";
        _decimals = 0;
        _totalSupply = 1000000;
        _balances[owner] = _totalSupply;
        holders.push(msg.sender);
        isHolder[msg.sender] = true;

        emit Transfer(address(0), msg.sender, _totalSupply);
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

    function renounceOwnership() public {
        require(msg.sender == owner, "Only owner can renounce ownership");
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
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

contract ChessGainsEngine {
    AggregatorV3Interface internal priceFeed; // BUSD/BNB

    address payable prizePool;
    address payable public owner; // !!! MAKE THIS ADDRESS NOT PAYABLE

    constructor() {
        priceFeed = AggregatorV3Interface(
            0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c
        ); // !!! NEEDS TO BE UPDATED
        prizePool = payable(0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8); // The address of the reward pool contract -- NEEDS TO BE UPDATED
        owner = payable(msg.sender); // metamask wallet used for deployment and triggering the payout !!!
    }

    event participantEntry(
        address indexed participant,
        uint indexed score,
        uint indexed time
    );
    event prizeTransfer(
        address indexed to,
        uint indexed amount,
        uint indexed time
    );
    event rewardTransfer(
        address indexed to,
        uint indexed amount,
        uint indexed time
    );

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return participantAddresses;
    }

    function balanceOf(address account) internal view returns (uint256) {
        return
            ChessGainsToken(0xd9145CCE52D386f254917e481eB44e9943F39138)
                .balanceOf(account); // TOKEN ADDRESS
    }

    function transfer(address recipient, uint256 amount) internal {
        ChessGainsToken(0xd9145CCE52D386f254917e481eB44e9943F39138).transfer(
            recipient,
            amount
        );
    }

    function enter(uint score, uint secret) public payable {
        require(
            secret == scoreValidator,
            "Only scores coming directly from the game are accepted"
        );
        scoreCounter += score;

        counterScoreToParticipant[scoreCounter] = msg.sender;
        participantCounterScores.push(scoreCounter);
        participantTotalScore[msg.sender] += score;

        emit participantEntry(msg.sender, score, block.timestamp);
    }

    function payWinner() public {
        require(msg.sender == owner, "Only the owner can trigger the payout");

        // calculate the position of a random winner
        uint randomPosition = getRandomNumber() % scoreCounter;
        address payable luckyMedalist;

        for (uint i = 0; i < scoreCounter; i++) {
            if (participantCounterScores[i] > randomPosition) {
                luckyMedalist = payable(
                    counterScoreToParticipant[participantCounterScores[i]]
                );
                break;
            }
        }

        // calculate the rewards
        uint prize = ((address(this).balance * 8500) / 10000); // 85% of the total pool
        uint topAthletesReward = ((address(this).balance * 1100) / 10000); // 11% of the total pool
        uint ownerReward = (
            (address(this).balance - prize - topAthletesReward)
        ); // 4% of the total pool

        // pay out the rewards
        luckyMedalist.transfer(prize); // pay out the prize to the winner
        topAthletesRewardPool.transfer(topAthletesReward); // transfer token holder reward to the token holder reward pool
        owner.transfer(ownerReward); // transfer owner reward to the owners !!! UPDATE IT TO GNOSIS SAFE WALLET

        // send AOS tokens as a reward to top athletes
        rewardTopAthletes();

        // calculate how much BNB top athletes are entitled to depending on the number of AOS tokens they hold
        handleShares(topAthletesReward);

        // notify the public about the transactions
        emit prizeTransfer(luckyMedalist, prize, block.timestamp);
        emit rewardTransfer(
            topAthletesRewardPool,
            topAthletesReward,
            block.timestamp
        );

        // reset the data for a new competition
        for (uint i = 0; i < participantCounterScores.length; i++) {
            address participantAddress = counterScoreToParticipant[
                participantCounterScores[i]
            ];
            uint participantScore = participantTotalScore[participantAddress];

            // reset the totalScroleToParticipant mapping
            totalScoreToParticipant[participantScore] = address(0);

            // reset the participantTotalScore mapping
            participantTotalScore[participantAddress] = 0;

            // reset the counterScoreToParticipnat mapping
            counterScoreToParticipant[participantCounterScores[i]];
        }

        // reset the participant addresses and scores for a new round
        participantAddresses = new address payable[](0);
        participantCounterScores = new uint[](0);

        // reset the score counter for a new round
        scoreCounter = 0;
    }

    // this function gets the latest price of BUSD/BNB to determine the minimum amount for entering the lottery
    function getLatestPrice() public view returns (int) {
        (
            ,
            /*uint80 roundID*/
            int price,
            ,
            ,

        ) = /*uint startedAt*/
            /*uint timeStamp*/
            /*uint80 answeredInRound*/
            priceFeed.latestRoundData();
        return price;
    }
}

contract ApeOlympicsPool {
    address public owner;

    event ReceivedRewardFromLottery(
        address indexed from,
        uint indexed amount,
        uint indexed time
    );
    event Withdrawal(
        address indexed who,
        uint indexed value,
        uint indexed time
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit ReceivedRewardFromLottery(msg.sender, msg.value, block.timestamp);
    }

    function totalPoolBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getHolderShare(address holder) internal view returns (uint) {
        return
            ChessGainsToken(0xd9145CCE52D386f254917e481eB44e9943F39138)
                .getHolderShare(holder); //TOKEN ADDRESS
    }

    function deductHolderShare(address holder, uint amount) internal {
        return
            ChessGainsToken(0xd9145CCE52D386f254917e481eB44e9943F39138)
                .deductHolderShare(holder, amount); //TOKEN ADDRESS
    }

    function renounceOwnership() public {
        require(msg.sender == owner, "Only owner can renounce ownership");
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }

    function withdraw() public {
        require(
            address(this).balance > 0,
            "The pool is empty at the moment, try later"
        );
        require(
            getHolderShare(msg.sender) > 0,
            "You've already withdrawn all your reward"
        );
        uint amount = getHolderShare(msg.sender);
        deductHolderShare(msg.sender, amount);
        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount, block.timestamp);
    }
}
