import React, { useState } from "react";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./components/UpdateContract";
import BurnDemns from "./components/BurnDemns";
import DemnBalance from "./components/DemnBalance";
import NaTaSBalance from "./components/NaTaSBalance";
import GetIPFS from "./components/GetIPFS";
import MyDeMNs from "./components/MyDeMNs";
import "./style.css";
import ModIPFS from "./components/ModIPFS";

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
  const [loading, setLoading] = useState<any>(null);
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [myuserAddress, setmyUserAddress] = useState<string>("");
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
          src="/images/pixeldemnfarm.png"
          alt="Buy Natas"
        />
        <div id="dialog">
          <p className="myhead">Burn 100 DeMN Tokens for a chance to win the NaTaS Pool</p>
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
          <img src="/images/pixeldemnfarm.png"
            alt="Natas and Demon Token Logo"
          />
        </div>
      </div>
    );
  } else if (userAddress && !isNaN(userBalance)) {
    return (
      <div className="main-box">
        <img
          src="/images/pixeldemnfarm.png"
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
              <div id="transfers">
           {/*}     <h3 className="text-align-center">Burn 100 DeMN Tokens</h3>
                <h3 className="text-align-center">Win The Prize Pool if your # is 42</h3>
                <h3 className="text-align-center">Numbers picked during this round are eliminated</h3>
            <div className="area">Prize Pool: TBD</div> 
                <BurnDemns
                  Tezos={Tezos}
                  setUserBalance={setUserBalance}
                  userAddress={userAddress}
                />*/}
              </div>
            ) : (
              <div>
                <h3 className="text-align-center">
                  Total DeMN Tokens Earned<br/>
                  53.55<br/>
                  DeMN Tokens Earned This week<br/>
                  53.55<br/>
                  Current DeMN Token Multiplier<br/>
                  x .05
                </h3>
              
                <p></p>
           {/*     <UpdateContract
                  contract={contract}
                  setUserBalance={setUserBalance}
                  Tezos={Tezos}
                  userAddress={userAddress}
                  setStorage={setStorage}
           />    */}                     
              </div>
            )}
             <p> DeMN Token Balance: <DemnBalance myuserAddress={userAddress} /> </p> 
             <h2>Your Series III PixelDeMNs</h2>
                <div><MyDeMNs 
                myuserAddress={userAddress} 
                pixeldemncontract={pixeldemncontract}/> </div> 
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
            src="/images/pixeldemnfarm.png"
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

