import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useMediaQuery } from '../config/responsive';

export default function Header(props) {
  const { toggleDrawer } = props;
  const isMobile = useMediaQuery('(max-width: 48em)');

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Compass
          </Typography>
          {isMobile && (
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => {
                toggleDrawer();
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
