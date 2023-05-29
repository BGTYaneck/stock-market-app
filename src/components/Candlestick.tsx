import React from "react";

const Candlestick = () => {
  return (
    <line
      x1={-10}
      y1={0}
      x2={10}
      y2={0}
      stroke="black"
      strokeWidth={2}
      className="recharts-candlestick-line"
    />
  );
};

export default Candlestick;
