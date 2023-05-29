import { useState } from "react";
import "./App.css";

function App() {
  //true - Graph , False- favourites
  const [isGraph, setIsGraph] = useState(true);

  return (
    <>
      <div className="w-full h-[4.5rem] flex justify-center items-center bg-[#101532] border-b-2 border-[#242944]">
        <button
          //@ts-ignore
          className={
            isGraph
              ? "border-b-4 p-2 text-white h-full border-[#8C7CF0] lg:w-48 w-1/2 font-bold transition ease-in-out"
              : "p-2 text-white opacity-60 lg:w-48 w-1/2"
          }
          onClick={() => setIsGraph(true)}
        >
          Favourites
        </button>
        <button
          //@ts-ignore
          className={
            isGraph == false
              ? "border-b-4 p-2 text-white h-full border-[#8C7CF0] lg:w-48 w-1/2 font-bold transition ease-in-out"
              : "p-2 text-white opacity-60 lg:w-48 w-1/2"
          }
          onClick={() => setIsGraph(false)}
        >
          Stocks
        </button>
      </div>
    </>
  );
}

export default App;
