// creates a book and uses mouse tracking to update its state
import buildBook from './buildBook';

class App {
  constructor() {
    this.book = buildBook();
    this.bookMoveStart = 0;
    this.startX = 0;
    this.mouseX = 0;
    this.mouseDown = false;
    this.ticking = false;

    // higher number = slower page turn speed;
    this.sensitivity = 3;
  }
  start() {
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }
  updateBook() {
    if (this.mouseDown) {
      const diff = (this.startX - this.mouseX) / this.sensitivity;
      this.book.setState(this.bookMoveStart + diff);
      this.book.update();
    }
    this.ticking = false;
  }
  handleMouseUp() {
    this.mouseDown = false;
  }
  handleMouseDown(e) {
    this.bookMoveStart = this.book.state;
    this.startX = e.pageX;
    this.mouseDown = true;
  }
  handleMouseMove(e) {
    this.mouseX = e.pageX;
    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.updateBook.bind(this));
    }
  }
}

export default App;
