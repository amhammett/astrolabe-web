const visitedUrl = () => {
  const user = localStorage.getItem('key').replaceAll(' ', '-');
  return `${process.env.REACT_APP_API_LOCATION}/${user}`;
};

export const visitedEndpoint = visitedUrl();
