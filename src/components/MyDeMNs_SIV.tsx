import { stringify } from "querystring";
import React, { Dispatch, SetStateAction } from "react";
import useFetch from "react-fetch-hook";

interface IPost {
  data: string[];
}

interface IDemnBalanceProps {
  myuserAddress: string;
  pixeldemncontract: string;
}

function MyDeMNs_SIV({
  myuserAddress,
  pixeldemncontract,
}: IDemnBalanceProps) {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE&account=tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C&select=token.metadata.name`;
  let i = 0;
  let bob = "";
  var ipfsimage = "";
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>Network connection?</p>;
  if (!data) return <span>Loading...</span>;
  console.log(data)
  for (i = 0; i < data.length; i++) {
    // let pic = data[i]
    let pic = JSON.stringify(data[i]);
   pic = pic.replace(/\s/g, ``);
   pic = pic.replace(/[a-z]/gi, '') 
   pic = pic.replace("#","");
   pic = pic.replace("-","");
   pic = pic.replaceAll('"', '');
    var ipfsimage = `<img src = "/images/Series IV/${pic}.png" width="150" height="150">`;
    console.log(ipfsimage)
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
  src="/images/NoDeMNsSIV.png"
  width="150"
  height="150"
  alt="Default PixelDeMN Image Placetaker"
/>` }} />
    </div>
  );}
}
export default MyDeMNs_SIV;
