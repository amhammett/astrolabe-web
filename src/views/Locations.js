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

import { Filter } from '../components/Filter';
import { useMediaQuery } from '../config/responsive';

function LocationRow(props) {
  const { data, locations, setLocations } = props;
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
          onClick={(event) => visitedToggle(event, data.name)}
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

export default function Locations() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [locations, setLocations] = React.useState({});
  const [regions, setRegions] = React.useState([]);
  const [types, setTypes] = React.useState([]);
  // filters
  const [filterRegions, setFilterRegions] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState(false);
  const [filterTypes, setFilterTypes] = React.useState([]);
  const [filterVisited, setFilterVisited] = React.useState(false);
  // more
  const isMobile = useMediaQuery('(max-width: 48em)');

  const processLocations = (data) => {
    const savedLocations = JSON.parse(localStorage.getItem('locations'));
    const updatedLocations = {};
    for (let i = 0; i < data.length; i++) {
      if (!data[i].hidden) {
        if (savedLocations && savedLocations[data[i].name]) {
          data[i].checked = savedLocations[data[i].name].checked || false;
        } else {
          data[i].checked = false;
        }
        updatedLocations[data[i].name] = data[i];
      }
    }
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

  const getData = () => {
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
        processLocations(data.locations);
        processRegions(data.regions);
        processTypes(data.types);
      })
      .catch((e) => {
        setLocations(JSON.parse(localStorage.getItem('locations')));
        setRegions(JSON.parse(localStorage.getItem('regions')));
        setTypes(JSON.parse(localStorage.getItem('types')));
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

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
                      filterRegions={filterRegions}
                      filterSearch={filterSearch}
                      filterTypes={filterTypes}
                      filterVisited={filterVisited}
                      setLocations={setLocations}
                      data={locations[id]}
                      locations={locations}
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
