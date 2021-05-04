const handleControlButtonClick = (button: HTMLElement) => {
  // get all the elements that we're working with as well as their data-* attributes
  const { targetId, setClass } = grabDataFromButton(button);
  const targetElement = document.getElementById(targetId);
  const hasAdditionalClasses = !!targetElement.dataset.additionalClasses;
  // clear all the classes on the target element
  targetElement.removeAttribute("class");
  // I know that target element always has to have "showcase-box" class but there's classes that buttons toggle from their dataset
  // I basically remove all classes, add back "showcase-box" and the class that button has in it's data-set-class attribute
  targetElement.classList.add("showcase-box", setClass);
  // If target element aka "showcase-box" has data-additional-classes (those are used to do some fancy shit), grab those classes from attribute
  // and add them to the element. You can look at that as data-additional being a class storage. We have basic class "showcase-box" we have a class
  // that button needs to apply let's say "x" and we also have a toggle turned on so that our box is in "flex-direction: column" mode.
  // We remove all classes. Grab basic class "showcase-box" add to it the ones that are in "storage" aka "flex-direction-column" and add the class
  // that button needs to apply. And we get "showcase-box flex-direction-column x" in the end. That way our buttons work in "harmony" with
  // toggles and don't mess each others states
  if (hasAdditionalClasses) {
    const additionalClasses = targetElement.dataset.additionalClasses?.split(" ");
    targetElement.classList.add(...additionalClasses);
  }
  // Now we get all the neighbouring buttons, check if that button has "button--active" modifier class. If so remove it
  setButtonAsActive(button);
};

const grabDataFromButton = (button: HTMLElement) => {
  const targetId = button.dataset.targetId;
  const setClass = button.dataset.setClass;
  return {
    targetId,
    setClass,
  };
};

const setButtonAsActive = (button: HTMLElement) => {
  const neighbouringButtons = button.parentElement.querySelectorAll(".button") as NodeListOf<HTMLDivElement>;
  neighbouringButtons.forEach((btn) => {
    const containsActiveClass = btn.classList.contains("button--active");
    if (containsActiveClass) btn.classList.remove("button--active");
  });
  // Now that no button has "button--active" modifier class, we can safely add it to button that was currently clicked
  button.classList.add("button--active");
};

export { handleControlButtonClick };
