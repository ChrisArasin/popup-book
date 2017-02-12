/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = BookPart;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BookPart__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Page__ = __webpack_require__(5);
// holds two pages and child popups.




class Spread extends __WEBPACK_IMPORTED_MODULE_0__BookPart__["a" /* default */] {
  constructor(isFront, isBack) {
    super('spread');
    this.childPopUps = [];

    // page elements
    this.leftPage = new __WEBPACK_IMPORTED_MODULE_1__Page__["a" /* default */]('LEFT', isFront);
    this.rightPage = new __WEBPACK_IMPORTED_MODULE_1__Page__["a" /* default */]('RIGHT', isBack);

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

/* harmony default export */ __webpack_exports__["a"] = Spread;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buildBook__ = __webpack_require__(7);
// creates a book and uses mouse tracking to update its state


class App {
  constructor() {
    this.book = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__buildBook__["a" /* default */])();
    this.bookMoveStart = 0;
    this.startX = 0;
    this.mouseX = 0;
    this.mouseDown = false;

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
    window.requestAnimationFrame(this.updateBook.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["a"] = App;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * example transform: transformX(10px)
 * type: 'transformX'
 * startVal: number when spread is closed
 * endVal: number when spread is open
 * unit: 'px'
 */

const AnimatedTransform = function AnimatedTransform(type, startVal, endVal, unit) {
  /**
   * Uses value between 0 and 1 to interpolate between start and end val
   * when spread is almost closed, popups can stick through
   * use easing on progress value
   */
  const interpolatedVal = function interpolatedVal(progress) {
    const easedProgress = progress * progress * progress;
    const diff = this.endVal - this.startVal;
    return this.startVal + (diff * easedProgress);
  };

  // get string value transformX(10px)
  const interpolatedString = function interpolatedString(progress) {
    const interpVal = this.interpolatedVal(progress);
    return `${this.type}(${interpVal.toString()}${this.unit})`;
  };

  return {
    type,
    startVal,
    endVal,
    unit,
    interpolatedVal,
    interpolatedString,
  };
};

/* harmony default export */ __webpack_exports__["a"] = AnimatedTransform;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = Book;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BookPart__ = __webpack_require__(0);


class Page extends __WEBPACK_IMPORTED_MODULE_0__BookPart__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = Page;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BookPart__ = __webpack_require__(0);
/**
 * transformBase -- string of transforms that don't change. Base position, etc.
 * animatedTransforms -- list of AnimatedTrnasforms
*/


class PopUp extends __WEBPACK_IMPORTED_MODULE_0__BookPart__["a" /* default */] {
  constructor(transformBase, animatedTransforms, classes) {
    super('plane');
    this.transformBase = transformBase;
    this.animatedTransforms = animatedTransforms;
    if (typeof classes !== 'undefined') {
      classes.forEach(className => this.el.classList.add(className));
    }
    this.update(0);
  }

  // get string of all transforms properly interpolated
  getTransformString(progress) {
    const animatedTransformStates = this.animatedTransforms
      .map(transform => transform.interpolatedString(progress));
    return `${this.transformBase} ${animatedTransformStates.join(' ')}`;
  }

  update(progress) {
    this.setTransform(this.getTransformString(progress));
  }
}

/* harmony default export */ __webpack_exports__["a"] = PopUp;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Book__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Spread__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__makeHeroSpread__ = __webpack_require__(8);
/* harmony export (immutable) */ __webpack_exports__["a"] = buildBook;




function buildBook() {
  // make empty cover spreads
  const frontCover = new __WEBPACK_IMPORTED_MODULE_1__Spread__["a" /* default */](true, false);
  const backCover = new __WEBPACK_IMPORTED_MODULE_1__Spread__["a" /* default */](false, true);

  // make hero spread adds popups to spread pages
  const supermanSpread = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__makeHeroSpread__["a" /* default */])('superman');
  const batmanSpread = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__makeHeroSpread__["a" /* default */])('batman');

  const book = new __WEBPACK_IMPORTED_MODULE_0__Book__["a" /* default */]('book');
  book.addSpread(frontCover)
      .addSpread(supermanSpread)
      .addSpread(batmanSpread)
      .addSpread(backCover)
      .update();
  return book;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Spread__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PopUp__ = __webpack_require__(6);
/**
  * function returns a new spread with the class heroName prefixed
  * and hero scene popups.
  */





const makeHeroSpread = function makeHeroSpread(heroName) {
  const spread = new __WEBPACK_IMPORTED_MODULE_0__Spread__["a" /* default */](false, false);
  // make animating popups
  const chest = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateY', 20, -30, 'px'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateX', -50, 30, 'px'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateZ', 1, 60, 'px'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, 15, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, -25, 'deg'),
    ],
    [heroName, 'chest']);
  spread.addChild(chest, 'LEFT');

  const head = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateZ', 0, 5, 'px'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, 195, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, 8, 'deg'),
    ],
    [heroName, 'head']);
  spread.addChild(head, 'LEFT', chest);

  const pelvis = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, 7, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateZ', 0, -2, 'px'),
    ],
    [heroName, 'pelvis']);
  spread.addChild(pelvis, 'LEFT', chest);

  const leg1 = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, -180, 'deg'),
    ],
    [heroName, 'leg1']);
  spread.addChild(leg1, 'LEFT', pelvis);

  const leg2 = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, -180, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, -10, 'deg'),
    ],
    [heroName, 'leg2']);
  spread.addChild(leg2, 'LEFT', pelvis);

  const cape = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, -3, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, 61, 'deg'),
    ],
    [heroName, 'cape']);
  spread.addChild(cape, 'LEFT', chest);

  const arm1Upper = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, 80, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateZ', 0, 5, 'px'),
    ],
    [heroName, 'arm1-upper']);
  spread.addChild(arm1Upper, 'LEFT', chest);

  const arm1Lower = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, -100, 'deg'),
    ],
    [heroName, 'arm1-lower']);
  spread.addChild(arm1Lower, 'LEFT', arm1Upper);

  const arm2 = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('',
    [
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('translateZ', 0, 10, 'px'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateZ', 0, -160, 'deg'),
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, 30, 'deg'),
    ],
    [heroName, 'arm2']);
  spread.addChild(arm2, 'LEFT', chest);

  for (let i = 1; i <= 5; i += 1) {
    const building = new __WEBPACK_IMPORTED_MODULE_2__PopUp__["a" /* default */]('translateZ(1px)',
      [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__AnimatedTransform__["a" /* default */])('rotateX', 0, 165, 'deg'),
      ],
      ['building', `building${i}`]);

    let side = 'RIGHT';
    if (i <= 2) {
      side = 'LEFT';
    }
    spread.addChild(building, side);
  }

  return spread;
};

/* harmony default export */ __webpack_exports__["a"] = makeHeroSpread;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App__ = __webpack_require__(2);


const app = new __WEBPACK_IMPORTED_MODULE_0__App__["a" /* default */]();
app.start();


/***/ })
/******/ ]);