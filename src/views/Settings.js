import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import KeyIcon from '@mui/icons-material/Key';
import SaveIcon from '@mui/icons-material/Save';
import Switch from '@mui/material/Switch';
import UploadIcon from '@mui/icons-material/Upload';

function generateKey(words) {
  return (
    words.adjectives[Math.floor(Math.random() * words.adjectives.length)] +
    ' ' +
    words.adjectives[Math.floor(Math.random() * words.adjectives.length)] +
    ' ' +
    words.nouns[Math.floor(Math.random() * words.nouns.length)]
  );
}

export default function Settings(props) {
  const { upload, setUpload } = props;
  const [words, setWords] = React.useState([]);
  const [key, setKey] = React.useState('');
  const [potentialKey, setPotentialKey] = React.useState('');

  const fetchData = () => {
    fetch('/data/words.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((words) => {
        setWords(words);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const findKey = () => {
    const savedKey = localStorage.getItem('key');
    setKey(savedKey);
  };

  React.useEffect(() => {
    fetchData();
    findKey();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        {key ? (
          <>
            <Grid item xs={8}>
              Your key
            </Grid>
            <Grid item xs={4}>
              {key}
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={8}>
              Generate Key
            </Grid>
            <Grid item xs={4}>
              <Button
                startIcon={<KeyIcon />}
                variant="outlined"
                color="primary"
                onClick={() => {
                  setPotentialKey(generateKey(words));
                }}
              >
                Generate
              </Button>
            </Grid>
          </>
        )}
        {!key && potentialKey && (
          <>
            <Grid item xs={8}>
              {potentialKey}
            </Grid>
            <Grid item xs={4}>
              <Button
                startIcon={<SaveIcon />}
                variant="outlined"
                color="primary"
                onClick={() => {
                  setKey(potentialKey);
                  localStorage.setItem('key', potentialKey);
                }}
              >
                Save
              </Button>
            </Grid>
          </>
        )}
        {key && (
          <>
            <Grid item xs={8}>
              Upload data
            </Grid>
            <Grid item xs={4}>
              <Switch checked={upload} onChange={() => setUpload(!upload)} />
            </Grid>
          </>
        )}
        <Grid item xs={8}>
          Delete site data from LocalStorage?
        </Grid>
        <Grid item xs={4}>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={() => {
              ['locations', 'regions', 'types', 'key'].forEach((key) => {
                console.log('deleting', key);
                const currentValue = localStorage.getItem(key);
                if (currentValue) {
                  localStorage.setItem(`${key}-bk`, localStorage.getItem(key));
                }
                localStorage.removeItem(key);
              });
              setKey('');
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
