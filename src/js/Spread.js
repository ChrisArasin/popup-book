// holds two pages and child popups.

import BookPart from './BookPart';
import Page from './Page';

class Spread extends BookPart {
  constructor(isFront, isBack) {
    super('spread');
    this.childPopUps = [];

    // page elements
    this.leftPage = new Page('LEFT', isFront);
    this.rightPage = new Page('RIGHT', isBack);

    // spread element
    this.el = document.createElement('div');
    this.el.classList.add('spread');

    // add page elements to spread element
    this.leftPage.addElToParentEl(this.el);
    this.rightPage.addElToParentEl(this.el);

    // all default to closed on the right side with children hidden.
    this.update('RIGHT', 0);
    this.hideChildren();
  }

  // add a popup to a page in th spread or nest into other popup
  addChild(popup, side, nestParent) {
    this.childPopUps.push(popup);
    if (typeof nestParent !== 'undefined') {
      popup.addElToParentEl(nestParent.el);
    } else if (side === 'LEFT') {
      popup.addElToParentEl(this.leftPage.el);
    } else if (side === 'RIGHT') {
      popup.addElToParentEl(this.rightPage.el);
    }
  }

  updateChildren() {
    const openAmount = this.openAmount;
    this.childPopUps.forEach(popup => popup.update(openAmount));
  }

  showChildren() {
    this.contentsVisible = true;
    this.leftPage.el.classList.remove('page--hide-children');
    this.rightPage.el.classList.remove('page--hide-children');
  }

  hideChildren() {
    this.contentsVisible = false;
    this.leftPage.el.classList.add('page--hide-children');
    this.rightPage.el.classList.add('page--hide-children');
  }

  /**
    * update page transforms based on which side its on and how far open
    * Also, if a page isn't visbile, (facing downward) its hidden to solve
    * depth issues. Popups are hidden separately by the spread because
    * you can see them sooner
  */
  update(side, openAmount) {
    if (side !== this.side || openAmount !== this.openAmount) {
      this.side = side;
      this.openAmount = openAmount;

      // hide popups inside a mostly closed spread
      if (openAmount <= 0.15 && this.contentsVisible) {
        this.hideChildren();
      } else if (openAmount > 0.15 && !this.contentsVisible) {
        this.showChildren();
      }

      // transform pages based on spread side and open amount
      this.leftPage.update(side, openAmount);
      this.rightPage.update(side, openAmount);
      this.updateChildren();
    }
  }
}

export default Spread;
