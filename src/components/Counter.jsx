import React, { useState } from 'react';

function Calculator() {
  const [num, setCount] = useState(0);
  function reset() {
    setCount(0);
  }

  function add() {
    setCount(num + 1);
  }

  function minus() {
    if (num == 0) {
      setCount(0);
    } else {
      setCount(num - 1);
    }
  }

  return (
    <div className=" mx-auto p-6 space-y-8 bg-gradient-to-br from-[#FFEB00] to-[#F8F8F8]">
      <div className="section flex justify-between items-center">
        <div className="right">
          <h1 className="text-3xl font-bold text-black">Counter</h1>
          <div className="button-group space-x-4 mt-4">
            <button onClick={add} className=" border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl 
                      transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">Increment +1</button>
            <button onClick={minus} className=" border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl 
                      transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">Decrement -1</button>
            <button onClick={reset} className=" border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl 
                      transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">Reset</button>
          </div>
        </div>
        <div className="left">
          <h2 className="text-2xl font-semibold text-black mr-10">Number: {num}</h2>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
