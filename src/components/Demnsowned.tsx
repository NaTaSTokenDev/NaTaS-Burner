import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import useFetch from "react-fetch-hook";


interface IPost {data: string};

interface IDemnBalanceProps {
                myuserAddress: string,
                pixeldemncontract: string,
                mydemnsowned: number
              };
              

function Demonsowned ({myuserAddress, pixeldemncontract, mydemnsowned}: IDemnBalanceProps) 
  {
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=tz1VhCvo2M7ne6GihA46hqhEoPceFo1Kbhg5&select=token.metadata.image`
  let i = 0
  let bob = ""
  const { data, error } = useFetch<IPost[]>(url);
  if (error) return <p>There is an error.</p>
  if (!data) return <span>Loading...</span>
  mydemnsowned = (data.length) + mydemnsowned
  console.log(mydemnsowned)
      return (
        <div>
         {mydemnsowned}
        </div> 
             ) 
      }  

export default Demonsowned;


