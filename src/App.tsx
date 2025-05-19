import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './pages/not-found';

function App() {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
