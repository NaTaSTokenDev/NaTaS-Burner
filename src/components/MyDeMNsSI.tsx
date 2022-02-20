import React, { useState } from "react";
import useFetch from "react-fetch-hook";


interface IPost {data: string};

interface IDemnBalanceProps {
                myuserAddress: string,
                pixeldemncontract: string
              };
              

function MyDeMNs ({myuserAddress, pixeldemncontract}: IDemnBalanceProps) 
  {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=tz1VhCvo2M7ne6GihA46hqhEoPceFo1Kbhg5&select=token.metadata.image`
  var argh = ''
  let i = 0
  var ipfsimage = ''
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>There is an error.</p>
  if (!data) return <span>Loading...</span>
  for (i = 0; i < data.length; i++) 
    {
    var ipfslink = JSON.stringify(data[i])
    var ipfslink2 = ipfslink.toString(); 
    var ipfslink2 = ipfslink2.substring(7);
    var ipfsimage = `<div><img src = "https://ipfs.io/ipfs/${ipfslink2}" width="200" height="200"></div>`;
    argh = argh + ipfsimage}
    console.log(argh)
    if (argh!)
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: argh}} />
      </div> 
           )
           return <div><p>goto <a href="http://pixeldemn.xyz/" target="_blank"> pixeldemn.xyz </a> to get a PixelDeMN</p></div>
    }

export default MyDeMNs;


