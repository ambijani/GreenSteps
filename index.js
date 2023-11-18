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
const petitionForm = document.getElementById("sign-petition");
const closeButton = document.getElementById("close-modal-button");

let count = 3;

const validateForm = () => {
  const person = {
    name: document.getElementById("name").value,
    hometown: document.getElementById("hometown").value,
    email: document.getElementById("email").value
  }

  const name = person.name;
  const hometown = person.hometown;
  const email = person.email;

  if (name.length < 2 || hometown.length < 2 || (!email.includes('.com') && !email.includes('.edu') && !email.includes('.org'))) {
    alert("Invalid signature. Please make sure all fields are correctly filled.");
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
    return;
  }
  addSignature(person);
};
signNowButton.addEventListener("click", validateForm);

petitionForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const person = validateForm();

  if (person) {
    addSignature(person);
    petitionForm.reset();
    toggleModal(person);
  }
});


const addSignature = (person) => {
  // Create a new signature paragraph
  const newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;

  signatures.appendChild(newSignature);

  count++;
  counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  petitionForm.reset();

  toggleModal(person);

};

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

const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("modal-text-container");

  modal.style.display = "flex";

  modalContent.innerHTML = `
    <p id="thanks-modal-content">Thank you so much ${person.name}!</p>
    <button id="close-modal-button">Close</button>
  `;

  const closeButton = document.getElementById("close-modal-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);

  animateModalImage();
};

const animateModalImage = () => {
  let scaleFactor = 1;
  const modalImage = document.getElementById("modal-image");

  const intervalID = setInterval(() => {
    scaleFactor === 1
      ? (scaleFactor = 0.8)
      : (scaleFactor = 1);
    modalImage.style.transform = `scale(${scaleFactor})`;
  }, 500);

  setTimeout(() => {
    clearInterval(intervalID);
  }, 3000);

};