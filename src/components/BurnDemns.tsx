import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";

const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');



const BurnDemns = ({
  Tezos,
  setUserBalance,
  userAddress
}: {
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  userAddress: string;
}): JSX.Element => {
  const [recipient, setRecipient] = useState<string>("tz1XQZVcQbSA56cf5ZKGGeM9jH4qzfwYL8rk");
  const [amount, setAmount] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(false);

 

Tezos.contract
.at('KT1UNTXxGgDMAD6pvVfLbuAMKie51FryR1Jy')
.then((contract) => {
  const i = 7;

  console.log(`Incrementing storage value by ${i}...`);
  return contract.methods.increment(i).send();
})
.then((op) => {
  console.log(`Waiting for ${op.hash} to be confirmed...`);
  return op.confirmation(3).then(() => op.hash);
})
.then((hash) => console.log(`Operation injected: https://hangzhou.tzstats.com/${hash}`))
.catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));

  const sendTransfer = async (): Promise<void> =>  {
    if (recipient)  {
      setLoading(true);
      try {
        const op = await Tezos.wallet
          .transfer({ to: recipient, amount: parseInt(amount) })
          .send();
        await op.confirmation();
        const balance = await Tezos.tz.getBalance(userAddress);
        setUserBalance(balance.toNumber());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
      }     ;

  return (
      <div id="transfer-inputs">
      <button
        className="button"
          disabled={!recipient && !amount}  
        onClick={sendTransfer}
      >
        {loading ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            <i className="far fa fa-fire"></i>&nbsp; BURN!
          </span>
        )}
      </button>
    </div>
  );
};

export default BurnDemns;
