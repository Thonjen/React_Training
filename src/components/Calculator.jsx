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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/60 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-5xl">
        {/* Calculator Section */}
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center drop-shadow-lg">
            Dynamic Calculator
          </h1>
          <div className="w-full bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-gray-200">
            <div className="space-y-4">
              {numbers.map((num, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={num}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-full p-4 text-lg rounded-lg border-2 border-yellow-400 bg-white/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-inner"
                  />
                  <motion.button
                    onClick={() => removeInput(index)}
                    whileHover={{ scale: 1.1 }}
                    className="bg-yellow-500 text-white p-4 rounded-full hover:bg-yellow-600 transition-all duration-300"
                  >
                    X
                  </motion.button>
                </div>
              ))}
              <motion.button
                onClick={addInput}
                whileHover={{ scale: 1.05 }}
                className="w-full border bg-yellow-200 text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
              >
                Add Input
              </motion.button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {["add", "subtract", "multiply", "divide"].map((operation) => (
                <motion.button
                  key={operation}
                  onClick={() => calculate(operation)}
                  whileHover={{ scale: 1.1 }}
                  className="border text-3xl font-bold bg-yellow-300 text-gray-800 py-4 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-xl"
                >
                  {operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "*" : "/"}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col items-center bg-yellow-100 p-6 rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-800 drop-shadow-lg">Summary</h1>
          <div className="w-full space-y-4 text-center text-gray-800">
            <div className="border text-lg font-bold bg-yellow-300 p-4 rounded-xl shadow-md">
              Result: <span className="text-black">{result}</span>
            </div>
            <div className="border text-lg font-bold bg-yellow-300 p-4 rounded-xl shadow-lg">
              Solution: <span className="text-black">{solution}</span>
            </div>
            <div className="border text-lg font-bold bg-yellow-200 p-4 rounded-xl shadow-md">
              Inputs with Values: {haveNumbers()}
            </div>
            <div className="border text-lg font-bold bg-yellow-200 p-4 rounded-xl shadow-md">
              Total Inputs: {numbers.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
