const visitedUrl = () => {
  let result = null;
  const key = localStorage.getItem('key');

  if (key) {
    const user = key.replaceAll(' ', '-');
    result = `${process.env.REACT_APP_API_LOCATION}/${user}`;
  }

  return result;
};

export const visitedEndpoint = visitedUrl();
