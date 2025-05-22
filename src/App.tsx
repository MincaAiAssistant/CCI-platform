import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './pages/not-found';
import MainLayout from './components/layout/main-layout';
import Dashboard from './pages/dashboard';
import AuthPage from './pages/auth-page';
import AgentsInternal from './pages/agents-internal';

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<MainLayout />}>
            <Route path={'/'} element={<Dashboard />} />
            <Route path="/agents-internal" element={<AgentsInternal />} />
          </Route>
          <Route path={'/auth'} element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
