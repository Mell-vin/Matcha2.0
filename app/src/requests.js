const GOOGLE_MAP_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export const getLocationByLatLng = (lat, lng) =>
  axios.get(
    `${GOOGLE_MAP_API_URL}?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_APIKEY}`
  );
