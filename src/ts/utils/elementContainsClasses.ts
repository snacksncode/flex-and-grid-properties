const elementContainsClasses = (element: HTMLElement, ...classes: string[]) => {
  for (let c of classes) {
    if (!element.classList.contains(c)) {
      return false;
    }
  }
  return true;
};

export { elementContainsClasses };
