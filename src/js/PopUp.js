/**
 * transformBase -- string of transforms that don't change. Base position, etc.
 * animatedTransforms -- list of AnimatedTrnasforms
*/
import BookPart from './BookPart';

class PopUp extends BookPart {
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

export default PopUp;
