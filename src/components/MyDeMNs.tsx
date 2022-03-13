import React, { Dispatch, SetStateAction } from "react";


const MyDeMNs = ({ data, cnt }: { data: string; cnt: number }) => {
  return (
    <div>
      <p>{data} {cnt} Token Balance:</p>
    </div>
  );
};

export default MyDeMNs;
