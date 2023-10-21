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
  const name = document.getElementById("name").value;
  const hometown = document.getElementById("hometown").value;

  // Create a new signature paragraph
  const newSignature = document.createElement("p");
  newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

  // Append the new signature to the signatures div
  signatures.appendChild(newSignature);

  // Increase the count
  count++;

  // Update the counter
  counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
};

signNowButton.addEventListener("click", addSignature);
