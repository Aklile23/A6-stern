import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import FileExplorer from './pages/Dashboard/FileExplorer';
import { SelectedDateProvider } from './components/selectedDate ';
import Projectx from './pages/Projectx';
import Projecty from './pages/Projecty';
import HomePage from './pages/HomePage'; // Import your new HomePage component
import InteractiveViewer from './components/InteractiveViewer';
import StaticViewer from './components/StaticViewer';
import Buttons from './pages/UiElements/Buttons';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SelectedDateProvider>
      {pathname === '/' ? (
        <Routes>
          <Route index element={<HomePage />} /> {/* Full-screen homepage */}
        </Routes>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route
              path="/A6_Stern"
              element={
                <>
                  <PageTitle title="A6_stern | Projects Dashboard" />
                  <FileExplorer />
                </>
              }
            />
            <Route
              path="/projectx"
              element={
                <>
                  <PageTitle title="Project X | Projects Dashboard" />
                  <Projectx />
                </>
              }
            />
            <Route
              path="/projecty"
              element={
                <>
                  <PageTitle title="Project Y | Projects Dashboard" />
                  <Projecty />
                </>
              }
            />
            <Route path="/interactive-viewer" element={<InteractiveViewer />} />
            <Route path="/static-viewer" element={<StaticViewer />} />
          </Routes>
        </DefaultLayout>
      )}
    </SelectedDateProvider>
  );
}

export default App;
