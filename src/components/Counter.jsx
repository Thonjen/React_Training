import React, { useState } from "react";
import { motion } from "framer-motion";

function Counter() {
  const [num, setCount] = useState(0);
  
  function reset() {
    setCount(0);
  }

  function add() {
    setCount(num + 1);
  }

  function minus() {
    if (num === 0) {
      setCount(0);
    } else {
      setCount(num - 1);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-yellow-300 space-y-6 text-center w-80">
        <motion.h1
          className="text-4xl font-extrabold text-gray-800"

        >
          Counter
        </motion.h1>

        <motion.div
          className="text-6xl font-bold text-gray-900 drop-shadow-xl"
          whileHover={{ scale: 1.1 }}
        >
          {num}
        </motion.div>


        <div className="space-x-4">
          <motion.button
            onClick={add}
            className="mt-8 w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            + Add
          </motion.button>

          <motion.button
            onClick={minus}
            className="mt-4 w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            - Minus
          </motion.button>
        </div>

        <motion.button
          onClick={reset}
          className="w-full border bg-gradient-to-r from-[#00000] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg "
          whileHover={{ scale: 1.1 }}
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
}

export default Counter;
