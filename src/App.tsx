import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './pages/not-found';
import MainLayout from './components/layout/main-layout';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<MainLayout />}>
            <Route key={'/'} path={'/'} element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
