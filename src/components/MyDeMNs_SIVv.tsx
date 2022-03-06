import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import useFetch from "react-fetch-hook";


interface IPost {data: string};

interface IDemnBalanceProps {
                myuserAddress: string,
                mydemnsowned: number
              };              

function MyDeMNs_SIV ({myuserAddress, mydemnsowned}: IDemnBalanceProps) 
  {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?account=${myuserAddress}&token.metadata.symbol=GENTK&token.metadata.tags.[*]=PixelDeMNs&select=token.id`
 console.log(url)
  let i = 0
  var ipfsimage = ''
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>Network connection?</p>
  if (!data) return <span>Loading...</span>
  for (i = 0; i < data.length; i++) 
    {
    var ipfslink = JSON.stringify(data[i])
    if (ipfslink = '2226028') 
    ipfsimage = `<a href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections" target="_blank">
    <img src="/images/pixeldemnsonobjkt.png" height="150" />
</a>`
    }
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: ipfsimage}} />
        </div> 
             ) 
      }  

export default MyDeMNs_SIV;