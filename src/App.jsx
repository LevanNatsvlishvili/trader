import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/index.jsx';
import Dashboard from './pages/dashboard.jsx';
import Orders from './pages/orders.jsx';
import Positions from './pages/positions.jsx';
import Traders from './pages/traders.jsx';
import Settings from './pages/settings.jsx';
import './App.css';
import Charts from './pages/charts.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="charts" element={<Charts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="positions" element={<Positions />} />
          <Route path="traders" element={<Traders />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
