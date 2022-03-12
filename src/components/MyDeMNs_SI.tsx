import React, { Dispatch, SetStateAction } from "react";
import useFetch from "react-fetch-hook";

interface IPost {
  data: string;
}

interface IDemnBalanceProps {
  myuserAddress: string;
  pixeldemncontract: string;
  mydemnsowned: number;
  setmyDemnsowned: Dispatch<SetStateAction<number>>;
}

const MyDeMNs_SI = ({
  myuserAddress,
  pixeldemncontract,
  mydemnsowned,
  setmyDemnsowned,
}: IDemnBalanceProps) => {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?account=${myuserAddress}&balance=1&token.metadata.symbol=OBJKT&token.metadata.tags.[*]=PixelDeMNs&select=token.metadata.artifactUri`;
  let i = 0;
  let bob = "";
  var ipfsimage = "";
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>Network connection?</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    var ipfslink = JSON.stringify(data[i]);
    var ipfslink2 = ipfslink.toString();
    var ipfslink2 = ipfslink2.substring(7);
    var ipfsimage = `<img src = "https://ipfs.io/ipfs/${ipfslink2} width="150" height="150"/>`;
    bob = ipfsimage + " " + bob;
  }
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: bob }} />
    </div>
  );
};

export default MyDeMNs_SI;
