document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => {
    chrome.storage.sync.set({
      destinationLatitude: form.latitude.value,
      destinationLongitude: form.longitude.value
    });

    e.preventDefault();
  });

  chrome.storage.sync.get(
    ["destinationLatitude", "destinationLongitude"],
    ({ destinationLatitude, destinationLongitude }) => {
      if (destinationLatitude && destinationLongitude) {
        form.latitude.value = destinationLatitude;
        form.longitude.value = destinationLongitude;
      }
    }
  );
});
