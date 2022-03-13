import axios from "../lib/axios";
import { IPost } from "../types/IPost";

export function getPixelDeMN_SI(address: string) {
  return axios
    .get<{ key: string}>(
      `https://staging.api.tzkt.io/v1/tokens/balances?account=${address}&balance=1&token.metadata.symbol=OBJKT&token.metadata.tags.[*]=PixelDeMNs&select=token.metadata.artifactUri`
    )
    .then((res) => {
      const num = res;
      if (!res) {
        var ipfslink = JSON.stringify(res);
    var ipfslink2 = ipfslink.toString();
    var ipfslink2 = ipfslink2.substring(7);
    var ipfsimage = `<img src = "https://ipfs.io/ipfs/${ipfslink2} width="150" height="150"/>`;
    var ipfsimage = `<div dangerouslySetInnerHTML={{ __html: ${ipfsimage} }} />`
    console.log(res)
    return ipfsimage;
      }

      return 0;
    });
  };

export function getPixelDeMN_SII(address: string) {
  return axios
    .get<{ key: string; value: string }[]>(
    `https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN&account=${address}&select=token.metadata.image`
    )
    .then((res) => {
      const num = res.data.find((item) => item.key === address);
      if (num) {
        return num.value;
      }

      return 0;
    });

  };