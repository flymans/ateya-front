import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductForm from './components/ProductForm';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/:qrCodeId" element={<ProductForm />} />
          <Route path="/" element={<ProductForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
