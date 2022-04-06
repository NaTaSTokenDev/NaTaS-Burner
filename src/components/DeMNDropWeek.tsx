import React, { Dispatch, SetStateAction } from "react";
import useFetch from "react-fetch-hook";

//interface IPost {
//  data: number;
//}

interface IDemnBalanceProps {
  myuserAddress: string;
  pixeldemncontract: string;
}

function DeMNDropWeek({
  myuserAddress,
  pixeldemncontract,
}: IDemnBalanceProps) {
  var url = `https://staging.api.tzkt.io/v1/tokens/transfers?from=tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&to=tz1VhCvo2M7ne6GihA46hqhEoPceFo1Kbhg5&select=amount`;
  let i = 0;
  let bob = 0;
  const { data, error } = useFetch<number[]>(url);
  if (error) return <p>Network connection?</p>;
  if (!data) return <span>Loading...</span>;
  i = data.length - 1  
  return (
    <div>
      {data[i] / Math.pow(10, 8)}
          </div>
  );
}

export default DeMNDropWeek;
