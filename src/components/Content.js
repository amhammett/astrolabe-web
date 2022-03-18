import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import ReactGA from 'react-ga';
import Toolbar from '@mui/material/Toolbar';

import Home from '../views/Home';
import Locations from '../views/Locations';
import Settings from '../views/Settings';
import { drawerWidth } from '../config/defaults';

function isProduction() {
  return document.location.hostname === process.env.REACT_APP_PROD_URL;
}

function initialiseAnalytics() {
  if (isProduction()) {
    const TRACKING_ID = process.env.REACT_APP_GA_ID;
    ReactGA.initialize(TRACKING_ID, {
      debug: true,
    });
  }
}

function usePageTracking() {
  const location = useLocation();
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    initialiseAnalytics();
    setInitialized(true);
  }, []);

  React.useEffect(() => {
    if (initialized && isProduction()) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
}

export default function Content(props) {
  const [sync, setSync] = React.useState(
    localStorage.getItem('sync') !== null &&
      localStorage.getItem('sync') === 'true'
  );
  usePageTracking();

  return (
    <Box
      sx={{
        m: '25px',
        '@media (min-width:769px)': {
          marginLeft: `calc(25px + ${drawerWidth}px)`,
        },
      }}
    >
      <Toolbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations sync={sync} />} />
        <Route
          path="/settings"
          element={<Settings sync={sync} setSync={setSync} />}
        />
      </Routes>
    </Box>
  );
}
