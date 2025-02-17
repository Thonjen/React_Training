import React, { useState } from "react";
import { motion } from "framer-motion";

function Calculator() {
  const [numbers, setNumbers] = useState([0]);
  const [result, setResult] = useState(0);
  const [solution, setSolution] = useState("");

  function handleChange(index, value) {
    const newNumbers = [...numbers];
    newNumbers[index] = value === "" ? 0 : parseFloat(value);
    setNumbers(newNumbers);
  }

  function addInput() {
    setNumbers([...numbers, 0]);
  }

  function removeInput(index) {
    if (numbers.length > 1) {
      setNumbers(numbers.filter((_, i) => i !== index));
    }
  }

  function calculate(operation) {
    let res = numbers[0] || 0;
    let equation = numbers[0].toString();

    for (let i = 1; i < numbers.length; i++) {
      const num = numbers[i] || 0;

      switch (operation) {
        case "add":
          res += num;
          equation += ` + ${num}`;
          break;
        case "subtract":
          res -= num;
          equation += ` - ${num}`;
          break;
        case "multiply":
          res *= num;
          equation += ` × ${num}`;
          break;
        case "divide":
          res = num !== 0 ? res / num : res;
          equation += ` ÷ ${num}`;
          break;
        default:
          break;
      }
    }

    setResult(res);
    setSolution(`${equation} = ${res}`);
  }

  function haveNumbers() {
    return numbers.filter((num) => num > 0).length;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-2 bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-6xl border border-gray-300 gap-8">
        <div className="flex flex-col items-center">
          <h1 className="mb-6 text-4xl font-extrabold text-gray-800 text-center drop-shadow-lg">
            Dynamic Calculator
          </h1>
          <div className="w-full bg-white p-6 rounded-xl shadow-lg border border-gray-300">
            <div className="space-y-4 grid grid-cols-2 gap-4">
              {numbers.map((num, index) => (
                <div key={index} className="flex items-center space-x-2 w-full">
                  <input
                    type="number"
                    value={num}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-full p-3 rounded-lg border-2 border-yellow-400 bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all shadow-inner"
                  />
                  <motion.button
                    onClick={() => removeInput(index)}
                    whileHover={{ scale: 1.1 }}
                    className="border border-yellow-500 text-yellow-500 text-center p-3 rounded hover:px-6 hover:bg-yellow-500 hover:text-white transition-all duration-300 ease-in-out"
                  >
                    X
                  </motion.button>
                </div>
              ))}
              <motion.button
                onClick={addInput}
                whileHover={{ scale: 1.1 }}
                className="w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                <span className="text-[1rem] font-bold">+</span>Add Input
              </motion.button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.button
                onClick={() => calculate("add")}
                whileHover={{ scale: 1.1 }}
                className="border text-3xl font-bold bg-yellow-300 text-gray-800 py-4 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                +
              </motion.button>
              <motion.button
                onClick={() => calculate("subtract")}
                whileHover={{ scale: 1.1 }}
                className="border text-3xl font-bold bg-yellow-300 text-gray-800 py-4 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                -
              </motion.button>
              <motion.button
                onClick={() => calculate("multiply")}
                whileHover={{ scale: 1.1 }}
                className="border text-3xl font-bold bg-yellow-300 text-gray-800 py-4 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                *
              </motion.button>
              <motion.button
                onClick={() => calculate("divide")}
                whileHover={{ scale: 1.1 }}
                className="border text-3xl font-bold bg-yellow-300 text-gray-800 py-4 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                /
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-yellow-100 p-6 rounded-xl shadow-lg">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-800 drop-shadow-lg">Summary</h1>
          <div className="w-full space-y-4 text-center text-gray-800">
            <div className="border text-lg font-bold bg-yellow-300 p-3 rounded-xl shadow-md">
              Result: <span className="text-black">{result}</span>
            </div>
            <div className="border text-lg font-bold bg-yellow-300 p-4 rounded-xl shadow-lg">
              Solution: <span className="text-black">{solution}</span>
            </div>

            <div className="border text-lg font-bold bg-yellow-200 p-3 rounded-xl shadow-md">
              Inputs with Values: {haveNumbers()}
            </div>
            <div className="border text-lg font-bold bg-yellow-200 p-3 rounded-xl shadow-md">
              Total Inputs: {numbers.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
