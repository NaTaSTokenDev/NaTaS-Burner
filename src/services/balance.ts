import axios from "../lib/axios";

export function getNatasBalance(address: string) {
  return axios
    .get<{ key: string; value: number }[]>(
      `https://api.tzkt.io/v1/bigmaps/14771/keys?active=true&select=key,value`
    )
    .then((res) => {
      const num = res.data.find((item) => item.key === address);
      if (num) {
        return num.value / Math.pow(10, 0);
      }

      return 0;
    });
}

export function getDemnBalance(address: string) {
  return axios
    .get<{ key: string; value: number }[]>(
      `https://api.tzkt.io/v1/bigmaps/16845/keys?active=true&select=key,value`
    )
    .then((res) => {
      const num = res.data.find((item) => item.key === address);
      if (num) {
        return num.value / Math.pow(10, 8);
      }

      return 0;
    });
}
