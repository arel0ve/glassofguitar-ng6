class Animation {
  static animate({duration = 1000, timing = Animation.linearTiming, draw, complete}) {

    const start = performance.now();

    requestAnimationFrame(function animate(time) {

      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        if (!complete) {
          return;
        }

        complete();
      }

    });
  }

  static makeEaseOutTimingF(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    };
  }

  static makeEaseInOutTimingF(timing) {
    return function(timeFraction) {
      if (timeFraction < .5) {
        return timing(2 * timeFraction) / 2;
      } else {
        return (2 - timing(2 * (1 - timeFraction))) / 2;
      }
    };
  }

  static linearTiming(progress) {
    return progress;
  }

  static quadTiming(progress) {
    return progress ** 2;
  }

  static cubeTiming(progress) {
    return progress ** 3;
  }

  static quartTiming(progress) {
    return progress ** 4;
  }

  static quintTiming(progress) {
    return progress ** 5;
  }

  static circleTiming(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
  }

  static backTiming(timeFraction) {
    const x = 2;
    return timeFraction ** 2 * ((x + 1) * timeFraction - x);
  }

  static bounceTiming(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + b ** 2;
      }
    }
  }

  static elasticTiming(timeFraction) {
    const x = 1.5;
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
  }
}
