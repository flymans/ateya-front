import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<ProductForm />} />
        <Route path="/" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;