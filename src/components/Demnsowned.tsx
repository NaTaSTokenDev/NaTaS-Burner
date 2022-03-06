import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import useFetch from "react-fetch-hook";

interface IPost {data: string};

interface IDemnBalanceProps {
                myuserAddress: string,
                pixeldemncontract: string,
                mydemnsowned?: number
              };
              
function Demnsowned ({myuserAddress, pixeldemncontract, mydemnsowned}: IDemnBalanceProps) 
  {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=tz1VhCvo2M7ne6GihA46hqhEoPceFo1Kbhg5&select=token.metadata.image`
  var argh = ''
  let i = 0
  let bob = ""
  var ipfsimage = ''
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>There is an error.</p>
  if (!data) return <span>Loading...</span>
  mydemnsowned = (data.length)
  for (i = 0; i < data.length; i++) 
    {
    var ipfslink = JSON.stringify(data[i])
    var ipfslink2 = ipfslink.toString(); 
    var ipfslink2 = ipfslink2.substring(7);
    var ipfsimage = `<div><img src = "https://ipfs.io/ipfs/${ipfslink2}" width="200" height="200"></div>`;
    bob = ipfsimage + " " + bob
    }
      return (
        <div>
          <h3>{mydemnsowned}</h3>
        </div> 
             ) 
      }  

export default Demnsowned;