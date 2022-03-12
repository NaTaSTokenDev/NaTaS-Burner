import React from "react";

function MyNewDeMNs({
  tokensEarned,
  series,
}: {
  tokensEarned: number;
  series: number;
}) {
  return (
    <div>
      <h2>Your Series {series} PixelDeMNs</h2>
      <p>{tokensEarned}</p>
    </div>
  );
}

export default MyNewDeMNs;
