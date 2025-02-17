import React, { useState } from "react";
import Calculator from "./components/Calculator";
import List from "./components/List/List";
import Counter from "./components/Counter";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-200 to-yellow-500 text-center p-8">
      {activeComponent === null && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 drop-shadow-lg mb-6"
          >
            Select an Option
          </motion.h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {[
              { label: "Calculator", color: "bg-yellow-600", key: "calculator" },
              { label: "Counter", color: "bg-yellow-500", key: "counter" },
              { label: "List", color: "bg-yellow-400", key: "list" },
            ].map(({ label, color, key }) => (
              <motion.button
                key={key}
                className={`w-full border bg-gradient-to-r from-[#FFEB00] to-[#F4FFC3] text-gray-800 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg`}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveComponent(key)}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
      
      {activeComponent !== null && (
        <>
          <motion.button
            className="mb-6 px-6 py-3 bg-gray-700 text-white rounded-xl shadow-lg flex items-center space-x-2 hover:scale-105 transition-all duration-300"
            onClick={() => setActiveComponent(null)}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="text-xl" />
            <span>Back</span>
          </motion.button>
          {activeComponent === "calculator" && <Calculator />}
          {activeComponent === "counter" && <Counter />}
          {activeComponent === "list" && <List />}
        </>
      )}
    </div>
  );
}

export default App;
