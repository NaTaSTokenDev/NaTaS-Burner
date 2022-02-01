import React from "react";
import GetIPFS from "./GetIPFS";

interface rawdataProps {rawdata: any};

const DisplayDeMN = ({rawdata}: rawdataProps) => {
   var ipfslink = rawdata;
   var ipfslink = ipfslink.substring(7);
   var ipfslink = ipfslink.toString(); 
   var ipfsimage = `<img src="https://cloudflare-ipfs.com/ipfs/${ipfslink}/>`
  return <p>{ipfsimage}raw{rawdata}</p>
 
}

export default DisplayDeMN;