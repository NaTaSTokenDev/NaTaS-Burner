import React, { useState, Dispatch, SetStateAction, useEffect, PropsWithChildren } from "react";
import useFetch from "react-fetch-hook";

interface Post {
  key: {nat: number,
    address: string}
  value: number
};

interface PixelDemnBalanceProps {userAddress: string};

const PixelDemnBalance = ({userAddress}: PixelDemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/61830/keys?active=true&select=key,value`
  const thisuser = userAddress
  const [demnuseraddress, setdemnUseraddress] = useState<string>('')
  const { data, error } = useFetch<Post[]>(url)
  let i = 0 
  if (error) return <p>There is an error.</p>
  if (!data) return <p>Loading...</p>
  for (i = 0; i < data.length; i++) {
    if ( data[i].key.address == thisuser) {
      var num = data[i].key.address;
     // return  <img src="https://cloudflare-ipfs.com/ipfs/QmSKbvo6MC2ab598Afnt93hYRc3NYJcKDQH87wsyNk3Hus" alt="display image" />
      return <p>{num}</p>
    
    }
  }
  
  return <section>
  <h1> {userAddress} You have no DeMN Tokens?</h1>  
</section>
}

export default PixelDemnBalance;
  //          const Apiaddress2 = 'https://api.tzkt.io/v1/contracts/KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe'
//   https://api.tzkt.io/v1/accounts      http://jsonplaceholder.typicode.com/posts
  //      const DemnBalance = () => {
  //          const Apiaddress = 'https://api.better-call.dev/v1/contract/mainnet/KT1GaEvbD4zA3pHs7mv3grpuqR1KGtjXAEDe/tokens/holders?token_id=0'
 //           const setfetchUsers = async () => {
  //              const res = await fetch(Apiaddress);
  //              const data = await res.json();
  //              console.log(data)
  //          };
        


  //      return (
  //          <div className="">
  //                      <p>
  //                          DeMN Token Balance {setfetchUsers} 
   //                     </p>
  //                      </div>  
  //      );
    