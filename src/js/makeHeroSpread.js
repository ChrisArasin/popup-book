/**
  * function returns a new spread with the class heroName prefixed
  * and hero scene popups.
  */

import Spread from './Spread';
import AnimatedTransform from './AnimatedTransform';
import PopUp from './PopUp';

const makeHeroSpread = function makeHeroSpread(heroName) {
  const spread = new Spread(false, false);
  // make animating popups
  const chest = new PopUp('',
    [
      AnimatedTransform('translateY', 20, -30, 'px'),
      AnimatedTransform('translateX', -50, 30, 'px'),
      AnimatedTransform('translateZ', 1, 60, 'px'),
      AnimatedTransform('rotateZ', 0, 15, 'deg'),
      AnimatedTransform('rotateX', 0, -25, 'deg'),
    ],
    [heroName, 'chest']);
  spread.addChild(chest, 'LEFT');

  const head = new PopUp('',
    [
      AnimatedTransform('translateZ', 0, 5, 'px'),
      AnimatedTransform('rotateX', 0, 195, 'deg'),
      AnimatedTransform('rotateZ', 0, 8, 'deg'),
    ],
    [heroName, 'head']);
  spread.addChild(head, 'LEFT', chest);

  const pelvis = new PopUp('',
    [
      AnimatedTransform('rotateZ', 0, 7, 'deg'),
      AnimatedTransform('translateZ', 0, -2, 'px'),
    ],
    [heroName, 'pelvis']);
  spread.addChild(pelvis, 'LEFT', chest);

  const leg1 = new PopUp('',
    [
      AnimatedTransform('rotateX', 0, -180, 'deg'),
    ],
    [heroName, 'leg1']);
  spread.addChild(leg1, 'LEFT', pelvis);

  const leg2 = new PopUp('',
    [
      AnimatedTransform('rotateX', 0, -180, 'deg'),
      AnimatedTransform('rotateZ', 0, -10, 'deg'),
    ],
    [heroName, 'leg2']);
  spread.addChild(leg2, 'LEFT', pelvis);

  const cape = new PopUp('',
    [
      AnimatedTransform('rotateX', 0, -3, 'deg'),
      AnimatedTransform('rotateZ', 0, 61, 'deg'),
    ],
    [heroName, 'cape']);
  spread.addChild(cape, 'LEFT', chest);

  const arm1Upper = new PopUp('',
    [
      AnimatedTransform('rotateZ', 0, 80, 'deg'),
      AnimatedTransform('translateZ', 0, 5, 'px'),
    ],
    [heroName, 'arm1-upper']);
  spread.addChild(arm1Upper, 'LEFT', chest);

  const arm1Lower = new PopUp('',
    [
      AnimatedTransform('rotateZ', 0, -100, 'deg'),
    ],
    [heroName, 'arm1-lower']);
  spread.addChild(arm1Lower, 'LEFT', arm1Upper);

  const arm2 = new PopUp('',
    [
      AnimatedTransform('translateZ', 0, 10, 'px'),
      AnimatedTransform('rotateZ', 0, -160, 'deg'),
      AnimatedTransform('rotateX', 0, 30, 'deg'),
    ],
    [heroName, 'arm2']);
  spread.addChild(arm2, 'LEFT', chest);

  for (let i = 1; i <= 5; i += 1) {
    const building = new PopUp('translateZ(1px)',
      [
        AnimatedTransform('rotateX', 0, 165, 'deg'),
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

export default makeHeroSpread;
