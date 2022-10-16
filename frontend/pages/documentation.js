import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import participants1 from "../public/assets/documentation/participants1.webp";
import participants2 from "../public/assets/documentation/participants2.webp";
import holders1 from "../public/assets/documentation/holders1.webp";
import holders2 from "../public/assets/documentation/holders2.webp";
import allocationlong from "../public/assets/documentation/allocationlong.webp";
import allocationsquare from "../public/assets/documentation/allocationsquare.webp";
import journey from "../public/assets/documentation/journey.webp";
import journeymobile from "../public/assets/documentation/journeymobile.webp";
import getmatic from "../public/assets/documentation/getmatic.webp";
import getmaticmobile from "../public/assets/documentation/getmaticmobile.webp";
import transfermatic from "../public/assets/documentation/transfermatic.webp";
import transfermaticmobile from "../public/assets/documentation/transfermaticmobile.webp";
import prizewithdraw from "../public/assets/documentation/prizewithdraw.webp";
import rewardclaim from "../public/assets/documentation/rewardclaim.webp";
import winnerselection1 from "../public/assets/documentation/winnerselection1.webp";
import winnerselection2 from "../public/assets/documentation/winnerselection2.webp";
import roadmap from "../public/assets/documentation/roadmap.webp";
import Footer from "../components/Footer";
import Disclaimer from "../components/Disclaimer";
import styles from "../styles/documentation.module.scss";

export default function DocumentationPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const disclaimerRef = useRef();
  const aboutRef = useRef();
  const howItWorksRef = useRef();
  const valueDistributionRef = useRef();
  const userJourneyRef = useRef();
  const entryCostRef = useRef();
  const prizeTransferRef = useRef();
  const withdrawalRef = useRef();
  const winnerSelectionRef = useRef();
  const performanceRewardsRef = useRef();
  const tokenHolderRewardRef = useRef();
  const roadmapRef = useRef();
  const topPageRef = useRef();
  const menuRef = useRef();
  const burgerRef = useRef();

  //#region sidebar menu handle on mobile
  const checkIfTrue = openMenu ? 1 : 0;

  // close menu on burger click
  function handleClick() {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }

  // close menu on click outside
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target) && !burgerRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => document.removeEventListener("mousedown", checkIfClickedOutside);
  }, []);

  //close menu on scroll

  useEffect(() => {
    document.addEventListener("scroll", () => setOpenMenu(false));

    return () => document.removeEventListener("scroll", () => setOpenMenu(false));
  }, []);

  //#endregion

  return (
    <>
      <Head>
        <title>Chessgains - Documentation</title>
        <meta name="documentation" content="Chessgains - skill-based lottery for chess lovers - documentation page" />
      </Head>
      <div ref={topPageRef}>
        <main className={styles.documentation_page}>
          <div className={styles.documentation_page__wrapper}>
            <div
              ref={menuRef}
              className={
                checkIfTrue
                  ? `${styles.documentation_page__sidebar}`
                  : `${styles.documentation_page__sidebar} ${styles.documentation_page__sidebar_closed}`
              }
            >
              <div ref={burgerRef} className={styles.documentation_page__sidebar_cross} onClick={handleClick}></div>
              <h3
                className={styles.documentation_page__sidebar_title}
                onClick={() => topPageRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                Chessgains - Outline
              </h3>
              <div className={styles.documentation_page__sidebar_list}>
                <div
                  className={styles.documentation_page__sidebar_item}
                  onClick={() => disclaimerRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  Disclaimer
                </div>
                <div
                  className={styles.documentation_page__sidebar_item}
                  onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  About
                </div>
                <div
                  className={styles.documentation_page__sidebar_item}
                  onClick={() => howItWorksRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  How it works
                </div>
                <ul className={styles.how_it_works__inner_list}>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => valueDistributionRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Value distribution
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => userJourneyRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    User journey
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => entryCostRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Entry cost
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => prizeTransferRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Prize / Reward transfer
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => withdrawalRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Withdrawal
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => winnerSelectionRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Winner selection
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => performanceRewardsRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Performance rewards
                  </li>
                  <li
                    className={styles.how_it_works__inner_list_item}
                    onClick={() => tokenHolderRewardRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Token holder reward
                  </li>
                </ul>
                <div
                  className={styles.documentation_page__sidebar_item}
                  onClick={() => roadmapRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  Roadmap
                </div>
              </div>
            </div>
            <div className={styles.documentation_page__main}>
              <h1 className={styles.documentation_page__title}>Chessgains - Skill-based Lottery for Chess Lovers</h1>
              <Disclaimer disclaimerRef={disclaimerRef} />

              <div className={styles.documentation_page__block} ref={aboutRef} id="about">
                <h2 className={styles.documentation_page__section_title}>About</h2>
                <h3 className={styles.documentation_page__section_subtitle}>Lottery</h3>
                <div className={styles.documentation_page__block_text_container}>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    <b>Chessgains</b> is a skill-based lottery built on the Polygon blockchain that accepts 1$ from each
                    participant and distributes the collected funds to one of them at random based on their score from the
                    gameplay.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_participants1}`}>
                    <Image className={styles.image} alt="play chess for money" src={participants1} width={396} height={396} />
                    <p className={styles.image_desc}>
                      <i>
                        Pic. 1. Participants submit their score to the lottery along with the $1 payment to get a chance of
                        winning.
                      </i>
                    </p>
                  </div>
                  <div className={`${styles.image_container} ${styles.image_container_participants2}`}>
                    <Image className={styles.image} alt="winning chess for money" src={participants2} width={396} height={396} />
                    <p className={styles.image_desc}>
                      <i>
                        Pic. 2. Having the highest score doesn't guarantee victory. Any participant can get lucky and win the
                        prize.
                      </i>
                    </p>
                  </div>
                  <h3
                    className={`${styles.documentation_page__section_subtitle} ${styles.documentation_page__section_subtitle_token}`}
                  >
                    CHSS Token
                  </h3>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    <b>Chess token</b> (CHSS) is an ERC20 token whose purpose is to let interested people financially support the
                    project for a potential share of the reward from every lottery draw.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Funds accumulated from the sale of CHSS tokens are used in promotional activities aimed to increase the number
                    of players in the game.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    CHSS tokens are not directly related to the lottery and their only benefit is a potential share of the reward
                    from each payout. The reward is allocated to token holders' addresses automatically after each session in
                    proportion to the number of tokens they hold.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_holders1}`}>
                    <Image className={styles.image} alt="chessgains tokens" src={holders1} width={396} height={396} />
                    <p className={styles.image_desc}>
                      <i>
                        Pic. 3. Anyone can support the project by buying CHSS tokens that grant a revenue share from each lottery
                        draw.
                      </i>
                    </p>
                  </div>
                  <div className={`${styles.image_container} ${styles.image_container_holders2}`}>
                    <Image className={styles.image} alt="chess token holders" src={holders2} width={396} height={396} />
                    <p className={styles.image_desc}>
                      <i>
                        Pic. 4. The share of the reward is allocated in proportion to the number of the CHSS tokens in the wallet.
                      </i>
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.documentation_page__block} ref={howItWorksRef}>
                <h2 className={styles.documentation_page__section_title}>How it works?</h2>
                <h3 className={styles.documentation_page__section_subtitle} ref={valueDistributionRef}>
                  Value distribution
                </h3>
                <div className={styles.documentation_page__block_text_container}>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Every draw in Chessgains results in a winner who gets 50% of the total prize paid out to his wallet
                    automatically.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Of the remaining 50%, 23% are reserved for the top players as performance rewards, 22% are allocated to token
                    holders, and 5% are paid out to the developers as a reward for creating and maintaining the project.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_allocation}`}>
                    <Image className={styles.image} alt="play chess at chessgains - allocation" src={allocationsquare} />
                    <p className={styles.image_desc}>
                      <i>Pic. 5. Every draw results in rewards for all stakeholders.</i>
                    </p>
                  </div>
                  <h3
                    className={`${styles.documentation_page__section_subtitle} ${styles.documentation_page__section_subtitle_user_journey}`}
                    ref={userJourneyRef}
                  >
                    User journey
                  </h3>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    To participate in the lottery the player has to have a web3 wallet. We create a new web3 wallet for each
                    participant automatically during the first login. All that is required is to authenticate using the email or a
                    social account.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The user can also choose to connect with his existing web3 wallet. To do that he should click the "Connect
                    with Wallet" button in the bottom part of the sign in modal.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The whole reward, including the main prize, performance rewards, and dividends is deposited to the in-game
                    wallet, from where the user can withdraw it to his personal wallets at any time.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_journey}`}>
                    <picture className={styles.margin_auto}>
                      <source media="(min-width:768px)" srcSet={journey} />
                      <Image className={styles.image} alt="chessgains user journey" src={journeymobile} />
                    </picture>
                    <p className={styles.image_desc}>
                      <i>
                        Pic. 6. The player a) plays the game, b) gets a score, c) submits the score to the lottery, d) gets the
                        prize or reward, or both deposited to the in-game wallet, e) withdraws the reward to the personal wallet.
                      </i>
                    </p>
                  </div>
                  <p className={styles.documentation_page__section_paragraph}>
                    <b>Gameplay</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Every player can play chess on Chessgains free unlimited number of times. The user is not charged until he
                    submits the score to the lottery.{" "}
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    If the player is not satisfied with the score or doesn't like the situation on the board, he can click the
                    "New Game" button at any time to start a new game.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The score is counted only after the player submits his request for entry into the lottery and pays the one
                    dollar participation fee.
                  </p>
                  <p className={styles.documentation_page__section_paragraph}>
                    <b>Score</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    To get a score a player has to win in the game. The score is calculated using two parameters
                  </p>
                  <ul className={styles.ul_style}>
                    <li
                      className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full} ${styles.padding_bottom_8}`}
                    >
                      <b>1) the base score</b> that depends on the level of the AI that the player played against and
                    </li>
                    <li
                      className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                    >
                      <b>2) the piece score</b> that depends on the type and number of chess pieces left in the player's
                      possession after the game ended.
                    </li>
                  </ul>
                  <p className={styles.documentation_page__section_paragraph}>
                    <b>1) Base score</b>
                  </p>
                  <table className={styles.documentation_page__base_score_table}>
                    <thead>
                      <tr className={styles.documentation_page__base_score_table_row}>
                        <th className={styles.documentation_page__base_score_table_heading}>AI name</th>
                        <th className={styles.documentation_page__base_score_table_heading}>Difficulty</th>
                        <th className={styles.documentation_page__base_score_table_heading}>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.documentation_page__base_score_table_row}>
                        <td className={styles.documentation_page__base_score_table_data}>Gamma</td>
                        <td className={styles.documentation_page__base_score_table_data}>1</td>
                        <td className={styles.documentation_page__base_score_table_data}>50</td>
                      </tr>
                      <tr className={styles.documentation_page__base_score_table_row}>
                        <td className={styles.documentation_page__base_score_table_data}>Delta</td>
                        <td className={styles.documentation_page__base_score_table_data}>2</td>
                        <td className={styles.documentation_page__base_score_table_data}>75</td>
                      </tr>
                      <tr className={styles.documentation_page__base_score_table_row}>
                        <td className={styles.documentation_page__base_score_table_data}>Beta</td>
                        <td className={styles.documentation_page__base_score_table_data}>3</td>
                        <td className={styles.documentation_page__base_score_table_data}>110</td>
                      </tr>
                      <tr className={styles.documentation_page__base_score_table_row}>
                        <td className={styles.documentation_page__base_score_table_data}>Alpha</td>
                        <td className={styles.documentation_page__base_score_table_data}>4</td>
                        <td className={styles.documentation_page__base_score_table_data}>160</td>
                      </tr>
                      <tr className={styles.documentation_page__base_score_table_row}>
                        <td className={styles.documentation_page__base_score_table_data}>Omega</td>
                        <td className={styles.documentation_page__base_score_table_data}>5</td>
                        <td className={styles.documentation_page__base_score_table_data}>225</td>
                      </tr>
                    </tbody>
                  </table>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    <b>2) Piece score</b>
                  </p>
                  <table className={styles.documentation_page__piece_score_table}>
                    <thead>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <th className={styles.documentation_page__piece_score_table_heading}>Name</th>
                        <th className={styles.documentation_page__piece_score_table_heading}>Count</th>
                        <th className={styles.documentation_page__piece_score_table_heading}>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <td className={styles.documentation_page__piece_score_table_data}>Pawn</td>
                        <td className={styles.documentation_page__piece_score_table_data}>6</td>
                        <td className={styles.documentation_page__piece_score_table_data}>1</td>
                      </tr>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <td className={styles.documentation_page__piece_score_table_data}>Knight</td>
                        <td className={styles.documentation_page__piece_score_table_data}>2</td>
                        <td className={styles.documentation_page__piece_score_table_data}>3</td>
                      </tr>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <td className={styles.documentation_page__piece_score_table_data}>Bishop</td>
                        <td className={styles.documentation_page__piece_score_table_data}>2</td>
                        <td className={styles.documentation_page__piece_score_table_data}>3</td>
                      </tr>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <td className={styles.documentation_page__piece_score_table_data}>Rook</td>
                        <td className={styles.documentation_page__piece_score_table_data}>2</td>
                        <td className={styles.documentation_page__piece_score_table_data}>5</td>
                      </tr>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <td className={styles.documentation_page__piece_score_table_data}>Queen</td>
                        <td className={styles.documentation_page__piece_score_table_data}>1</td>
                        <td className={styles.documentation_page__piece_score_table_data}>9</td>
                      </tr>
                      <tr className={styles.documentation_page__piece_score_table_row}>
                        <td className={styles.documentation_page__piece_score_table_data}>
                          <b>Total</b>
                        </td>
                        <td className={styles.documentation_page__piece_score_table_data}>
                          <b>14</b>
                        </td>
                        <td className={styles.documentation_page__piece_score_table_data}>
                          <b>21</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_footnote}`}
                  >
                    <i>* Multiple queens don't count into the score</i>
                    <br />
                    <i>** Pieces left on the enemy side don't affect the score</i>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Therefore to maximize the score the player should find a perfect balance between the level of the AI he is
                    comfortable playing with and the number of pieces he can save and win in the game.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_subtitle}`}
                    ref={entryCostRef}
                  >
                    <b>Entry cost</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The entry cost for each participant is $1 nominated in Matic (the native currency of the Polygon chain).
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The user needs to deposit this amount to his in-game wallet from where it's automatically deducted after he
                    clicks the "enter lottery" button. To deposit Matic the player can
                  </p>
                  <ul className={styles.ul_style}>
                    <li
                      className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full} ${styles.padding_bottom_8}`}
                    >
                      <b>1) transfer it from other wallets</b>
                    </li>
                    <li
                      className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full} ${styles.padding_bottom_8}`}
                    >
                      <b>2) buy it with the credit card</b> by clicking the "Get Matic" button.
                    </li>
                  </ul>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    <b>Transfering Matic from other wallets</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    To transfer Matic from other web3 wallets or exchanges the user has to copy the in-game wallet's address by
                    clicking the "Copy" button and use it to send the necessary amount from the other wallet.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_transfermatic}`}>
                    <picture className={styles.margin_auto}>
                      <source media="(min-width:768px)" srcSet={transfermatic} />
                      <Image className={styles.image} alt="how to transfer matic" src={transfermaticmobile} />
                    </picture>
                    <p className={styles.image_desc}>
                      <i>Pic. 7. Transfering Matic from Metamask to the in-game wallet.</i>
                    </p>
                  </div>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    <b>Buying Matic directly via a Credit Card</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    If a person doesn't have an existing web3 wallet, or simply prefers buying Matic directly via the credit card
                    he can click the "Get Matic" button on the in-game wallet page.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    This will open a pop-up window in which he can enter his credit card details and buy Matic directly from
                    different web3 payment providers.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Buying Matic with a credit card is a service offered by onramper.com - a web3 payment processor aggregator.
                    This means that the credit card information flows directly to the payment processor without being stored in
                    our database.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    You can think of it as a direct window to different payment processors that we have placed on our wallet page
                    for our users' convenience.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_getmatic}`}>
                    <picture>
                      <source media="(min-width:768px)" srcSet={getmatic} />
                      <Image className={styles.image} alt="how to buy matic for chessgains" src={getmaticmobile} />
                    </picture>
                    <p className={styles.image_desc}>
                      <i>Pic. 8. Card details flow directly to the payment provider (e.g. Wyre).</i>
                    </p>
                  </div>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_subtitle} ${styles.documentation_page__section_paragraph_full}`}
                    ref={prizeTransferRef}
                  >
                    <b>Prize / Reward transfer</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    After a participant wins the prize it's automatically added to his in-game wallet balance. He can then
                    withdraw it by clicking the "Withdraw" button and specifying the recipient address.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Unlike the main prize, performance rewards and dividends (CHSS token rewards) aren't added to the balance
                    automatically but are allocated to the user's account in the database.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    To add them to his balance the user needs to click the "Claim" button located to the right of the respective
                    field.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    This is done to reduce the overall transaction cost of the lottery and make it stable by eliminating automatic
                    mass payouts.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_prizewithdraw}`}>
                    <Image className={styles.image} alt="how to withdraw prize at chessgains" src={prizewithdraw} />
                    <p className={styles.image_desc}>
                      <i>Pic. 9. The prize is automatically added to the user's balance and he can withdraw it right away.</i>
                    </p>
                  </div>
                  <div className={`${styles.image_container} ${styles.image_container_rewardclaim}`}>
                    <Image className={styles.image} alt="claim the reward" src={rewardclaim} />
                    <p className={styles.image_desc}>
                      <i>Pic. 10. The user needs to claim his reward to add them to his balance.</i>
                    </p>
                  </div>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_subtitle}`}
                    ref={withdrawalRef}
                  >
                    <b>Withdrawal</b>
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    To withdraw his balance the user has to click the "Withdraw" button, enter the recipient wallet address, the
                    amount, and then click the "Withdraw" button again.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    To quickly select the whole balance the user can click the "Max" button located to the right of the input
                    field.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    During every withdrawal, the user has to leave about 0.01 Matic in the wallet to pay for the transaction cost.
                    But if he used the "Max" button to set the withdrawal amount the transaction fee gets deducted automatically.
                  </p>
                  <h3
                    className={`${styles.documentation_page__section_subtitle} ${styles.documentation_page__section_subtitle_user_journey}`}
                    ref={winnerSelectionRef}
                  >
                    Winner selection
                  </h3>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    In Chessgains every lottery draw results in a winner. Each participant gets a probability of winning in
                    proportion to their score.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The inner workings of this process can be abstracted as follows.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    After the round ends our system sums up the scores of each participant forming a hypothetical line
                    representing the total score.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Each participant gets a segment of that line depending on his time of entry and score. The higher the score
                    the bigger the player's segment on the total score line.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    When the lottery draws our algorithm calculates a random number ranging from the total score (line length) to
                    1 trillion. For example, if the sum of all scores in the lottery is 488, the resulting random number will be
                    between 488 and 1 trillion.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Then the function takes the modulo of the total score to the random number. So in our example, if the random
                    number is equal to 89406094572 and the total score is 488 the operation will be 89406094572 % 488 = 92.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The result of 92 represents the winner's location on the hypothetical line.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The participant whose segment that point belongs to becomes the winner. In this example, the winner is the
                    second entrant because 92 falls within the 76 and 200 range, which is the 2nd participant's segment on the
                    hypothetical score line.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    After the system identifies the winner it proceeds with calculating performance rewards and dividends.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_winnerselection1}`}>
                    <Image className={styles.image} alt="chessgains - get dividends" src={winnerselection1} />
                    <p className={styles.image_desc}>
                      <i>Pic. 11. Each participant gets a segment on the line depending on the time of entry and his score.</i>
                    </p>
                  </div>
                  <div className={`${styles.image_container} ${styles.image_container_winnerselection2}`}>
                    <Image className={styles.image} alt="chessgains - select the winner" src={winnerselection2} />
                    <p className={styles.image_desc}>
                      <i>Pic. 12. The result of the operation points to the winner's segment on the line.</i>
                    </p>
                  </div>
                  <h3
                    className={`${styles.documentation_page__section_subtitle} ${styles.documentation_page__section_subtitle_user_journey}`}
                    ref={performanceRewardsRef}
                  >
                    Performance rewards
                  </h3>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    In addition to the main prize, each participant gets performance rewards based on how they compare to the
                    other players in the same lottery round. Thus the top 1% get $3, the top 5% get $2, and the top 10% get $1
                    allocated to their wallet after the lottery draw.
                  </p>
                  <table className={styles.documentation_page__about_table}>
                    <thead>
                      <tr className={styles.documentation_page__about_table_row}>
                        <th className={styles.documentation_page__about_table_heading}>Rank</th>
                        <th className={styles.documentation_page__about_table_heading}>Cost of entry</th>
                        <th className={styles.documentation_page__about_table_heading}>Reward</th>
                        <th className={styles.documentation_page__about_table_heading}>Return</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.documentation_page__about_table_row}>
                        <td className={styles.documentation_page__about_table_data}>Top 1%</td>
                        <td className={styles.documentation_page__about_table_data}>$1</td>
                        <td className={styles.documentation_page__about_table_data}>$3</td>
                        <td className={styles.documentation_page__about_table_data}>300%</td>
                      </tr>
                      <tr className={styles.documentation_page__about_table_row}>
                        <td className={styles.documentation_page__about_table_data}>Top 5%</td>
                        <td className={styles.documentation_page__about_table_data}>$1</td>
                        <td className={styles.documentation_page__about_table_data}>$2</td>
                        <td className={styles.documentation_page__about_table_data}>200%</td>
                      </tr>
                      <tr className={styles.documentation_page__about_table_row}>
                        <td className={styles.documentation_page__about_table_data}>Top 10%</td>
                        <td className={styles.documentation_page__about_table_data}>$1</td>
                        <td className={styles.documentation_page__about_table_data}>$1</td>
                        <td className={styles.documentation_page__about_table_data}>100%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    These rewards are exclusive, meaning that each class of players gets only their own reward and not the reward
                    of the other classes. In other words the top 1% players gets only top 1% reward, even though they also belong
                    the top 5% and the top 10% categories at the same time.
                  </p>
                  <h3
                    className={`${styles.documentation_page__section_subtitle} ${styles.documentation_page__section_subtitle_user_journey}`}
                    ref={tokenHolderRewardRef}
                  >
                    Token holder reward
                  </h3>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    In addition to the main prize and performance rewards, Chessgains may offer "dividends" to CHSS token holders
                    for supporting the project financially. The holders of the tokens don't have to participate in the lottery to
                    get their reward.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    CHSS token is an ERC20 token with a fixed supply of 1000 000. Its aim is to fund the growth of the project in
                    the early stages of its development.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Each token grants its holders a share of the revenue from each lottery draw. This reward, however, is not
                    guaranteed and we urge everyone to read the disclaimer section of this paper before making any purchasing
                    decision.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    The calculation of CHSS token rewards is governed by the following formula:
                  </p>
                  <div className={styles.documentation_page__formula_box}>
                    <i>Token reward = 1 / 10^6 * prize * 0.22</i>
                  </div>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    As it follows from the formula the return from each CHSS token is equal to 0.00000022 * prize, which means
                    that the more participants there are in the lottery the higher the return for the token holders.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Below is the table that illustrates hypothetical return scenarios under different user base projections.
                  </p>
                  <table className={styles.documentation_page__token_returns_table}>
                    <thead>
                      <tr className={styles.documentation_page__token_returns_table_row}>
                        <th className={styles.documentation_page__token_returns_table_heading}># of tokens</th>
                        <th className={styles.documentation_page__token_returns_table_heading}>1k players</th>
                        <th className={styles.documentation_page__token_returns_table_heading}>10k players</th>
                        <th className={styles.documentation_page__token_returns_table_heading}>100k players</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.documentation_page__token_returns_table_row}>
                        <td className={styles.documentation_page__token_returns_table_data}>100</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$0.022</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$0.22</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$2.2</td>
                      </tr>
                      <tr className={styles.documentation_page__token_returns_table_row}>
                        <td className={styles.documentation_page__token_returns_table_data}>1000</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$0.22</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$2.2</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$22</td>
                      </tr>
                      <tr className={styles.documentation_page__token_returns_table_row}>
                        <td className={styles.documentation_page__token_returns_table_data}>10000</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$2.2</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$22</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$220</td>
                      </tr>
                      <tr className={styles.documentation_page__token_returns_table_row}>
                        <td className={styles.documentation_page__token_returns_table_data}>100000</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$22</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$220</td>
                        <td className={styles.documentation_page__token_returns_table_data}>$2200</td>
                      </tr>
                    </tbody>
                  </table>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_footnote}`}
                  >
                    * Numbers represent return per lottery draw depending on the number of tokens and participants in the lottery
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Currently, CHSS tokens have a fixed price of $0.1 per token and a MOQ of 10pcs. But this can change depending
                    on the number of tokens left and the project's future needs for funding.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    You can find up-to-date information about the number of tokens left for sale and their price in the "invest"
                    section of the wallet page.
                  </p>
                </div>
              </div>
              <div className={styles.documentation_page__block} ref={roadmapRef}>
                <h2 className={styles.documentation_page__section_title}>Roadmap</h2>
                <div className={styles.documentation_page__block_text_container}>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Chessgains launched on September 27th, 2022.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    Our next major milestone is to reach 10000 monthly lottery players.{" "}
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    At the moment we're building an organic presence and running PPC ads using seed capital.
                  </p>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full}`}
                  >
                    As the project raises more funds from the token sale and the growing number of participants we'll expand our
                    marketing strategy to a multichannel approach involving influencers, giveaway contests, and wider range of PPC
                    banner ads.
                  </p>
                  <div className={`${styles.image_container} ${styles.image_container_roadmap}`}>
                    <Image className={styles.image} alt="chessgains - roadmap" src={roadmap} />
                    <p className={`${styles.image_desc} ${styles.image_desc_special}`}>
                      <i>* MAU - Monthly Active Users.</i>
                    </p>
                  </div>
                  <p
                    className={`${styles.documentation_page__section_paragraph} ${styles.documentation_page__section_paragraph_full} ${styles.documentation_page__section_paragraph_center}`}
                  >
                    (Information presented on this page may change)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
