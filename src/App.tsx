import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './pages/not-found';
import MainLayout from './components/layout/main-layout';
import { protectedRoutes } from './routes/config/protectedRoutes';
import ProtectedRouter from './routes/protectedRouter';
import PublicRouter from './routes/publicRouter';
import { publicRoutes } from './routes/config/publicRoutes';

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRouter />}>
            <Route element={<MainLayout />}>
              {protectedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Route>
          </Route>
          <Route element={<PublicRouter />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
