import React from "react";

const MyNewBalance = ({ balance, name }: { balance: number; name: string }) => {
  return (
    <div>
      <p>{name} Token Balance:</p>
      <p>{balance}</p>
    </div>
  );
};

export default MyNewBalance;
