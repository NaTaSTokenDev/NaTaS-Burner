import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import "./App.css";
import ConnectButton from "./components/ConnectWallet";
import DisconnectButton from "./components/DisconnectWallet";
import qrcode from "qrcode-generator";
import UpdateContract from "./components/UpdateContract";
import Transfers from "./components/Transfers";

enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}

const App = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://api.tez.ie/rpc/granadanet")
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

  // Granadanet Increment/Decrement contract
  const contractAddress: string = "KT1K3XVNzsmur7VRgY8CAHPUENaErzzEpe4e";

  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();

    return { __html: qr.createImgTag(4) };
  };

  if (publicToken && (!userAddress || isNaN(userBalance))) {
    return (
      <div className="main-box">
        <h1>NaTaS BURNER</h1>
        <div id="dialog">
          <header>Burn 100 DeMN Tokens for a chance to win the NaTaS Pool</header>
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
        <div id="footer">
          <img src="/images/natas_demn_sm.png" alt="Natas and Demon Token Logo" />
        </div>
      </div>
    );
  } else if (userAddress && !isNaN(userBalance)) {
    return (
      <div className="main-box">
        <h1>NaTaS BURNER</h1>
        <div id="tabs">
          <div
            id="transfer"
            className={activeTab === "transfer" ? "active" : ""}
            onClick={() => setActiveTab("transfer")}
          >
            Burn DeMN's
          </div>
          <div
            id="contract"
            className={activeTab === "contract" ? "active" : ""}
            onClick={() => setActiveTab("contract")}
          >
            See Ramaining Numbers
          </div>
        </div>
       <div id="dialog">
          <div id="content">
            {activeTab === "transfer" ? (
              <div id="transfers">
                <h3 className="text-align-center">Burn 100 DeMN Tokens</h3>
                <Transfers
                  Tezos={Tezos}
                  setUserBalance={setUserBalance}
                  userAddress={userAddress}                
               />
              </div>
            ) : (
              {*/  <div id="increment-decrement">  */}
                <h3 className="text-align-center">
                Red Squares have been Elminated
                </h3>
                <div className="grid-container">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>  
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                  <div>10</div>
                  <div>11</div>
                  <div>12</div>
                  <div>13</div>
                  <div>14</div>
                  <div>15</div>
                  <div>16</div>
                  <div>17</div>
                  <div>18</div>
                  <div>19</div>
                  <div>20</div>
                  <div>21</div>
                  <div>22</div>
                  <div>23</div>  
                  <div>24</div>
                  <div>25</div>
                  <div>26</div>
                  <div>27</div>
                  <div>28</div>
                  <div>29</div>
                  <div>30</div>
                  <div>31</div>
                  <div>32</div>
                  <div>33</div>
                  <div>34</div>
                  <div>35</div>
                  <div>36</div>
                  <div>37</div>
                  <div>38</div>
                  <div>39</div>
                  <div>40</div>
                </div>
                <UpdateContract
                  contract={contract}
                  setUserBalance={setUserBalance}
                  Tezos={Tezos}
                  userAddress={userAddress}
                  setStorage={setStorage}
                />
              </div>
            )}
            <p>
              <i className="far fa-file-code"></i>&nbsp;
              <a
                href={`https://better-call.dev/granadanet/${contractAddress}/operations`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contractAddress}
              </a>
            </p>
            <p>
              <i className="far fa-address-card"></i>&nbsp; {userAddress}
            </p>
            <p>
              <i className="fas fa-piggy-bank"></i>&nbsp;
              {(userBalance / 1000000).toLocaleString("en-US")} ꜩ
            </p>
          </div>
          <DisconnectButton
            wallet={wallet}
            setPublicToken={setPublicToken}
            setUserAddress={setUserAddress}
            setUserBalance={setUserBalance}
            setWallet={setWallet}
            setTezos={setTezos}
            setBeaconConnection={setBeaconConnection}
            />
        </div>
        <div id="footer">
          <img src="/images/natas_demn_sm.png" alt="Natas and Demn Token Logo" />
        </div>
      </div>
    );
  } else if (!publicToken && !userAddress && !userBalance) {
    return (
      <div className="main-box">
        <div className="title">
          <h1>NaTaS BURNER</h1>
          <a href="https://quipuswap.com/swap?from=tez&to=KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe_0">
            <img
              src="/images/natas_demn_sm.png"
              alt="Buy Natas"
            />
          </a>
        </div>
        <div id="dialog">
          <header>NaTaS BURNER</header>
          <div id="content">
            <p>Welcome!</p>
            <p>
              Burn 100 of your DeMN coins you will have a 1 in 100 chance to win the 
              NaTaS Token Prize Pool.
              <br />
              If you have not done so already, go to the{"NaTaS Token Website"}
              <a
                href="https://natastoken.xyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                for more information
              </a>{" "}
              Happy Burning
            </p>
            <p>Beta Test - Not Public</p>
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
};

export default App;
