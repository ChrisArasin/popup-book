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

export default AnimatedTransform;
