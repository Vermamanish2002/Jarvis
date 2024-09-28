// Get references to HTML elements (button, content area, and voice indicator)
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function to speak the provided text using SpeechSynthesis API
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1; // Set speaking rate
  text_speak.pitch = 1; // Set voice pitch
  text_speak.volume = 1; // Set volume to full
  window.speechSynthesis.speak(text_speak); // Speak the text
}

// Function to wish the user based on the current time of day
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

// Wish the user when the page loads
window.addEventListener("load", () => {
  wishMe();
});

// Set up Speech Recognition API (support for webkit)
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// Event listener when speech is recognized (on result)
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript; // Show recognized text in content area
  takeCommand(transcript); // Pass the text to the takeCommand function
};

// Start speech recognition when button is clicked
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none"; // Hide the button when recognition starts
  voice.style.display = "block"; // Show voice indicator when speaking
});

// Function to execute commands based on the spoken message
function takeCommand(message) {
  btn.style.display = "flex"; // Show the button after command execution
  voice.style.display = "none"; // Hide voice indicator

  // Convert message to lowercase to ensure case-insensitive matching
  message = message.toLowerCase();

  // Core commands
  if (message.includes("hello")) {
    speak("Hello sir, how can I help you?");
  } else if (message.includes("who")) {
    speak("I am Jarvis, created by Manish sir. He is a very talented person.");
  } else if (message.includes("how")) {
    speak("I am good sir. What about you?");
  } else if (message.includes("open youtube")) {
    window.open("https://www.youtube.com/");
    speak("Opening YouTube sir.");
  } else if (message.includes("open google")) {
    window.open("https://www.google.com/");
    speak("Opening Google sir.");
  } else if (message.includes("what is your name")) {
    speak("My name is Jarvis, your personal assistant.");
  } else if (message.includes("what can you do")) {
    speak("I can help you browse the web, open applications, and assist with daily tasks.");
  } else if (message.includes("how is the weather")) {
    speak("I currently don't have access to live weather data, but you can check it on Google.");
  } else if (message.includes("tell me a joke")) {
    speak("Why don't programmers like nature? It has too many bugs.");
  } else if (message.includes("what is the time")) {
    let time = new Date().toLocaleTimeString();
    speak(`The time is ${time} sir.`);
  } else if (message.includes("open facebook")) {
    window.open("https://www.facebook.com/");
    speak("Opening Facebook sir.");
  } else if (message.includes("open instagram")) {
    window.open("https://www.instagram.com/");
    speak("Opening Instagram sir.");
  } else if (message.includes("open twitter")) {
    window.open("https://www.twitter.com/");
    speak("Opening Twitter sir.");

  // Greetings
  } else if (message.includes("good morning")) {
    speak("Good morning sir! How can I assist you today?");
  } else if (message.includes("good night")) {
    speak("Good night sir! Have a restful sleep.");

  // Time-related queries
  } else if (message.includes("what day is it")) {
    let today = new Date().toLocaleDateString();
    speak(`Today is ${today}`);
  } else if (message.includes("what year is it")) {
    let year = new Date().getFullYear();
    speak(`It is the year ${year}`);

  // Personal assistant functionalities
  } else if (message.includes("set alarm")) {
    speak("Sorry, I can't set an alarm, but you can do that on your phone.");
  } else if (message.includes("create reminder")) {
    speak("Please use a reminder app for that.");
  } else if (message.includes("open calendar")) {
    window.open("https://calendar.google.com");
    speak("Opening your calendar sir.");

  // Fun responses
  } else if (message.includes("do you love me")) {
    speak("Of course, sir! I'm here to assist you always.");
  } else if (message.includes("sing a song")) {
    speak("I wish I could sing, but I'm not quite there yet.");

  // More web-based tasks
  } else if (message.includes("open github")) {
    window.open("https://github.com/");
    speak("Opening GitHub sir.");
  } else if (message.includes("open linkedin")) {
    window.open("https://www.linkedin.com/");
    speak("Opening LinkedIn sir.");

  // Health-related queries
  } else if (message.includes("how to stay healthy")) {
    speak("You can stay healthy by eating nutritious food, exercising regularly, and getting enough sleep.");
  } else if (message.includes("open health tracker")) {
    window.open("https://www.fitbit.com/");
    speak("Opening your health tracker sir.");

  // System commands (if system supports it)
  } else if (message.includes("shutdown")) {
    speak("Shutting down the system now.");
    // Add the appropriate system shutdown command here
  } else if (message.includes("restart")) {
    speak("Restarting the system now.");
    // Add the appropriate system restart command here

  // Other apps opening commands (works if system supports the URL scheme)
  } else if (message.includes("open calculator")) {
    window.open("calculator://");
    speak("Opening calculator sir.");
  } else if (message.includes("open camera")) {
    window.open("camera://");
    speak("Opening camera sir.");
  } else if (message.includes("open google chrome")) {
    window.open("googlechrome://");
    speak("Opening Google Chrome sir.");
  } else if (message.includes("open notepad")) {
    window.open("notepad://");
    speak("Opening Notepad sir.");
  } else if (message.includes("open word")) {
    window.open("word://");
    speak("Opening Microsoft Word sir.");
  } else if (message.includes("open excel")) {
    window.open("excel://");
    speak("Opening Microsoft Excel sir.");
  } else if (message.includes("open file explorer")) {
    window.open("explorer://");
    speak("Opening File Explorer sir.");

  // Fallback case: if command is not recognized, search the internet
  } else {
    speak(`This is what I found on the internet regarding ${message}`);
    window.open(`https://www.google.com/search?q=${message}`);
  }
}
