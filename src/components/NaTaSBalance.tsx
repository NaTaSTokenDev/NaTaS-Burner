import React, {
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  PropsWithChildren,
} from "react";
import useFetch from "react-fetch-hook";

interface Post {
  key: string;
  value: number;
}

interface DemnBalanceProps {
  myuserAddress: string;
}

const NatasBalance = ({ myuserAddress }: DemnBalanceProps) => {
  const url = `https://api.tzkt.io/v1/bigmaps/14771/keys?active=true&select=key,value`;
  const thisuser = myuserAddress;
  const [demnuseraddress, setdemnUseraddress] = useState<string>("");
  const { data, error } = useFetch<Post[]>(url);
  let i = 0;
  if (error) return <p>There is an error.</p>;
  if (!data) return <span>Loading...</span>;
  for (i = 0; i < data.length; i++) {
    if (data[i].key == thisuser) {
      var num = data[i].value / Math.pow(10, 0);
      return <span>{num}</span>;
    }
  }

  return <span>0</span>;
};

export default NatasBalance;
