import React, { useState } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  balance: any;
  allowances: any;
  frozen_balance: string;
}

interface DemnBalanceProps {
  myuserAddress: string;
}
const Crunchy_DeMN = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://staging.api.tzkt.io/v1/bigmaps/14780/keys?active=true&key=${myuserAddress}&select=value`;
  const thisuser = myuserAddress;
  const [demnuseraddress, setdemnUseraddress] = useState<string>("");
  const { data, error } = useFetch<Post[]>(url);
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  if (data.length == 1) {
    {
      if (data[0].balance != undefined) {
        let num = data[0].balance / Math.pow(10, 6);
        return <span>{num}</span>;
      }
    }
  }

  return <span>0</span>;
};
export default Crunchy_DeMN;
