import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

// todo: move to consts
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const FilterRegion = (props) => {
  const { filterRegions, setFilterRegions, regions } = props;
  const handleRegionOption = (event) => {
    const {
      target: { value },
    } = event;
    setFilterRegions(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multiple-regions-label">Regions</InputLabel>
      <Select
        labelId="multiple-regions-label"
        id="multiple-regions"
        multiple
        value={filterRegions}
        onChange={handleRegionOption}
        input={<OutlinedInput id="select-multiple-regions" label="Regions" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {regions.map((region) => (
          <MenuItem key={region} value={region}>
            {region}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FilterTypes = (props) => {
  const { filterTypes, setFilterTypes, types } = props;
  const handleTypeOption = (event) => {
    const {
      target: { value },
    } = event;
    setFilterTypes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multiple-islandTypes-label">Island Type</InputLabel>
      <Select
        labelId="multiple-islandTypes-label"
        id="multiple-islandTypes"
        multiple
        value={filterTypes}
        onChange={handleTypeOption}
        input={
          <OutlinedInput id="select-multiple-islandTypes" label="Island Type" />
        }
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {types.map((islandType) => (
          <MenuItem key={islandType} value={islandType}>
            {islandType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const FilterSearch = (props) => {
  const { setFilterSearch } = props;
  const handleSearchInput = (event) => {
    const {
      target: { value },
    } = event;
    setFilterSearch(value);
  };

  return (
    <FormControl sx={{ m: 1 }}>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        onChange={handleSearchInput}
        autoComplete="off"
      />
    </FormControl>
  );
};

const FilterVisited = (props) => {
  const { filterVisited, setFilterVisited } = props;
  return (
    <FormControl sx={{ m: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={filterVisited}
            onChange={() => setFilterVisited(!filterVisited)}
          />
        }
        label="Hide Visited"
      />
    </FormControl>
  );
};

const FilterMore = (props) => {
  const { filtersOpen, setFiltersOpen } = props;
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
  return (
    <FormControl sx={{ m: 2 }}>
      <FilterListIcon
        onClick={() => {
          toggleFilters();
        }}
      />
    </FormControl>
  );
};

export const Filter = (props) => {
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  return (
    <Box>
      <FilterSearch {...props} />
      <FilterMore
        {...props}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
      />
      <Box>
        {filtersOpen && <FilterRegion {...props} />}
        {filtersOpen && <FilterTypes {...props} />}
        {filtersOpen && <FilterVisited {...props} />}
      </Box>
    </Box>
  );
};
