import { visitedEndpoint } from '../config/api';
import { FEATURE_API_ENABLE } from '../config/features';

export function visitedPut(visited, setHasChanges) {
  if (FEATURE_API_ENABLE) {
    fetch(visitedEndpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visited),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        localStorage.setItem('visited', JSON.stringify(visited));
        setHasChanges(false);
      });
  } else {
    localStorage.setItem('visited', JSON.stringify(visited));
    setHasChanges(false);
  }
}

export function visitedGet(setSyncing, setVisited) {
  if (FEATURE_API_ENABLE) {
    fetch(visitedEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setSyncing(false);
      });
  } else {
    setSyncing(false);
  }
}
