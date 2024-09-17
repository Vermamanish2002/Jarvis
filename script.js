let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;

  text_speak.volume = 1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good morning Manish sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good afternoon Manish sir");
  } else {
    speak("Good evening Manish sir");
  }
}

window.addEventListener("load", () => {
  wishMe();
});

let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;

  takeCommand(transcript);
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

// -------------------------------- take command function................///...//.

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.toLowerCase().includes("hello")) {
    speak("Hello sir, how can I help you?");
  } else if (message.toLowerCase().includes("who")) {
    speak(" I am Jarvis created by Manish sir. He is very talented person");
  } else if (message.toLowerCase().includes("open youtube")) {
    window.open("https://www.youtube.com/");
    speak("opening youtube sir");
  } else if (message.toLowerCase().includes("open google")) {
    window.open("https://www.google.com/");
    speak("opening google sir");
  } 
   else if (message.toLowerCase().includes("open calculator")) {
    window.open("calculator://");
    speak("opening calculator sir");
  } 
   else if (message.toLowerCase().includes("open google chrome")) {
    window.open("googlechrome://");
    speak("opening google chrome sir");
  } 
   
  
  else {
 speak(`This is what i found on internet regading ${message}`)
    window.open(`https://www.google.com/search?q=${message}`)
  }

}
