import { useState, useEffect } from "react";

const Tracked = () => {
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("stocks")!) ?? []
  );

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(favourites));
  }, [favourites]);

  const [stockName, setStockName] = useState<string>("");

  const handleSubmit = (stock: string) => {
    const newArr = [...favourites];
    newArr.push(stock);
    setFavourites(newArr);
  };

  return (
    <div className="flex flex-col items-center mt-5 w-full h-full">
      <input
        className="w-[36rem] h-[4rem] text-xl bg-[#111633] border-[#242944] border rounded-md p-2 text-opacity-60 text-white placeholder-gray-500 mb-4"
        placeholder="Enter a stock to track..."
        onChange={(e) => {
          setStockName(e.target.value);
        }}
      />
      <button
        onClick={() => handleSubmit(stockName)}
        className="mb-1 p-2 w-[24rem] bg-[#8C7CF0] text-white font-bold rounded-md"
      >
        Track stock
      </button>

      <div className="flex flex-col gap-5 mt-2">
        {favourites.map((item) => {
          return (
            <div className="w-[48rem] h-[4rem] bg-[#111633] rounded-xl flex justify-start p-3 items-center text-white text-2xl text-extrabold">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tracked;
