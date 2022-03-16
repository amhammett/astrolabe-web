import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';

export default function Settings() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          Save existing location data
        </Grid>
        <Grid item xs={4}>
          <Button
            startIcon={<SaveIcon />}
            variant="outlined"
            color="success"
            disabled
            onClick={() => {
              // const message = localStorage.getItem('locations')
              // const encrypted = CryptoJS.AES.encrypt(message, key);
              // console.log(encrypted.toString())
            }}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={8}>
          Import location data
        </Grid>
        <Grid item xs={4}>
          <Button
            startIcon={<UploadIcon />}
            variant="outlined"
            color="secondary"
            disabled
            onClick={() => {
              // const encrypted = 'foobar=' // add via modal input
              // const decrypted = CryptoJS.AES.decrypt(encrypted, key);
              // localStorage.setItem('locations', decrypted)
            }}
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={8}>
          Delete location data saved in LocalStorage?
        </Grid>
        <Grid item xs={4}>
          <Button
            startIcon={<DeleteIcon />}
            variant="outlined"
            color="error"
            onClick={() => {
              ['locations', 'regions', 'types'].forEach((key) => {
                console.log('deleting', key);
                const currentValue = localStorage.getItem(key);
                if (currentValue) {
                  localStorage.setItem(`${key}-bk`, localStorage.getItem(key));
                }
                localStorage.removeItem(key);
              });
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
