import React, { useState } from "react";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import DemnBalance from "./components/DemnBalance";
import NatasBalance from "./components/NatasBalance";
import MyDeMNs from "./components/MyDeMNs";
import Demnsowned from "./components/Demnsowned";

enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}
const App:React.FC = () => {  
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://hangzhounet.api.tez.ie")
  );
  
  // const [aredata, setAredata] = useState([]);
  const [mydemnsowned, setmyDemnsowned] = useState<number>(0);
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [pixeldemncontract, setPixeldemncontract] = useState<string>("KT1TprCuXTpxuEodgNxMCGR5sanh2jQY2Xpb");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");
  const contractAddress: string = "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX";
  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();
    return { __html: qr.createImgTag(4) };
  };
  if (publicToken && (!userAddress || isNaN(userBalance))) {
    return (
      <div className="centerImage">
        <img
          src="/images/NatasBurnerLogo.png"
          alt="Buy Natas"
        />
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
          <img src="/images/NatasBurnerLogo.png"
            alt="Natas and Demon Token Logo"
          />
        </div>
      </div>
    );
  } else if (userAddress && !isNaN(userBalance)) {
    return (
      <div className="main-box">
        <img
          src="/images/NatasBurnerLogo.png"
          alt="Buy Natas"
        />
        <div id="tabs">

          <div id="transfer"
            className={activeTab === "transfer" ? "active" : ""}
            onClick={() => setActiveTab("transfer")}
          >
            Staked PixelDeMNs
          </div>

          <div id="contract"
            className={activeTab === "contract" ? "active" : ""}
            onClick={() => setActiveTab("contract")}
          >
            Earnings
          </div>
        </div>
        <div id="dialog">
          <div id="content">
            {activeTab === "transfer" ? (
              <div>
                  <p> DeMN Token Balance:  <DemnBalance myuserAddress={userAddress} /> </p> 
                  <p> NaTaS Token Balance: <NatasBalance myuserAddress={userAddress} /> </p> 
                  <br/>
                  <h2>Your Series I PixelDeMNs</h2>
                  <div>
               {/*}   <MyDeMNs 
                      myuserAddress={userAddress} 
                      pixeldemncontract='KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton'
            setmyDemnsowned={mydemnsowned} /> */}
                  </div> 
                  <br/>
                  <h2>Your Series II PixelDeMNs</h2>
                      <MyDeMNs 
                      myuserAddress={userAddress} 
                      pixeldemncontract='KT1QctVjmHzMTBBmHLwoYToaodEx7n1BXG1b'
                      mydemnsowned={mydemnsowned} />
                  <br/>
                  <h2>Your Series III PixelDeMNs</h2>
                  <div>
                  <MyDeMNs 
                      myuserAddress={userAddress} 
                      pixeldemncontract='KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN'
                      mydemnsowned={mydemnsowned} />
                  </div> 
              </div> 
            ) : (
              <div>
                <h2>Total Staked PixelDeMNs</h2>
                <div>
                  <Demnsowned
                      myuserAddress={userAddress} 
                      pixeldemncontract='KT1QctVjmHzMTBBmHLwoYToaodEx7n1BXG1b'
                      mydemnsowned={mydemnsowned} /></div>
                <br/>
                <h2>Total DeMN Tokens Earned</h2>
                <h3>21</h3> 
                <br/>
                <h2>DeMN Tokens Earned This week</h2>
                <h3>21</h3>
                <br/>
                <h2>Current DeMN Token Multiplier</h2>
                <h3>X 0.00 (Coming Soon)</h3>
                <br/>
              </div>          
            )}
          {/*  //   footer area <p></p>   */}
            <DisconnectButton
            wallet={wallet}
            setPublicToken={setPublicToken}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
            setTezos={setTezos}
            setBeaconConnection={setBeaconConnection}
          />
            <p>Address Logged In: {userAddress}</p>
          </div>    
        </div>
        <div id="footer">
          <img src="/images/natas_demn_sm.png" alt="Natas and Demn Token Logo" />
        </div>
      </div>
    );
  } else if (!publicToken && !userAddress && !userBalance) {
    return (
      <div className="main-box">
        <div id="centerImage">
          <img
            src="/images/NatasBurnerLogo.png"
            alt="Buy Natas"
          />
        </div>
        <div id="dialog">
          <div id="content">
            <p className="text-align-center">
              Earn DeMN Tokens with your PixelDeMNS
              <br />
              If you have not done so already, go to the&nbsp;
              <a href="https://pixeldemn.xyz"> PixelDeMN Objkt page </a>
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
        </div>

        <div id="footer">
          <img src="/images/natas_demn_sm.png" alt="Natas and Demon Token Logo" />
        </div>
      </div>
    );
  } else {
    return <div>An error has occurred</div>;
  }
}


export default App

