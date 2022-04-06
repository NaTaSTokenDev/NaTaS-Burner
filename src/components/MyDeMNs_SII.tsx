import React, { Dispatch, SetStateAction } from "react";
import useFetch from "react-fetch-hook";

interface IPost {
  data: string;
}

interface IDemnBalanceProps {
  myuserAddress: string;
  pixeldemncontract: string;
}

function MyDeMNs_SII({
  myuserAddress,
  pixeldemncontract,
}: IDemnBalanceProps) {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=${myuserAddress}&select=token.metadata.image`;
  let i = 0;
  let bob = "";
  var ipfsimage = "";
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <span>Network connection?</span>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    var ipfslink = JSON.stringify(data[i]);
    var ipfslink2 = ipfslink.toString();
    var ipfslink2 = ipfslink2.substring(7);
    var ipfsimage = `<img src = "https://ipfs.io/ipfs/${ipfslink2}" width="150" height="150">`;

    bob = ipfsimage + " " + bob;
  }
if (bob != "") {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: bob }} />
    </div>
  );}
  else {
  return  (
    <div>
      <div dangerouslySetInnerHTML={{ __html: `<img
  src="/images/NoDeMNsSII.png"
  width="150"
  height="150"
  alt="Default PixelDeMN Image Placetaker"
/>` }} />
    </div>
  );}
}

export default MyDeMNs_SII;
