document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => {
    chrome.storage.sync.set({
      destinationLatitude: form.latitude.value,
      destinationLongitude: form.longitude.value
    });

    e.preventDefault();
  });
});
