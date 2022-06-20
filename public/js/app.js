const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  messageOne.textContent = `Loading...`;
  if (!location) {
    return console.log("Please add a location");
  }

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageTwo.textContent = `${data.error}`;
        } else {
          messageTwo.textContent = `${data.location} ${data.forecast}`;
          console.log(data.forecast);
          console.log(data.location);
        }
        messageOne.textContent = "";
      });
    }
  );
});
