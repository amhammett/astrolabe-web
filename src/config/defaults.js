import githash from './githash.json';

export const drawerWidth = 240;
export const hashCode = githash.gitsha
  ? `#${githash.gitsha.substring(0, 6)}`
  : '#ff000';
