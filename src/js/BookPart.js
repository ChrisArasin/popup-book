class BookPart {
  constructor(type) {
    this.el = document.createElement('div');
    this.el.classList.add(type);
  }

  addElToParentEl(parentElement) {
    parentElement.appendChild(this.el);
  }

  setTransform(transformString) {
    this.el.style.transform = transformString;
  }
}

export default BookPart;
