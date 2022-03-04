import React, { useState, Dispatch, SetStateAction, useEffect, PropsWithChildren } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  balance: number
  allowances: any
  frozen_balance: string
};

interface DemnBalanceProps {myuserAddress: string};
const Crunchy_Natas = ({myuserAddress}: DemnBalanceProps) => 
{
  const url = `https://staging.api.tzkt.io/v1/bigmaps/16858/keys?active=true&key=${myuserAddress}&select=value`
  const thisuser = myuserAddress
  const [demnuseraddress, setdemnUseraddress] = useState<string>('')
  const { data, error } = useFetch<Post[]>(url)
  if (error) return <p>There is an error.</p>
  if (!data) return <span>Loading...</span>
  if (data.length == 1) 
    {
      {
        if (data[0].balance != undefined) 
        {let num = data[0].balance / Math.pow(10, 6);
          return <span>{num}</span>}
          }
    }
    return <p>0</p>
    }
export default Crunchy_Natas;
  