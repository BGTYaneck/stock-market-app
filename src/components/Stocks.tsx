import React from "react";
import { useState } from "react";
import { LoadingOverlay, Box } from "@mantine/core";
import { IconArrowBadgeRightFilled } from "@tabler/icons-react";

import axios from "axios";

const Stocks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [stock, setStock] = useState<string>("");
  const [length, setLength] = useState<string>("TIME_SERIES_DAILY_ADJUSTED");
  const [stockData, setStockData] = useState<any>("");

  const handleSubmit = (stockName: string) => {
    setIsError(false);
    setIsLoading(true);
    axios
      .get(
        "https://www.alphavantage.co/query?function=" +
          length +
          "&symbol=" +
          stock +
          "&apikey=VJCJ63J47WBZBWDQ"
      )
      .then((response) => {
        setStockData(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };
  return (
    <div className="w-full h-full pt-4 p-3 md:p-10 md:pt-1">
      <Box
        className="md:m-10  m-2 mt-1 border h-[52rem] rounded-3xl bg-[#111633] border-[#242944] flex flex-col p-4"
        pos="relative"
      >
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          className="rounded-3xl"
          overlayColor="#101532"
          loaderProps={{ size: "md", color: "#8C7CF0", variant: "bars" }}
          transitionDuration={20}
        />
        <div className="flex w-full justify-start items-baseline gap-2">
          <p className="text-gray-400 font-bold md:text-lg text-md">
            Stock symbol:
          </p>
          <input
            className="w-[12rem] h-[2rem] bg-[#111633] border-[#242944] border rounded-md p-2 text-opacity-60 text-white placeholder-gray-500"
            placeholder="(AAPL, TSLA, META)"
            onChange={(e) => {
              setStock(e.target.value);
            }}
          />
          <button
            onClick={() => handleSubmit(stock)}
            className=" h-[2.2rem] mb-1 p-1 bg-[#8C7CF0] text-white font-bold rounded-md"
          >
            Search
          </button>
          {isError && (
            <p className="text-red-600 ml-2">
              Error! Make sure the stock symbol is correct or try again later!
            </p>
          )}
        </div>
        <div>{JSON.stringify(stockData)}</div>
      </Box>
    </div>
  );
};

export default Stocks;
