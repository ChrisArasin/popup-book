import BookPart from './BookPart';

class Page extends BookPart {
  constructor(side, isBlank) {
    super('plane');
    this.side = side;
    this.hidden = false;
    if (side === 'LEFT') {
      this.el.classList.add('page', 'page--left');
    } else {
      this.el.classList.add('page', 'page--right');
    }
    if (isBlank) {
      this.el.classList.add('page--blank');
    }
  }

  hide() {
    this.hidden = true;
    this.el.classList.add('page--hidden');
  }

  show() {
    this.hidden = false;
    this.el.classList.remove('page--hidden');
  }

  checkShowHide(openAmount) {
    if (openAmount < 0.5 && !this.hidden) {
      this.hide();
    } else if (openAmount >= 0.5 && this.hidden) {
      this.show();
    }
  }

  // update page transform based based on spreadSide and open amount
  update(spreadSide, openAmount) {
    if (spreadSide === 'LEFT') {
      const pageAngle = -180 * (1 - openAmount);
      if (this.side === 'LEFT') {
        this.setTransform('rotateY(0deg)');
      } else {
        this.setTransform(`rotateY(${pageAngle.toString()}deg)`);
        this.checkShowHide(openAmount);
      }
    } else {
      const pageAngle = 180 * (1 - openAmount);
      if (this.side === 'LEFT') {
        this.setTransform(`rotateY(${pageAngle.toString()}deg)`);
        this.checkShowHide(openAmount);
      } else {
        this.setTransform('rotateY(0deg)');
      }
    }
  }
}

export default Page;
