import Map from "./UI/Map";

export class ShowLocation {
  constructor(coordinates, address) {
    new Map(coordinates);
    const heading = document.querySelector("header h1");
    heading.textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = {
  lat: +queryParams.get("lat"),
  lng: +queryParams.get("lng"),
};
const address = queryParams.get("address");
new ShowLocation(coordinates, address);
