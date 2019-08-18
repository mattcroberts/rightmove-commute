const apiBaseUrl = "https://irix.dev/rightmove-commute/travel-time";

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

    const cityMapperLink = `https://citymapper.com/directions?startcoord=${
      origin.lat
    },${origin.long}&endcoord=${destination.lat},${destination.long}`;

    const apiUrl = `${apiBaseUrl}?originLat=${origin.lat}&originLong=${
      origin.long
    }&destinationLat=${destination.lat}&destinationLong=${destination.long}`;

    const cityMapperLink = document.createElement("a");
    cityMapperLink.innerHTML = "See on CityMapper";
    cityMapperLink.setAttribute("href", cityMapperLink);
    cityMapperLink.setAttribute("target", "black");

    const textElement = document.createElement("div");
    textElement.innerHTML = "Loading...";

    const element = document.createElement("div");
    element.setAttribute("id", "rmCommute");
    element.appendChild(textElement);
    element.appendChild(cityMapperLink);

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
        textElement.innerHTML = `Time to work: ${Math.round(response)} mins`;
      })
      .catch(err => {
        element.style.backgroundColor = "red";
        textElement.innerHTML = "Error";
        console.error(err);
      });
  }
);
