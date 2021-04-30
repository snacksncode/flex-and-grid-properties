const handleToggleClick = (toggleContainer: HTMLDivElement) => {
  // get all the elements that I'm editing
  const toggle = toggleContainer.querySelector(".toggle") as HTMLDivElement;
  // check if toggle has data-additional-classes attribute. If so then those classes also need to be added/removed
  const hasAdditionalClassesToApply = !!toggle.dataset.additionalClasses;
  const targetElementId = toggle.dataset.targetId;
  const targetElement = document.getElementById(targetElementId);
  // if target element has class "flex-direction-column" then toggle is currently "on"
  if (targetElement.classList.contains("flex-direction-column")) {
    // Toggle is "on" -> remove classes and change state to "off"
    // create list of all the classes that need to be removed
    const classesToRemove: string[] = [];
    // if this variable is true then our toggle added some additional classes and we need to remove those as well
    if (hasAdditionalClassesToApply) {
      classesToRemove.push(...toggle.dataset?.additionalClasses.split(" "));
    }
    // by default remove class "flex-direction-column"
    classesToRemove.push("flex-direction-column");
    // get current data-additional-classes attribute of target element so that we can edit it
    const currentDataAdditionalClasses = targetElement.dataset.additionalClasses.split(" ");
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
    targetElement.dataset.additionalClasses = newDataAdditionalClasses.join(" ");
    // and remove all of classes that need to be removed
    targetElement.classList.remove(...classesToRemove);
  } else {
    //Toggle is "off" -> add classes and change state to "on"
    // create list of new classes to add
    const newClasses = [];
    const hasAdditionalClasses = !!targetElement.dataset.additionalClasses;
    // if target element has data-additional-classes we don't want to ignore those, just add our new ones. Save those!
    if (hasAdditionalClasses) {
      newClasses.push(...targetElement.dataset?.additionalClasses.split(" "));
    }
    // if toggle has data-additional-classes we need to add those to target element. To the list!
    if (hasAdditionalClassesToApply) {
      newClasses.push(...toggle.dataset.additionalClasses?.split(" "));
    }
    // by default add "flex-direction-column" to the list, cause duh that's the main switcher class
    newClasses.push("flex-direction-column");
    // edit target element's data-additional-classes with our new one, basically add needed classes to it
    targetElement.dataset.additionalClasses = newClasses.join(" ");
    // as well as actually apply those classes to target element
    targetElement.classList.add(...newClasses);
  }
  // update toggle UI
  toggle.classList.toggle("toggle--active");
};

export { handleToggleClick };
