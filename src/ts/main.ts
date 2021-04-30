import "../scss/main.scss";
import { handleControlButtonClick } from "./utils/handleControlButton";
import { handleToggleClick } from "./utils/handleToggle";

// Create listeners for all control buttons
let controlButtons = document.querySelectorAll(".controls > .button") as NodeListOf<HTMLDivElement>;
controlButtons.forEach((button) => {
  button.addEventListener("click", () => handleControlButtonClick(button));
});

// Create listeners for all toggles
let toggles = document.querySelectorAll(".toggle-flex-direction") as NodeListOf<HTMLDivElement>;
toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => handleToggleClick(toggle));
});

// remove no-transition class from body after a brief moment
setTimeout(() => {
  document.body.classList.remove("no-transition");
}, 250);
