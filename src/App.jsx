import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/index.jsx'
import { APP_ROUTES, DEFAULT_PATH } from './routes.js'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to={DEFAULT_PATH} replace />} />
          {APP_ROUTES.map(({ path, Component }) => (
            <Route key={path} path={path.slice(1)} element={<Component />} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={DEFAULT_PATH} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
