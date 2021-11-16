import React, { useState, useEffect} from "react";
import { TezosToolkit, MichelsonMap } from "@taquito/taquito";
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
    new TezosToolkit("https://mainnet.api.tez.ie")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0); 
  const [storage2, setStorage2] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");
  // DeMN Contract Address
  const contractAddress: string = "KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX";  
  const generateQrCode = (): { __html: string } => {
    const qr = qrcode(0, "L");
    qr.addData(publicToken || "");
    qr.make();
    return { __html: qr.createImgTag(4) };
    };
 // const currentDemnbalance = 'https://api.better-call.dev/v1/contract/mainnet/KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe/tokens/holders?token_id=0';
    
  if (publicToken && (!userAddress || isNaN(userBalance))) {
    return (
      <div className="centerImage">
            <img
              src="/images/NatasBurnerLogo.png"
              alt="Buy Natas"
            />
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
                <h1 className="text-align-center">Burn 100 DeMN Tokens</h1>
                <h3 className="text-align-center">Win The Prize Pool if your # is 42</h3>
                <h3 className="text-align-center">Numbers picked during this round are eliminated</h3>
                <div className="area">Prize Pool: TBD</div>
                <Transfers
                  Tezos={Tezos}
                  setUserBalance={setUserBalance}
                  userAddress={userAddress}                
               />
              </div>
            ) : (
                <div>
                <h3 className="text-align-center">
                Red Numbers have been eliminated
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
                  <div>41</div>
                  <div className="blink">42</div>
                  <div>43</div>  
                  <div>44</div>
                  <div>45</div>
                  <div>46</div>
                  <div>47</div>
                  <div>48</div>
                  <div>49</div>
                  <div>50</div>
                  <div>51</div>
                  <div>52</div>
                  <div>53</div>  
                  <div>54</div>
                  <div>55</div>
                  <div>56</div>
                  <div>57</div>
                  <div>58</div>
                  <div>59</div>
                  <div>60</div>
                  <div>61</div>
                  <div>62</div>
                  <div>63</div>  
                  <div>64</div>
                  <div>65</div>
                  <div>66</div>
                  <div>67</div>
                  <div>68</div>
                  <div>69</div>
                  <div>70</div>
                  <div>71</div>
                  <div>72</div>
                  <div>73</div>  
                  <div>74</div>
                  <div>75</div>
                  <div>76</div>
                  <div>77</div>
                  <div>78</div>
                  <div>79</div>
                  <div>80</div>
                  <div>81</div>
                  <div>82</div>
                  <div>83</div>  
                  <div>84</div>
                  <div>85</div>
                  <div>86</div>
                  <div>87</div>
                  <div>88</div>
                  <div>89</div>
                  <div>90</div>
                  <div>91</div>
                  <div>92</div>
                  <div>93</div>  
                  <div>94</div>
                  <div>95</div>
                  <div>96</div>
                  <div>97</div>
                  <div>98</div>
                  <div>99</div>
                  <div>100</div>
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
   
         {/*      <p className="text-align-center">
//              <i className="far fa-file-code"></i>&nbsp;
//              <a
//                href={`https://better-call.dev/granadanet/${contractAddress}/operations`}
//                target="_blank"
//                rel="noopener noreferrer"
//              >
//                {contractAddress}
//              </a>
//            </p>  */}
             <p className="text-align-center">
                Address Logged In: {userAddress}  
            </p>
             <p className="text-align-center">
             Here 
 fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
  
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
        <div id="centerImage">
                  <img
              src="/images/NatasBurnerLogo.png"  
              alt="Buy Natas"
            />
        </div>
        <div id="dialog">
          {/*         <img
              src="/images/coollogo_com-28728132 (1).png"
             alt="Buy Natas"
            />.  */}
          <div id="content">
            <p className="text-align-center">
              Burn 100 of your DeMN Tokens and you will have a 1 in 100 chance to win the 
              NaTaS Token Prize Pool. As numbers are eliminated your odds get better.
              <br />
              If you have not done so already, go to the&nbsp; 
              <a href="https://natastoken.xyz"> NaTaS Token Website</a>
              <br />
              for more information
              <br />
              Happy Burning
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
};

export default App;
