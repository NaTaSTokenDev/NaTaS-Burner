import React, { useState, Dispatch, SetStateAction, useEffect, PropsWithChildren } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  key: string
  value: number
};

interface DemnBalanceProps {userAddress: string};

const DemnBalance = ({userAddress}: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/16845/keys?active=true&select=key,value`
  const thisuser = userAddress
  const [demnuseraddress, setdemnUseraddress] = useState<string>('')
  const { data, error } = useFetch<Post[]>(url)
  let i = 0 
  if (error) return <p>There is an error.</p>
  if (!data) return <span>Loading...</span>
  for (i = 0; i < data.length; i++) {
    if ( data[i].key == thisuser) {
      var num = data[i].value / Math.pow(10, 8);
      return <span>{num}</span>
    
    }
  }
  
  return <section>
  <h1> {demnuseraddress} You have no DeMN Tokens?</h1>
 <button> demnuseraddress </button>
</section>
}

export default DemnBalance;
  