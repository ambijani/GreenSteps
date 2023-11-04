//dark mode
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

//petition 
const signNowButton = document.getElementById("sign-now-button");
const signatures = document.getElementById("signatures");
const counter = document.getElementById("counter");

let count = 3;

const addSignature = () => {
  const nameInput = document.getElementById("name");
  const hometownInput = document.getElementById("hometown");
  const emailInput = document.getElementById("email");

  const name = nameInput.value;
  const hometown = hometownInput.value;
  const email = emailInput.value;

  if (name.length < 2 || hometown.length < 2 || (!email.includes('.com') && !email.includes('.edu') && !email.includes('.org'))) {
    // Highlight invalid input fields with error class
    if (name.length < 2) {
      nameInput.classList.add('error');
    } else {
      nameInput.classList.remove('error');
    }
    if (hometown.length < 2) {
      hometownInput.classList.add('error');
    } else {
      hometownInput.classList.remove('error');
    }
    if (!email.includes('.com')) {
      emailInput.classList.add('error');
    } else {
      emailInput.classList.remove('error');
    }

    // Show an alert for invalid signature
    alert("Invalid signature. Please make sure all fields are correctly filled.");
  } else {
    // Create a new signature paragraph
    const newSignature = document.createElement("p");
    newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

    signatures.appendChild(newSignature);

    count++;
    counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    nameInput.value = "";
    hometownInput.value = "";
    emailInput.value = "";

    nameInput.classList.remove('error');
    hometownInput.classList.remove('error');
    emailInput.classList.remove('error');
  }
};

signNowButton.addEventListener("click", addSignature);

//animation and scroll
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

let revealableStyle = document.styleSheets[0].insertRule(".revealable { position: relative; transform: translateY(150px); opacity: 0; transition: all 2s ease; }", 0);

let activeStyle = document.styleSheets[0].insertRule(".revealable.active { transform: translateY(0px); opacity: 1; }", 1);

let motionButtonClicked = false; // Initially, the button is not clicked
const reduceMotionButton = document.getElementById("reduce-motion-button");
reduceMotionButton.addEventListener("click", () => {
  motionButtonClicked = !motionButtonClicked; // Toggle the boolean value when the button is clicked
  reduceMotion();
});

function reduceMotion() {

  if (motionButtonClicked) {
    animation.transitionTimingFunction = "linear";
  } else {
    animation.transitionTimingFunction = "ease";
  }

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transition = `
      transform ${animation.transitionDuration} ${animation.transitionTimingFunction},
      opacity ${animation.transitionDuration} ${animation.transitionTimingFunction}`;
  }
}