const socket = io("ws://127.0.0.1:8000", { transports: ["websocket"] });
// const socket=io('http://localhost:8000');

const form = document.querySelector("form");
const mainBody = document.querySelector(".main-body");
const messageInput = document.querySelector(".message-input");
const username = prompt("Enter your name to join:");
socket.emit("new-user-joined", username);

const append = (message, position) => {
  const newElement = document.createElement("div");
  newElement.innerText = message;
  newElement.classList.add(position);
  newElement.classList.add("message");
  mainBody.append(newElement);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send", message);
  append(`${message}`, "right");
  messageInput.value = "";
});

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "mid");
});

socket.on("user-left", (name) => {
  append(`${name} left the chat`, "mid");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

// socket.on("connect", () => {
//   // either with send()
//   socket.send("Hello!");

//   // or with emit() and custom event names
//   socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
// });

// handle the event sent with socket.send()
// socket.on("message", data => {
//   console.log(data);
// });

// // handle the event sent with socket.emit()
// socket.on("greetings", (elem1, elem2, elem3) => {
//   console.log(elem1, elem2, elem3);
// });

// socket.on("hello", (arg) => {
//     console.log(arg); // world
//   });
