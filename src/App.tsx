import { TezosToolkit } from "@taquito/taquito";
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
import { SERIES_CONTRACT_ADDRESSES } from "./config/const";
import { getDemnBalance, getNatasBalance } from "./services/balance";
import { getContracts } from "./services/contract";

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
  const [activeTab, setActiveTab] = useState<string>("transfer");
  const contractAddress: string = "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX";
  const [totalDeMNTokensEarned, setTotalDeMNTokensEarned] = useState(0);
  const [deMNTokensEarnedBySeries, setDeMNTokensEarnedBySeries] = useState<
    number[]
  >([]);
  const [natasBalance, setNatasBalance] = useState(0);
  const [demnBalance, setDemnBalance] = useState(0);

  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();
    return { __html: qr.createImgTag(4) };
  };

  useEffect(() => {
    getContracts(SERIES_CONTRACT_ADDRESSES).then((values) => {
      const _deMNTokensEarnedBySeries = values.map((value) => value.length);
      const _totalTokensEarnedBySeries = _deMNTokensEarnedBySeries.reduce(
        (total, earnedInSeries) => (total += earnedInSeries),
        0
      );
      setDeMNTokensEarnedBySeries(_deMNTokensEarnedBySeries);
      setTotalDeMNTokensEarned(_totalTokensEarnedBySeries);
    });
  }, []);

  useEffect(() => {
    if (!userAddress) {
      return;
    }
    getNatasBalance(userAddress).then((balance) => setNatasBalance(balance));
    getDemnBalance(userAddress).then((balance) => setDemnBalance(balance));
  }, [userAddress]);

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
            id="transfer"
            className={activeTab === "transfer" ? "active" : ""}
            onClick={() => setActiveTab("transfer")}
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
            {activeTab === "transfer" ? (
              <div>
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

                <p> Staked NaTaS LP on Crunchy.Network: Coming Soon</p>
                <p> Staked DeMN LP on Crunchy.Network: Coming Soon</p>
                <p>
                  {" "}
                  UnStaked NaTaS LP / Quipuswap:{" "}
                  <Crunchy_Natas myuserAddress={userAddress} />
                </p>
                <p>
                  {" "}
                  UnStaked DeMN LP / Quipuswap:{" "}
                  <Crunchy_DeMN myuserAddress={userAddress} />{" "}
                </p>
                <br />
                <br />
                <h2>Total Staked PixelDeMNs</h2>
                <p>{totalDeMNTokensEarned}</p>
                <br />
                <h2>Total DeMN Tokens Earned</h2>
                <p>{totalDeMNTokensEarned}</p>
                <br />
                <h2>DeMN Tokens Earned This week</h2>
                <h3>(Coming Soon)</h3>
                <br />
                <h2>Current DeMN Token Multiplier</h2>
                <h3>X 0.00 (Coming Soon)</h3>
                <br />
                <h2>PixelDeMNs Stats</h2>
                <h3>- 50 unique owners -</h3>
                <h3>- 178 Unique PixelDeMNs so far -</h3>
                <h3>- PixelDeMNs earn 21 DeMN Tokens per\wk -</h3>
                <br />
              </div>
            ) : (
              <div>
                <h2>Exclusive NFTs</h2>
                <br />
                <h2>Buy with DeMN Tokens</h2>
                <br />
                <img
                  src="/images/mask.jpg"
                  width="200"
                  height="200"
                  alt="Default PixelDeMN Image Placetaker"
                />
                <div id="transfers">
                  <h3 className="text-align-center">Burn some DeMNs</h3>
                  <p>Receive a DeMN Horde NFT for 666 DeMN Tokens</p>
                  <p>333 of you DeMN Tokens will be Burned</p>
                  <p>Only PixelDeMN NFTs earn DeMN Token Drops</p>
                  <p>Series V PixelDeMNs will be avalible here first!</p>
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
            <br />
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
              <br />
              If you have not done so already, go to the&nbsp;
              <a href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections">
                {" "}
                PixelDeMN Objkt page{" "}
              </a>
              <br />
              to get a PixelDeMN and Start Earning
              <br />
              Thanks
              <br />
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
          <br />
          <br />
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
