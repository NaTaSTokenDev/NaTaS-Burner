import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import useFetch from "react-fetch-hook";


//interface IPost {data: number};

interface IPost2 {data: number};

interface IDemnBalanceProps {
                myuserAddress: string,
                pixeldemncontract: string,
                mydemnsowned: number
              };              

function MyDeMNs_SIV ({myuserAddress, pixeldemncontract, mydemnsowned}: IDemnBalanceProps) 
  {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?account=${myuserAddress}&token.metadata.symbol=GENTK&&token.metadata.tags.[*]=PixelDeMNs&select=token.metadata.https://staging.api.tzkt.io/v1/tokens/balances?account=tz1Pk7dgfsqsFnHyGzfkdyuADaYU4atYEd7C&token.metadata.symbol=GENTK&&token.metadata.tags.[*]=PixelDeMNs&select=token.id`
  let i = 0
  let bob = ""
  var ipfsimage = ''
  const { data, error } = useFetch<IPost2[]>(url);
  if (error) return <p>Network connection?</p>
  if (!data) return <span>Loading...</span>
  mydemnsowned = (data.length) + mydemnsowned
  for (i = 0; i < data.length; i++) 
    {
    var ipfslink = JSON.stringify(data[i])
    if (ipfslink = '2226028') 
    <a href="https://objkt.com/profile/tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx/collections" target="_blank">
    <img src="/images/pixeldemnsonobjkt.png" height="150" />
</a>
    bob = ipfsimage + " " + bob
    }
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: bob}} />
        </div> 
             ) 
      }  

export default MyDeMNs_SIV;