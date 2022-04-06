import React, { Dispatch, SetStateAction } from "react";
import useFetch from "react-fetch-hook";

//interface IPost {
//  data: number;
//}

interface IDemnBalanceProps {
  myuserAddress: string;
  pixeldemncontract: string;
}

function DeMNDropTotal({
  myuserAddress,
  pixeldemncontract,
}: IDemnBalanceProps) {
  var url = `https://staging.api.tzkt.io/v1/tokens/transfers?from=tz1SrztDp8MVcbom6T8FMPSRFns4PGFoFqxx&token.contract=KT1GBgCd5dk7v4TSzWvtk1X64TxMyG4r7eRX&to=${myuserAddress}&select=amount`;
  let i = 0;
  let bob = 0;
  const { data, error } = useFetch<number[]>(url);
  if (error) return <p>Network connection?</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    var resul = JSON.stringify(data[i]);
    var resul = resul.substring(1);
    var resul = resul.substring(0, resul.length - 1);
    bob = Number(resul)
  }
  return (
    <div>
      {bob / Math.pow(10, 8)}
          </div>
  );
}

export default DeMNDropTotal;
