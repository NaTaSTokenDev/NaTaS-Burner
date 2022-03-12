import axios from "../lib/axios";
import { IPost } from "../types/IPost";

export function getContracts(addresses: string[]) {
  const promises = addresses.map(getContract);
  return Promise.all(promises);
}

export function getContract(address: string) {
  return axios
    .get<IPost[]>(
      `https://staging.api.tzkt.io/v1/tokens/balances?account=${address}&token.metadata.symbol=GENTK&token.metadata.tags.[*]=PixelDeMNs&select=token.id`
    )
    .then((r) => r.data);
}
