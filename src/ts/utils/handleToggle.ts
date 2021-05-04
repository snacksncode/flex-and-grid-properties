import { elementContainsClasses } from "./elementContainsClasses";

const handleToggleClick = (toggleContainer: HTMLDivElement) => {
  // get all the elements that I'm editing
  const toggle = toggleContainer.querySelector(".toggle") as HTMLElement;
  // check if toggle has data-additional-classes attribute. If so then those classes also need to be added/removed
  const { targetId, classes } = grabDataFromToggle(toggle);
  const targetElement = document.getElementById(targetId);
  // if target element has class that toggle switches then toggle is currently "on"
  if (elementContainsClasses(targetElement, ...classes)) {
    // Toggle is "on" -> remove classes
    removeClassesAndUpdateDataset(targetElement, classes);
  } else {
    //Toggle is "off" -> add classes
    addClassesAndUpdateDataset(targetElement, classes);
  }
  // toggle active class. If toggle is "off" -> "on" and vice versa
  toggle.classList.toggle("toggle--active");
};

const grabDataFromToggle = (toggle: HTMLElement) => {
  const targetId = toggle.dataset.targetId;
  const classes = toggle.dataset.addClass?.split(" ");
  return {
    targetId,
    classes,
  };
};

const removeClassesAndUpdateDataset = (element: HTMLElement, classes: string[]) => {
  // create list of all the classes that need to be removed
  const classesToRemove: string[] = [];
  // by default remove main class that was added by toggle
  classesToRemove.push(...classes);
  // get current data-additional-classes attribute of target element so that we can edit it
  const currentDataAdditionalClasses = element.dataset.additionalClasses.split(" ");
  // create list of classes that stay (aka list of current classes minus those that need to be removed)
  const newDataAdditionalClasses: string[] = [];
  // loop over every class in data-additional-classes
  currentDataAdditionalClasses.forEach((dataClass) => {
    // if ecountered class that's not inside "to be removed" list it means it needs to stay. Add it to list
    if (classesToRemove.indexOf(dataClass) === -1) {
      newDataAdditionalClasses.push(dataClass);
    }
  });
  // now we have a list of new classes that need to be on this element
  // edit data-additional-classes attribute of target element with new classes
  element.dataset.additionalClasses = newDataAdditionalClasses.join(" ");
  // and remove all of classes that need to be removed
  element.classList.remove(...classesToRemove);
};

const addClassesAndUpdateDataset = (element: HTMLElement, classes: string[]) => {
  // create list of new classes to add
  const newClasses = [];
  const hasAdditionalClasses = !!element.dataset.additionalClasses;
  // if target element has data-additional-classes we don't want to ignore those, just add our new ones. Save those!
  if (hasAdditionalClasses) {
    newClasses.push(...element.dataset?.additionalClasses.split(" "));
  }
  // add class(es) specified in data-set-class of toggle to the list
  newClasses.push(...classes);
  // edit target element's data-additional-classes with our new one, basically add needed classes to it
  element.dataset.additionalClasses = newClasses.join(" ");
  // as well as actually apply those classes to target element
  element.classList.add(...newClasses);
};

export { handleToggleClick };
