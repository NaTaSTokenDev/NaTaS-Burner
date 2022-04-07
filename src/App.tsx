import { TezosToolkit } from "@taquito/taquito";
// import { TezBridgeSigner } from '@taquito/tezbridge-signer'
import qrcode from "qrcode-generator";
import React, { useEffect, useState } from "react";
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import Crunchy_DeMN from "./components/Crunchy_DeMN";
import Crunchy_Natas from "./components/Crunchy_Natas";
import DisconnectButton from "./components/DisconnectWallet";
import MyNewBalance from "./components/MyNewBalance";
import MyNewDeMNs from "./components/MyNewDeMNs";
import SendDeMN from "./components/SendDeMN";
// import { SERIES_API_LINK } from "./config/const";
import { getDemnBalance, getNatasBalance } from "./services/balance";
// import { getPixelDeMN_SI, getPixelDeMN_SII } from "./services/pixeldemnapi";
// import { getPixeldemncount } from "./services/contract";
import MyDeMNs_SII from "./components/MyDeMNs_SII";
import MyDeMNs_SIII from "./components/MyDeMNs_SIII";
import MyDeMNs_SIV from "./components/MyDeMNs_SIV";
import MyDeMNs_SI from "./components/MyDeMNs_SI";
// import MyDeMNs from "./components/MyDeMNs";
import DeMNDropTotal from "./components/DeMNDropTotal";
import DeMNDropWeek from "./components/DeMNDropWeek";

const App: React.FC = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https:/mainnet.api.tez.ie")
  );

  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("infotab");
  const contractAddress: string = "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX";
  const [totalDeMNTokensEarned, setTotalDeMNTokensEarned] = useState(0);
  const [deMNTokensEarnedBySeries, setDeMNTokensEarnedBySeries] = useState<
    number[]
  >([]);
  const [natasBalance, setNatasBalance] = useState(0);
  const [demnBalance, setDemnBalance] = useState(0);
  const [pixelDemn_SI, setPixelDeMN_SI] = useState<string  | number>("");
  const [pixelDemn_SII, setPixelDeMN_SII] = useState<string | number>("");

  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();
    return { __html: qr.createImgTag(4) };
  };

{/*
 // useEffect(() => {if (!userAddress) {
 //   return;
 // }
 //   getPixeldemncount(SERIES_API_LINK).then((values) => {
 //     console.log('test')
 //     const _deMNTokensEarnedBySeries = values.map((value) => value.length);
 //     const _totalTokensEarnedBySeries = _deMNTokensEarnedBySeries.reduce(
 //       (total, earnedInSeries) => (total += earnedInSeries),
 //       0
 //     );
 //     setDeMNTokensEarnedBySeries(_deMNTokensEarnedBySeries);
 //     setTotalDeMNTokensEarned(_totalTokensEarnedBySeries);
 //   });
 // }, [userAddress]);
*/}


{/*
  useEffect(() => {
    getContracts(SERIES_API_LINK).then((values) => {
      const _deMNTokensEarnedBySeries = values.map((value) => value.length);
      console.log(values.length)
      console.log(values)
      const _totalTokensEarnedBySeries = _deMNTokensEarnedBySeries.reduce(
        (total, earnedInSeries) => (total += earnedInSeries),
        0
      );
      setDeMNTokensEarnedBySeries(_deMNTokensEarnedBySeries);
      setTotalDeMNTokensEarned(_totalTokensEarnedBySeries);
    });
  }, []);  */}

  useEffect(() => {
    if (!userAddress) {
      return;
    }
    getNatasBalance(userAddress).then((balance) => setNatasBalance(balance));
    getDemnBalance(userAddress).then((balance) => setDemnBalance(balance));
  }, [userAddress]);

  // useEffect(() => {
  //  if (!userAddress) {
  //    return;
  //  }
  //  getPixelDeMN_SI(userAddress).then((pixeldemnbalance) => setPixelDeMN_SI(pixeldemnbalance));
  //  getPixelDeMN_SII(userAddress).then((pixeldemnbalance) => setPixelDeMN_SII(pixeldemnbalance));
  // }, [userAddress]);

  if (publicToken && (!userAddress || isNaN(userBalance))) {
    return (
      <div className="centerImage">
        <img src="/images/NatasBurnerLogo.png" alt="Buy Natas" />
        <div id="dialog">
          <p className="myhead">pixeldemn.xyz</p>
          <div id="content">
            <p className="text-align-center">
              <i className="fas fa-broadcast-tower"></i>&nbsp; Connecting to
              your wallet
            </p>
            <div
              dangerouslySetInnerHTML={generateQrCode()}
              className="text-align-center"
            ></div>
            <p id="public-token">
              {copiedPublicToken ? (
                <span id="public-token-copy__copied">
                  <i className="far fa-thumbs-up"></i>
                </span>
              ) : (
                <span
                  id="public-token-copy"
                  onClick={() => {
                    if (publicToken) {
                      navigator.clipboard.writeText(publicToken);
                      setCopiedPublicToken(true);
                      setTimeout(() => setCopiedPublicToken(false), 2000);
                    }
                  }}
                >
                  <i className="far fa-copy"></i>
                </span>
              )}

              <span>
                Public token: <span>{publicToken}</span>
              </span>
            </p>
            <p className="text-align-center">
              Status: {beaconConnection ? "Connected" : "Disconnected"}
            </p>
          </div>
        </div>
        <div id="centerImage">
          <img
            src="/images/NatasBurnerLogo.png"
            alt="Natas and Demon Token Logo"
          />
        </div>
      </div>
    );
  } else if (userAddress && !isNaN(userBalance)) {
    return (
      <div className="main-box">
        <img src="/images/NatasBurnerLogo.png" alt="Buy Natas" />
        <div id="tabs">
          <div
            id="infotab"
            className={activeTab === "infotab" ? "active" : ""}
            onClick={() => setActiveTab("infotab")}
          >
            Staked PixelDeMNs
          </div>

          <div
            id="contract"
            className={activeTab === "contract" ? "active" : ""}
            onClick={() => setActiveTab("contract")}
          >
            NFTs for DeMNs
          </div>
        </div>
        <div id="dialog">
          <div id="content">
            {activeTab === "infotab" ? (
              <div>
              <div>
                <p>PixelDeMNs are unique 1/1 NFTs that spawn weekly DeMN Token Drops.
                DeMN Tokens are a Tezos Token with a fixed supply of 1,000,000.
                Your DeMN Tokens can be staked at <a href="https://matterdefi.xyz/#/?live=11"> Crunchy.Network </a> or <a href="https://app.crunchy.network/#/farms?f=garden&q=DeMN"> MatterDeFi.xyz </a> to earn even more rewards. 
                Purchase a PixelDeMN NFT at <a href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections"> Objkt.com </a></p>
                <h2>Your PixelDeMNs</h2>
                <h2>Series I</h2>
                <div>
                <MyDeMNs_SI
                  myuserAddress={userAddress}
                />
                </div>
              
                <h2>Series II</h2>
                <div>
                <MyDeMNs_SII
                  myuserAddress={userAddress}
                  pixeldemncontract='KT1QctVjmHzMTBBmHLwoYToaodEx7n1BXG1b'
                 />
                </div>
                <h2>Series III</h2>
                <MyDeMNs_SIII
                  myuserAddress={userAddress}
                  pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN'
                   />
                        <h2>Series IV</h2>
                     <MyDeMNs_SIV
                  myuserAddress={userAddress}
                  pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN'
                   />
 </div>
                {/* Earn tokens by series */}
                {deMNTokensEarnedBySeries.map((tokensEarned, index) => (
                  <MyNewDeMNs
                    key={index}
                    tokensEarned={tokensEarned}
                    series={index + 1}
                  />
                ))}

                {/* Balance */}
                <MyNewBalance balance={demnBalance} name="DeMN" />
                <MyNewBalance balance={natasBalance} name="NaTas" />

                <h2>
                  {" "}
                  UnStaked NaTaS LP / Quipuswap{" "}
                </h2> 
                <h3>
                  <Crunchy_Natas myuserAddress={userAddress} />
                </h3>
                <h2>
                  {" "}
                  UnStaked DeMN LP / Quipuswap{" "}
                  </h2>
                  <h3>
                  <Crunchy_DeMN myuserAddress={userAddress} />{" "}
                  </h3>
                <h2>Total DeMN Tokens Earned</h2>
                <h3> <DeMNDropTotal
                  myuserAddress={userAddress}
                  pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN'
                   /></h3>
                <h2>DeMN Tokens Earned This week</h2>
                <h3> <DeMNDropWeek
                  myuserAddress={userAddress}
                  pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN'
                   /></h3>
                <h2>Current DeMN Token Multiplier</h2>
                <h3>X 0.00 (Coming Soon)</h3>
                <h2>PixelDeMNs Stats</h2>
                <h3>- 54 unique owners -</h3>
                <h3>- 184 Unique PixelDeMNs so far -</h3>
                <h3>- PixelDeMNs earn 21 DeMN Tokens per\wk -</h3>
              </div>
            ) : (
              <div>
                <h2>Buy with DeMN Tokens</h2>
                <img
                  src="/images/DeMNHorde1.jpg"
                  width="150"
                  height="150"
                  alt="Default PixelDeMN Image Placetaker"
                />
                <div id="infotab">
                  <h3 className="text-align-center">Burn some DeMNs</h3>
                  <p>Receive this DeMN Horde NFT for 666 DeMN Tokens</p>
                  <p>333 of you DeMN Tokens will be Burned</p>
                  <p>Only PixelDeMN NFTs earn DeMN Token Drops</p>
                  <p>Series VI PixelDeMNs will be avalible here first!</p>
                  <SendDeMN
                    Tezos={Tezos}
                    setUserBalance={setUserBalance}
                    userAddress={userAddress}
                  />
                </div>
              </div>
            )}
            <DisconnectButton
              wallet={wallet}
              setPublicToken={setPublicToken}
              setUserAddress={setUserAddress}
              setUserBalance={setUserBalance}
              setWallet={setWallet}
              setTezos={setTezos}
              setBeaconConnection={setBeaconConnection}
            />
            <p>{userAddress}</p>
            <a
              href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections"
              target="_blank"
            >
              <img src="/images/pixeldemnsonobjkt.png" height="150" />
            </a>
          </div>
        </div>
        <div id="footer">
          <a href="https://natastoken.xyz"> NaTaSToken.xyz </a>
        </div>
      </div>
    );
  } else if (!publicToken && !userAddress && !userBalance) {
    return (
      <div className="main-box">
        <div id="centerImage">
          <img src="/images/NatasBurnerLogo.png" alt="Buy Natas" />
        </div>
        <div id="dialog">
          <div id="content">
            <p className="text-align-center">
              Earn DeMN Tokens with your PixelDeMNS
              If you have not done so already, go to the&nbsp;
              <a href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections">
                {" "}
                PixelDeMN Objkt page{" "}
              </a>
              to get a PixelDeMN and Start Earning
              Thanks
              Beta Test - Not Public
            </p>
          </div>
          <ConnectButton
            Tezos={Tezos}
            setContract={setContract}
            setPublicToken={setPublicToken}
            setWallet={setWallet}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setStorage={setStorage}
            contractAddress={contractAddress}
            setBeaconConnection={setBeaconConnection}
            wallet={wallet}
          />
          <a
            href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections"
            target="_blank"
          >
            <img src="/images/pixeldemnsonobjkt.png" height="150" />
          </a>
        </div>
        <div id="footer"></div>
      </div>
    );
  } else {
    return <div>An error has occurred</div>;
  }
};

export default App;
