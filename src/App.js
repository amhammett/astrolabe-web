import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header toggleDrawer={toggleDrawer} />
        <Menu toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
        <Content drawerOpen={drawerOpen} />
      </div>
    </ThemeProvider>
  );
}

export default App;
