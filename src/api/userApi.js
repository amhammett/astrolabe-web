import { visitedEndpoint } from '../config/api';
import { features } from '../config/settings';

export function visitedGet(setSyncing, setVisited) {
  if (features.FEATURE_API_ENABLE && visitedEndpoint) {
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

export function visitedPut(visited, setHasChanges) {
  if (features.FEATURE_API_ENABLE && visitedEndpoint) {
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
  }
}
