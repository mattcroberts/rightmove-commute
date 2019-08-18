const apiBaseUrl = "http://irix.dev/travel-time";

const tag = document.querySelector('img[alt="Get map and local information"]');

const url = new URL(tag.src);
const origin = {
  lat: url.searchParams.get("latitude"),
  long: url.searchParams.get("longitude")
};

chrome.storage.sync.get(
  ["destinationLatitude", "destinationLongitude"],
  ({ destinationLatitude, destinationLongitude }) => {
    const destination = {
      lat: destinationLatitude,
      long: destinationLongitude
    };

    console.log({ destination });

    if (!destination.lat || !destination.long) {
      throw new Error("Missing Destination");
    }

    const cityMapperLink = `https://citymapper.com?startcoord=${origin.lat},${
      origin.long
    }&endcoord${destination.lat},${destination.long}`;

    const apiUrl = `${apiBaseUrl}/travel-time?originLat=${
      origin.lat
    }&originLong=${origin.long}&destinationLat=${
      destination.lat
    }&destinationLong=${destination.long}`;

    const link = document.createElement("a");
    link.innerHTML = "See on CityMapper";
    link.setAttribute("href", cityMapperLink);

    const textElement = document.createElement("div");
    textElement.innerHTML = "Loading...";

    const element = document.createElement("div");
    element.setAttribute("id", "rmCommute");
    element.appendChild(textElement);
    element.appendChild(link);

    const style = {
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 999999,
      backgroundColor: "chartreuse",
      padding: "3px 9px"
    };

    Object.entries(style).forEach(([name, value]) => {
      element.style[name] = value;
    });

    document.body.appendChild(element);

    fetch(apiUrl)
      .then(response =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then(response => {
        textElement.innerHTML = `Time to destination: ${response} mins`;
      })
      .catch(err => {
        element.style.backgroundColor = "red";
        textElement.innerHTML = "Error";
        console.error(err);
      });
  }
);
