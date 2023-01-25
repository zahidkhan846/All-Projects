import { env } from "../../app.config";

export const getGeolocationAddress = async (coordinates) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${env.apiKey}`
    );
    if (!res.ok) throw new Error("Could not find address plaese try later!");
    const data = await res.json();
    if (data.error_message) throw new Error(data.error_message);
    const address = data.results[0].formatted_address;
    return address;
  } catch (error) {
    console.error(error.message);
  }
};

export const getGeolocationCoordinates = async (address) => {
  try {
    const encoadedAddress = encodeURI(address);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encoadedAddress}&key=${env.apiKey}`
    );
    if (!res.ok) throw new Error("Could not find address plaese try later!");
    const data = await res.json();
    if (data.error_message) throw new Error(data.error_message);
    const coordinates = data.results[0].geometry.location;
    return coordinates;
  } catch (error) {
    console.error(error.message);
  }
};
