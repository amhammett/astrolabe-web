import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { visitedGet, visitedPut } from '../api/userApi';
import { Filter } from '../components/Filter';
import { useMediaQuery } from '../config/responsive';

export function LocationRow(props) {
  const { data, locations, setHasChanges, setLocations, updateVisited } = props;
  const isMobile = useMediaQuery('(max-width: 48em)');

  const displayData = (props) => {
    const { data, filterRegions, filterSearch, filterTypes, filterVisited } =
      props;
    let result = true;

    // hide if visited
    if (filterVisited && data.checked) {
      result = false;
    }

    // hide if filtered by region and region not selected
    if (filterRegions.length > 0 && filterRegions.indexOf(data.region) === -1) {
      result = false;
    }

    // hide if filtered by type and type not selected
    if (filterTypes.length > 0 && filterTypes.indexOf(data.type) === -1) {
      result = false;
    }

    if (
      filterSearch &&
      data.name.toLowerCase().indexOf(filterSearch.toLowerCase()) === -1 &&
      data.coords.toLowerCase().indexOf(filterSearch.toLowerCase())
    ) {
      result = false;
    }

    return result;
  };

  const visitedToggle = (event, name) => {
    const updatedLocations = Object.keys(locations).map((el) => {
      if (locations[el].name === name) {
        locations[el].checked = event.target.checked;
      }
      return locations[el];
    });
    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(locations));
  };

  return !displayData(props, data) ? null : (
    <TableRow
      key={data.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      disabled
    >
      <TableCell>
        <Checkbox
          checked={data.checked}
          onClick={(event) => {
            visitedToggle(event, data.name);
            setHasChanges(true);
            updateVisited(data.name, data.checked);
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.coords}</TableCell>
      {!isMobile && <TableCell>{data.region}</TableCell>}
      {!isMobile && <TableCell>{data.type}</TableCell>}
    </TableRow>
  );
}

export function Locations(props) {
  const { sync } = props;
  const [loading, setLoading] = React.useState(true);
  const [syncing, setSyncing] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [locations, setLocations] = React.useState({});
  const [visited, setVisited] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  // filters
  const [filterRegions, setFilterRegions] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState(false);
  const [filterTypes, setFilterTypes] = React.useState([]);
  const [filterVisited, setFilterVisited] = React.useState(false);
  // more
  const isMobile = useMediaQuery('(max-width: 48em)');
  const [hasChanges, setHasChanges] = React.useState(false);

  const processLocations = (data) => {
    const savedVisits = localStorage.getItem('visited');
    savedVisits && setVisited(JSON.parse(savedVisits));

    const updatedLocations = {};
    data.forEach((location) => {
      if (!location.hidden) {
        if (savedVisits && savedVisits.indexOf(location.name) !== -1) {
          location.checked = true;
        } else {
          location.checked = false;
        }
        updatedLocations[location.name] = location;
        return location;
      }
    });

    setLocations(updatedLocations);
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    setLoading(false);
  };

  const processRegions = (data) => {
    setRegions(data);
    localStorage.setItem('regions', JSON.stringify(data));
  };

  const processTypes = (data) => {
    setTypes(data);
    localStorage.setItem('types', JSON.stringify(data));
  };

  const updateVisited = (name, checked) => {
    let visitedUpdate;
    if (visited > 0) {
      console.log('reset visited');
      setVisited([]);
    }

    if (checked && visited.indexOf(name) === -1) {
      visited.push(name);
      visitedUpdate = visited;
    } else if (!checked) {
      const nameInArray = visited.indexOf(name);
      if (nameInArray !== -1) {
        visited.splice(nameInArray, 1);
        visitedUpdate = visited;
      }
    }

    if (visitedUpdate) {
      setVisited(visitedUpdate);
    }
  };

  const fetchLocationData = () => {
    fetch('/data/location.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        processLocations(data.locations, visited);
        processRegions(data.regions);
        processTypes(data.types);
      })
      .catch((e) => {
        console.log(e);
        const savedLocations = localStorage.getItem('locations');
        savedLocations && setLocations(JSON.parse(savedLocations));
        const savedRegions = localStorage.getItem('regions');
        savedRegions && setRegions(JSON.parse(savedRegions));
        const savedTypes = localStorage.getItem('types');
        savedTypes && setTypes(JSON.parse(savedTypes));
        setLoading(false);
      });
  };

  React.useEffect(() => {
    syncing && loading && visitedGet(setSyncing, setVisited);
    !syncing && loading && fetchLocationData();
    syncing && !sync && setSyncing(false);

    if (hasChanges && sync) {
      setTimeout(() => {
        console.log('changes require uploading');
        visitedPut(visited, setHasChanges);
      }, 2000);
    } else if (hasChanges) {
      localStorage.setItem('visited', JSON.stringify(visited));
      setHasChanges(false);
    }
  }, [hasChanges, loading, syncing]);

  return (
    <Box>
      <h2>Locations</h2>
      {loading ? (
        <Box
          sx={{
            margin: '0 auto',
            width: '80%',
          }}
        >
          <LinearProgress />
        </Box>
      ) : (
        <Box>
          <Filter
            data={data}
            filterRegions={filterRegions}
            setFilterRegions={setFilterRegions}
            filterSearch={filterSearch}
            setFilterSearch={setFilterSearch}
            filterTypes={filterTypes}
            setFilterTypes={setFilterTypes}
            filterVisited={filterVisited}
            setFilterVisited={setFilterVisited}
            regions={regions}
            types={types}
          />
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: '300',
                '@media (min-width:769px)': {
                  minWidth: '650',
                },
              }}
              aria-label="simple table"
              size={isMobile ? 'small' : 'medium'}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Visited</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>{isMobile ? 'Coords' : 'Coordinates'}</TableCell>
                  {!isMobile && <TableCell>Region</TableCell>}
                  {!isMobile && <TableCell>Type</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(locations).map((id) => {
                  return (
                    <LocationRow
                      key={id}
                      data={locations[id]}
                      filterRegions={filterRegions}
                      filterSearch={filterSearch}
                      filterTypes={filterTypes}
                      filterVisited={filterVisited}
                      locations={locations}
                      setHasChanges={setHasChanges}
                      setLocations={setLocations}
                      updateVisited={updateVisited}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
