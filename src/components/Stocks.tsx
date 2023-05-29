import { LoadingOverlay, Box, Switch } from "@mantine/core";
import { Tooltip as MantineTooltip } from "@mantine/core";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axios from "axios";

const Stocks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [stock, setStock] = useState<string>("");
  const [length, setLength] = useState<string>("TIME_SERIES_MONTHLY");
  const [series, setSeries] = useState<string>("Monthly Time Series");
  const [stockData, setStockData] = useState<any>("");
  const [stockDisplay, setStockDisplay] = useState<string>("");
  const [isLineChart, setIsLineChart] = useState<boolean>(true);

  useEffect(() => {
    filteredData && handleSubmit(stock);
  }, [length]);

  const handleSubmit = (stockName: string) => {
    setIsError(false);
    setIsLoading(true);
    axios
      .get(
        "https://www.alphavantage.co/query?function=" +
          length +
          "&symbol=" +
          stockName +
          "&apikey=VJCJ63J47WBZBWDQ"
      )
      .then((response) => {
        const timeSeries = response.data[series];
        setStockDisplay(response.data["Meta Data"]["2. Symbol"]);
        const data = Object.keys(timeSeries).map((date) => {
          const weeklyData = timeSeries[date];
          return {
            date,
            open: parseFloat(weeklyData["1. open"]),
            high: parseFloat(weeklyData["2. high"]),
            low: parseFloat(weeklyData["3. low"]),
            close: parseFloat(weeklyData["4. close"]),
          };
        });

        const sortedData = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setStockData(sortedData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  // Get the date range for the past one year
  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const filteredData =
    stockData &&
    stockData.filter(
      (item: any) =>
        new Date(item.date) >= oneYearAgo && new Date(item.date) <= currentDate
    );

  return (
    <div className="w-full h-full pt-4 p-3 md:p-10 md:pt-1">
      <Box
        className="md:m-10 mb-1 m-2 border h-[87%] rounded-3xl bg-[#111633] border-[#242944] flex flex-col p-4"
        pos="relative"
      >
        <LoadingOverlay
          visible={isLoading}
          overlayBlur={2}
          className="rounded-3xl"
          overlayColor="#101532"
          loaderProps={{ size: "md", color: "#8C7CF0", variant: "bars" }}
          transitionDuration={15}
        />
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap mb-3 gap-2">
          <div className="flex w-full md:w-1/3 md:justify-start justify-center items-baseline gap-2">
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
              className="mb-1 p-1 bg-[#8C7CF0] text-white font-bold rounded-md"
            >
              Search
            </button>
          </div>
          <div className="flex flex-col w-full md:w-1/3 justify-center items-center border-x-2 border-x-gray-500">
            <p className="font-extrabold text-white text-3xl">
              {filteredData ? stockDisplay : "Select a stock"}
            </p>
            <div className="flex flex-row gap-1">
              <MantineTooltip label="Daily display">
                <button
                  //@ts-ignore
                  className={
                    length == "TIME_SERIES_DAILY_ADJUSTED"
                      ? "text-white font-extrabold w-6 h-6 flex justify-center items-center text-sm rounded-md bg-[#8C7CF0]"
                      : "text-white font-extrabold w-6 h-6 flex justify-center items-center text-sm rounded-md"
                  }
                  onClick={() => {
                    setLength("TIME_SERIES_DAILY_ADJUSTED"),
                      setSeries("Time Series (Daily)");
                  }}
                >
                  D
                </button>
              </MantineTooltip>
              <MantineTooltip label="Weekly display">
                <button
                  className={
                    length == "TIME_SERIES_WEEKLY"
                      ? "text-white font-extrabold w-6 h-6 flex justify-center items-center text-sm rounded-md bg-[#8C7CF0]"
                      : "text-white font-extrabold w-6 h-6 flex justify-center items-center text-sm rounded-md"
                  }
                  onClick={() => {
                    setLength("TIME_SERIES_WEEKLY"),
                      setSeries("Weekly Time Series");
                  }}
                >
                  W
                </button>
              </MantineTooltip>
              <MantineTooltip label="Monthly display">
                <button
                  className={
                    length == "TIME_SERIES_MONTHLY"
                      ? "text-white font-extrabold w-6 h-6 flex justify-center items-center text-sm rounded-md bg-[#8C7CF0]"
                      : "text-white font-extrabold w-6 h-6 flex justify-center items-center text-sm rounded-md"
                  }
                  onClick={() => {
                    setLength("TIME_SERIES_MONTHLY"),
                      setSeries("Monthly Time Series");
                  }}
                >
                  M
                </button>
              </MantineTooltip>
            </div>
          </div>
          <div className="flex w-full md:w-1/3 md:justify-end md:items-end justify-center items-center">
            <p className="text-sm text-white opacity-50 w-24">Line Chart</p>
            <Switch
              onChange={() => {
                setIsLineChart(!isLineChart);
              }}
              color="violet"
            />
            <p className="text-sm text-white opacity-50 w-24">Box Chart</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="90%">
          {isError ? (
            <p className="text-red-600 ml-2">
              Error! Make sure the stock symbol is correct or try again later!
            </p>
          ) : isLineChart ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="1 10" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend
              // onClick={(e) => {
              //   console.log(e) // WIP DISABLE SERIES
              // }}
              />
              <Line
                type="monotone"
                dataKey="high"
                stroke="#FFBB28"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#8884d8"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="open"
                stroke="#82ca9d"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#ff7300"
                dot={false}
              />
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="1 10" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                type="monotone"
                dataKey="high"
                fill="#FFBB28"
                animationDuration={3}
              />
              <Bar
                type="monotone"
                dataKey="low"
                fill="#8884d8"
                animationDuration={3}
              />
              <Bar
                type="monotone"
                dataKey="open"
                fill="#82ca9d"
                animationDuration={3}
              />
              <Bar
                type="monotone"
                dataKey="close"
                fill="#ff7300"
                animationDuration={3}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default Stocks;
