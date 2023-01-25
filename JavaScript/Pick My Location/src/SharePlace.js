import Map from "./UI/Map";
import Modal from "./UI/Modal";
import {
  getGeolocationAddress,
  getGeolocationCoordinates,
} from "./Utils/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserButton = document.getElementById("locate-btn");
    locateUserButton.addEventListener(
      "click",
      this.locateUserHandler.bind(this)
    );
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.shareBtn = document.getElementById("share-btn");
    this.shareBtn.addEventListener(
      "click",
      this.shareMyAddressHandler.bind(this)
    );
    this.shareLinkEl = document.getElementById("share-link");
  }

  shareMyAddressHandler() {
    if (!navigator.clipboard) {
      this.shareLinkEl.select();
      return;
    }
    navigator.clipboard
      .writeText(this.shareLinkEl.value)
      .then(() => console.log("Copied to clipboard", this.shareLinkEl.value))
      .catch((err) => console.error(err));
  }

  showMap(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;

    this.shareLinkEl.value = `${location.origin}/my-place?address=${encodeURI(
      address
    )}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  alert(message) {
    alert(message);
  }

  findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      return;
    }
    const modal = new Modal("loading-modal-content", "Loading location...");
    modal.show();
    getGeolocationCoordinates(address)
      .then((coords) => this.showMap(coords, address))
      .catch((err) => console.log(err));

    modal.hide();
  }

  locateUserHandler() {
    if (!navigator.geolocation) return;
    const modal = new Modal("loading-modal-content", "Loading location...");
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (sucess) => {
        const coordinates = {
          lat: sucess.coords.latitude,
          lng: sucess.coords.longitude,
        };
        getGeolocationAddress(coordinates)
          .then((address) => this.showMap(coordinates, address))
          .catch((err) => console.log(err));
        modal.hide();
      },
      (error) => {
        this.alert(error.message);
        modal.hide();
      }
    );
  }
}

new PlaceFinder();
