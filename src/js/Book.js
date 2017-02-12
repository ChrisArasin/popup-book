// holds spreads, determines spread positions and how open they are

class Book {
  constructor(bookId) {
    this.el = document.getElementById(bookId);
    this.stateMultiplier = 100;
    this.spreads = [];
    this.updateBookLength();
    this.state = 0;
  }

  updateBookLength() {
    // -1 because last spread is cover, so cant turn past it
    this.bookLength = (this.spreads.length - 1) * this.stateMultiplier;
    return this;
  }

  addSpread(spread) {
    this.spreads.push(spread);
    spread.addElToParentEl(this.el);
    this.updateBookLength();
    return this;
  }

  setState(newState) {
    // keeps it within max and min
    if (newState < 0) {
      this.state = 0;
    } else if (newState <= this.bookLength) {
      this.state = newState;
    } else {
      this.state = this.bookLength;
    }

    // store these rather than calculate for every spread
    this.leftSpreadIndex = Math.floor(this.state / this.stateMultiplier);
    this.rightSpreadIndex = this.leftSpreadIndex + 1;
    this.spreadRemainder = this.state % this.stateMultiplier;
    return this;
  }

  // given a spread and it's index, use state to determine its side and openness
  setSpreadFromState(spread, index) {
    if (index < this.leftSpreadIndex) {
      spread.update('LEFT', 0);
    } else if (index === this.leftSpreadIndex) {
      spread.update('LEFT', ((100 - this.spreadRemainder) / 100));
    } else if (index === this.rightSpreadIndex) {
      spread.update('RIGHT', (this.spreadRemainder / 100));
    } else if (index > this.rightSpreadIndex) {
      spread.update('RIGHT', 0);
    }
  }

  update() {
    this.spreads.forEach(this.setSpreadFromState.bind(this));
    return this;
  }
}

export default Book;
