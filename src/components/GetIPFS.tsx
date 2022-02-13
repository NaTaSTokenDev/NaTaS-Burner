import React, { useState } from "react";
import useFetch from "react-fetch-hook";


interface Post {
  nat: number, 
  address: string,
  value: number
};

interface DemnBalanceProps {
                myuserAddress: string,
                pixeldemncontract: string
              };

const GetIPFS = ({myuserAddress, pixeldemncontract}: DemnBalanceProps) => {
  const [rawdata, setRawdata] = useState<string>("hjk");
  var url = `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=${myuserAddress}&select=token.metadata.image`
  const thisuser = myuserAddress
  const { data, error } = useFetch<Post[]>(url)
  if (error) return <p>There is an error.</p>
  if (data) {
      var ipfslink = data;
      var ipfslink2 = ipfslink.toString(); 
      var ipfslink2 = ipfslink2.substring(7, 53);
      var ipfsimage2 = `<img src = "https://ipfs.io/ipfs/${ipfslink2}" width="300" height="300">`
      var ipfslink3 = data;
      var ipfsimage4 = ''
      var ipfslink4 = ipfslink3.toString(); 
      var len = ipfslink4.length
      if (len != 1){
          var ipfslink4 = ipfslink4.substring(61, 107);
          console.log(ipfsimage4)
          var ipfsimage4 = `<img src = "https://ipfs.io/ipfs/${ipfslink2}" width="300" height="300">`
          return ( <div>
            <div dangerouslySetInnerHTML={{__html: ipfsimage2}} />
         
        </div> )
        }
     return ( <div>
                {ipfslink4}
                <div dangerouslySetInnerHTML={{__html: ipfsimage4}} />
             
            </div> )
  }
  

  return <p>I Can Not Find Your PixelDeMNs (only Series II and III are compatable)</p>
}

export default GetIPFS;
