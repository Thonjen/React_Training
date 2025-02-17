import React, { useState } from 'react';
import Calculator from './components/Calculator';
import List from './components/List/List';
import Counter from './components/Counter';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-yellow-400 text-center p-5">
      {activeComponent === null && (
        <>
          <h1 className="text-2xl font-bold mb-4">Select an Option</h1>
          <div className="space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600" onClick={() => setActiveComponent('calculator')}>Calculator</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600" onClick={() => setActiveComponent('counter')}>Counter</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600" onClick={() => setActiveComponent('list')}>List</button>
          </div>
        </>
      )}
      
      {activeComponent !== null && (
        <>
          <button className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600" onClick={() => setActiveComponent(null)}>Back</button>
          {activeComponent === 'calculator' && <Calculator />}
          {activeComponent === 'counter' && <Counter />}
          {activeComponent === 'list' && <List />}
        </>
      )}
    </div>
  );
}

export default App;