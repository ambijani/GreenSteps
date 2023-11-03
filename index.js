let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

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

    // Append the new signature to the signatures div
    signatures.appendChild(newSignature);

    // Increase the count
    count++;

    // Update the counter
    counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    // Clear form fields
    nameInput.value = "";
    hometownInput.value = "";
    emailInput.value = "";

    // Remove error class from input fields
    nameInput.classList.remove('error');
    hometownInput.classList.remove('error');
    emailInput.classList.remove('error');
  }
};

signNowButton.addEventListener("click", addSignature);
