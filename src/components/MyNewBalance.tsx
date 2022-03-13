import React from "react";

const MyNewBalance = ({ balance, name }: { balance: number; name: string }) => {
  return (
    <div>
      <h2>{name} Token Balance:</h2>
      <h3>{balance}</h3>
    </div>
  );
};

export default MyNewBalance;
