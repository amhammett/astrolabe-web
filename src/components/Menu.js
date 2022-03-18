import * as React from 'react';
import { Link } from 'react-router-dom';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoStories from '@mui/icons-material/AutoStories';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import EventNote from '@mui/icons-material/EventNote';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { drawerWidth, hashCode } from '../config/defaults';
import { useMediaQuery } from '../config/responsive';

export default function MenuDrawer(props) {
  const { drawerOpen, toggleDrawer } = props;
  const isMobile = useMediaQuery('(max-width: 48em)');
  const buildDateTime = process.env.CODEBUILD_START_TIME
    ? process.env.CODEBUILD_START_TIME
    : new Intl.DateTimeFormat('en-AU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        // timeStyle: 'long',
      }).format(Date.now());

  return (
    <Drawer
      open={drawerOpen}
      variant={isMobile ? 'temporary' : 'permanent'}
      sx={{
        width: drawerWidth,
      }}
    >
      <Box sx={{ width: drawerWidth }} role="presentation">
        <Toolbar />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={() => toggleDrawer(false)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/stats" disabled>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary={'Statistics'} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/locations"
            onClick={() => toggleDrawer(false)}
          >
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={'Locations'} />
          </ListItem>
          <ListItem button component={Link} to="/trials" disabled>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText primary={'Trials'} />
          </ListItem>
          <ListItem button component={Link} to="/adventures" disabled>
            <ListItemIcon>
              <HistoryEdu />
            </ListItemIcon>
            <ListItemText primary={'Adventures'} />
          </ListItem>
          <ListItem button component={Link} to="/tall-tails" disabled>
            <ListItemIcon>
              <AutoStories />
            </ListItemIcon>
            <ListItemText primary={'Tall Tales'} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/settings"
            onClick={() => toggleDrawer(false)}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          width: drawerWidth,
          fontSize: '0.8em',
          p: '8px 16px',
          mt: 5,
          textAlign: 'center',
          position: 'absolute',
          bottom: 0,
        }}
      >
        made with{' '}
        <Tooltip title={buildDateTime}>
          <FavoriteIcon sx={{ color: hashCode, fontSize: '1em' }} />
        </Tooltip>{' '}
        strawberry.coffee
      </Box>
    </Drawer>
  );
}
