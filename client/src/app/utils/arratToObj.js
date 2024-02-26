const arrayToObj = (arr) => {
  const { coordinates } = arr;
  const res = coordinates.map((item) => {
    const [lat, lng] = item;
    return { lat: lng, lng: lat };
  });

  return res;
};
export default arrayToObj;
