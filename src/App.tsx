import { useState } from "react";
import "./App.css";
import Tracked from "./components/Tracked";
import Stocks from "./components/Stocks";

function App() {
  //true - Graph , False- favourites
  const [isGraph, setIsGraph] = useState(true);

  let date;
  const today = new Date();
  date = today.getDate() + ".";
  today.getMonth() < 9
    ? (date = date + "0" + (today.getMonth() + 1))
    : +today.getMonth() + 1;
  date = date + "." + today.getFullYear();
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="w-full h-[4.5rem] flex items-center bg-[#101532] border-b-2 border-[#242944] md:justify-between px-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3799/3799817.png"
          className="h-full p-2 hidden md:block"
        />
        <div className="h-full w-full md:w-96">
          <button
            //@ts-ignore
            className={
              isGraph == false
                ? "border-b-4 p-2 text-white h-full border-[#8C7CF0] md:w-48 w-1/2 font-bold transition ease-in-out"
                : "p-2 text-white opacity-60 md:w-48 w-1/2"
            }
            onClick={() => setIsGraph(false)}
          >
            Tracked
          </button>
          <button
            //@ts-ignore
            className={
              isGraph
                ? "border-b-4 p-2 text-white h-full border-[#8C7CF0] md:w-48 w-1/2 font-bold transition ease-in-out"
                : "p-2 text-white opacity-60 md:w-48 w-1/2"
            }
            onClick={() => setIsGraph(true)}
          >
            Stocks
          </button>
        </div>
        <div className="p-2 text-white opacity-40 hidden md:block">{date}</div>
      </div>
      {isGraph ? <Stocks /> : <Tracked />}
    </div>
  );
}

export default App;
