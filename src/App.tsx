import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
