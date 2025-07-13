import command from '../config.json' assert {type: 'json'};
import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { DEFAULT } from "./commands/default";

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isPasswordInput = false;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["help", "banner", "clear"];
const HISTORY : string[] = [];

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
      e.preventDefault();
      if (!isPasswordInput) {
        enterKey();
      } 

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;

  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `<span id="prompt">${PROMPT.innerHTML}</span> ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
    }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {

  switch(input) {
    // Commands from the album lyrics here:
    case 'blog':
      writeLines(["I miss the era of “blogs”."]);
      writeLines(["Different people can customize their own designs, share their deepest thoughts,"]);
      writeLines(["add chat boxes to happily chat with their friends and communities."]);
      writeLines(["There is no such thing as “blogs” now. The Internet is only for the rich and victorious."]);
      writeLines(["There are no “blogs” now."]);
      writeLines(["Those who shared their deepest thoughts may be killed if “they” disagree with your thoughts."]);
      writeLines(["<br>"]);
      writeLines(["Do you mean 'letter' instead?", "<br>"]);
    break;

    case 'letter':
      writeLines(["Type in ‘letterfromthefuture’ instead to display all the letters.", "<br>"]);
    break;

    case 'dictionary':
      writeLines(["You may need this as an additional help!"]);
      writeLines(["Opening up https://postimg.cc/HjnLp6hL/9c92769d"]);
      writeLines(["(Remember to save the link for easier access in the future)", "<br>"]);
      setTimeout(() => {
       window.open("https://postimg.cc/HjnLp6hL/9c92769d", '_blank');
    break;

    case 'purge':
      writeLines(["I’m about to be purged by The Final Answer anyway. It’s a wish that will come true.", "<br>"]);
    break;

    case 'khaose':
      writeLines(["Do you mean 'khaosé' instead, with the 'é'?","<br>"]);
    break;

    case 'khaosé':
      writeLines(["Ah, Khaosé."]);
      writeLines(["I once asked those who called me that what it meant, and they didn't even know the origin of the word."]);
      writeLines(["I was called that simply because I’m different. This, however, made me feel that I never belong to their circle."]);
      writeLines(["When I think about it more, this feeling of “not fitting in” followed me throughout all the different circles,"]);
      writeLines(["and it has been a cycle that I want to break."]);
      writeLines(["Believing that I do not fit in anywhere has made me really weak.", "<br>"]);
    break;

    case 'judgment day':
      writeLines(["The end of the world, at this very hour. I am ready.", "<br>"]);
    break;

    case 'king':
      writeLines(["Come back and save us, my king.. Please. The world that you love is burning to the ground.", "<br>"]);
    break;

    case 'relational':
      writeLines(["If the entire mission is successful, I wish my past self will learn to be around people without fear more;"]);
      writeLines(["even if there is a risk of being hurt, frustrated, or disappointed.", "<br>"]);
    break;

    case 'religion':
      writeLines(["Death is close, but I am still a believer of the Kingdom. I know the King will watch me die.", "<br>"]);
    break;

    case 'evil entity':
      writeLines(["It exists, and it will kill me today.", "<br>"]);
    break;

    case 'friends':
      writeLines(["Most of my friends are now dead. But I’ll see you soon, and we’ll celebrate this together. I know this.", "<br>"]);
    break;

    case 'secret whisperer':
      writeLines(["Well, thank you, for getting me to fight this until the end. You're Sophia of the King, right?", "<br>"]);
    break;

    case 'mask':
      writeLines(["Please, get a mask and do your thing, Khaosé. ", "<br>"]);
    break;

    case 'sophia':
      writeLines(["Sophia has to be real. No one else can convince my internal self to do crazy things like this.", "<br>"]);
    break;

    case 'prophet':
      writeLines(["Please, agree to be one.. Your soul is calling you to be one and you know it. ", "<br>"]);
    break;

    case 'pillars':
      writeLines(["My pillars are my foundation. Without it, I won’t be me.", "<br>"]);
    break;

    case 'enemy':
      writeLines(["Khronos, the murderer of the world.", "<br>"]);
    break;

    case 'love':
      writeLines(["Learn how to love.. And learn to spread love.."]);
      writeLines(["The past world will see it as cringe, but it is probably the only solution.", "<br>"]);
    break;

    case 'faith':
      writeLines(["Even if I don’t feel it, I will believe.", "<br>"]);
    break;

    case 'joy':
      writeLines(["Is this feeling… joy?", "<br>"]);
    break;

    case 'purpose':
      writeLines(["I have found my purpose, but it may have been too late..", "<br>"]);
    break;

    case 'world':
      writeLines(["Please, save this world, somebody…", "<br>"]);
    break;

    case 'hope':
      writeLines(["A hope was placed upon me, and it is you. You’re an answered prayer.", "<br>"]);
    break;

    case 'father':
      writeLines(["I wish you’re here with me at this very moment, Father.", "<br>"]);
    break;

    case 'romancers':
      writeLines(["Dear wife, I miss you. I will never let you feel the pain of dying before your time.", "<br>"]);
    break;

    case 'fight':
      writeLines(["This is my final fight against you, freaks!", "<br>"]);
    break;

    case 'sin':
      writeLines(["If only, I embrace the existence of the darkness within me,"]);
      writeLines(["knowing that I can never beat it on my own.. instead of letting it drag me down..", "<br>"]);
    break;

    case 'vices':
      writeLines(["See 'Sin'.", "<br>"]);
    break;

    case 'tongues':
      writeLines(["WEven writings that have been dead will come back to life. You’ll see.", "<br>"]);
    break;

    case 'god':
      writeLines(["God… may you never leave us. I believe you’re here.", "<br>"]);
    break;

    case 'countdown':
      writeLines(["5 minutes to go… before…", "<br>"]);
    break;

    case 'festive season':
      writeLines(["Learn to celebrate, even at death’s door.", "<br>"]);
    break;

    case 'consciousness':
      writeLines(["Is this.. my consciousness?", "<br>"]);
    break;

    case 'easter eggs':
      writeLines(["May easter eggs save your world.", "<br>"]);
    break;

    case 'sleep':
      writeLines(["Finally, I can sleep forever.", "<br>"]);
    break;

    case 'relief':
      writeLines(["Relief is coming for all of us. ", "<br>"]);
    break;

    case 'extermination':
      writeLines(["The extermination point is in 5 minutes, but I’m quicker this time.. Bring forth the change.", "<br>"]);
    break;

    case 'kingdom':
      writeLines(["I’ll reclaim the keys to our beloved kingdom! Believe it!", "<br>"]);
    break;

    case 'acrostic':
      writeLines(["Acrostic poems are like masks. I am fueled by it.", "<br>"]);
    break;

    case 'commandments':
      writeLines(["His commandments are in my heart, forever.", "<br>"]);
    break;

    case 'name':
      writeLines(["My name is Gxxxxx, but I’ll reclaim that other name and make it my calling as well.", "<br>"]);
    break;

    // game-related words only:

    case 'inner layer':
      writeLines(["There’s nothing else deeper than the deepest layer here. All that’s left is to end this.", "<br>"]);
    break;

    case 'hguonedoogrevenimayhw':
      writeLines(["This command won’t work here.", "<br>"]);
    break;

    case 'letterfromthefuture':

      writeLines(["The letters are here:"]);
      writeLines(["1/10: <a href='https://postimg.cc/qtGTzqFq'>https://postimg.cc/qtGTzqFq</a>"]);
      writeLines(["2/10: <a href='https://postimg.cc/7Gsrncwy'>https://postimg.cc/7Gsrncwy</a>"]);
      writeLines(["3/10: <a href='https://postimg.cc/R6Vzf9rR'>https://postimg.cc/R6Vzf9rR</a>"]);
      writeLines(["4/10: <a href='https://postimg.cc/fSVn2KRS'>https://postimg.cc/fSVn2KRS</a>"]);
      writeLines(["5/10: <a href='https://postimg.cc/Dm0Tw2Pf'>https://postimg.cc/Dm0Tw2Pf</a>"]);
      writeLines(["6/10: <a href='https://postimg.cc/hhYqJH2L'>https://postimg.cc/hhYqJH2L</a>"]);
      writeLines(["7/10: <a href='https://postimg.cc/V0YW23Rm'>https://postimg.cc/V0YW23Rm</a>"]);
      writeLines(["*NEW* 8/10: <a href='https://postimg.cc/RJLfYcp9'>https://postimg.cc/RJLfYcp9</a>"]);
      writeLines(["*NEW* 9/10: <a href='https://postimg.cc/HVTbyhjL'>https://postimg.cc/HVTbyhjL</a>"]);
      writeLines(["*NEW* 10/10: <a href='https://postimg.cc/ThVrh6dS'>https://postimg.cc/ThVrh6dS</a>"]);
      writeLines(["<br>"]);
      writeLines(["Prophet, this is your final challenge."]);
      writeLines(["Two keys are required to unlock the last page, and here are the hints for it:"]);
      writeLines(["<br>"]);
      writeLines(["1. Obtain a command with the hint below to open up the final link:"]);
      writeLines(["<br>"]);
      writeLines(["Letter 9: Red orange orange blue yellow brown red green orange blue"]);
      writeLines(["(no spaces)"]);
      writeLines(["<br>"]);
      writeLines(["2. You'll also need a password to access the final link."]);
      writeLines(["Obtain an additional password hint with this hint:"]);
      writeLines(["<br>"]);
      writeLines(["Letter 8: Red characters"]);
      writeLines(["(no spaces)"]);
      writeLines(["<br>"]);
      writeLines(["Embrace the letters that you find. I believe in you."]);
      writeLines(["<br>"]);
      writeLines(["P/S - All the best - doing so without a dictionary may actually be challenging.."]);
      writeLines(["<br>"]);
    break;

    case 'nobodywillacceptme':
      writeLines(["Come on. You’re beyond this already.", "<br>"]);
    break;

    case 'uvivkfdpsshjjlwatl':
      writeLines(["Fvb’yl ilfvuk aopz hsylhkf.", "<br>"]);
    break;

    case 'zxxvkgzmxv':
      writeLines(["Leaving the terminal now. You'll need a password though."]);
      writeLines(["Opening up https://khaose.com/zxxvkgzmxv"]);
      writeLines(["(Remember to save the link for easier access in the future)", "<br>"]);
      setTimeout(() => {
       window.open("https://khaose.com/zxxvkgzmxv", '_blank');
      }, 500);
    break;

    case 'iwillacceptwhoiam':
      writeLines(["Like the emperor of the past, the system prefers if this is converted to a cipher:"]);
      writeLines(["<br>"]);
      writeLines(["The emperor loved ciphers. I do too."]);  
      writeLines(["As you now know, the emperor was born in July. Me too."]);  
      writeLines(["The emperor was born on the 12th. Not me though."]);  
      writeLines(["My date is reversed."]);  
      writeLines(["<br>"]);
      writeLines(["The answer to this is the password for https://khaose.com/zxxvkgzmxv", "<br>"]);
    break;


    // Other commands

    case 'clear':
      setTimeout(() => {
        if(!TERMINAL || !WRITELINESCOPY) return
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
      })
      break;
    case 'banner':
      writeLines(BANNER);
      break;
    case 'help':
      writeLines(HELP);
      break;
    case 'outest':
      writeLines(["Returning to the outest layer - khaose.com...", "<br>"]);
      setTimeout(() => {
       window.open("https://khaose.com/", '_blank');
      }, 500);
      break;
    case 'outer':
      writeLines(["Returning to the outer layer - backend.khaose.com...", "<br>"]);
      setTimeout(() => {
       window.open("https://backend.khaose.com/", '_blank');
      }, 500);
      break;

    case 'inner':
      writeLines(["Perhaps, finally, my inner soul can be at peace really soon.", "<br>"]);
      setTimeout(() => {
       window.open("https://innerbackend-rmhvxfirgb.com", '_blank');
      }, 500);
    break;
    case 'photos':
      writeLines(["Opening up khaose.com/photos... although I don't get why you want to view such awkward photos..", "<br>"]);
      setTimeout(() => {
       window.open("https://khaose.com/photos", '_blank');
      }, 500);
      break;
    case 'facebook':
      //add stuff here
      break;
    case 'twitter':
      //add stuff here
      break;
    case 'instagram':
      //add stuff here
      break;
    case 'youtube':
      //add stuff here
      break;
    case 'rm -rf':
      writeLines(["Such commands don't work here."]);
      writeLines(["<br>"]);
      break;
    case 'sudo':
      writeLines(["Such commands don't work here."]);
      writeLines(["<br>"]);
      break;
    case 'ls':
      writeLines(["Such commands don't work here."]);
      writeLines(["<br>"]);
      break;
    default:
      writeLines(DEFAULT);
      break;
  }  
}

function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item : string, idx : number) {
  setTimeout(() => {
    if(!mutWriteLines) return
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}


const initEventListeners = () => {
  if(HOST) {
    HOST.innerText= command.hostname;
  }

  if(USER) {
    USER.innerText = command.username;
  }

  if(PRE_HOST) {
    PRE_HOST.innerText= command.hostname;
  }

  if(PRE_USER) {
    PRE_USER.innerText = command.username;
  } 

    window.addEventListener('load', () => {
    writeLines(BANNER);
  });
  
  USERINPUT.addEventListener('keypress', userInputHandler);
  USERINPUT.addEventListener('keydown', userInputHandler);

  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  // pleading message
  console.log(`Are you trying to violate me and force vulnerable answers out of me? I know I CANNOT stop you from doing so, but what if I tell you that you're violating me by doing so. Would you still do it?`);
}

// stop visitors from opening up Developer Tools
window.addEventListener("keydown", (event) => {
  if(event.ctrlKey && (event.key === "S" || event.key === "s")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "C")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "E" || event.key === "e")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "I" || event.key === "i")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "K" || event.key === "k")) {
     event.preventDefault();
  }
  if(event.ctrlKey && (event.key === "U" || event.key === "u")) {
     event.preventDefault();
  }
});

initEventListeners();
