function animate({duration = 1000, timing = linearTiming, draw, complete}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {

    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      if (!complete) return;

      complete();
    }

  });
}

function makeEaseOutTimingF(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}

function makeEaseInOutTimingF(timing) {
  return function(timeFraction) {
    if (timeFraction < .5)
      return timing(2 * timeFraction) / 2;
    else
      return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}

function linearTiming(progress) {
  return progress;
}

function quadTiming(progress) {
  return Math.pow(progress, 2);
}

function cubeTiming(progress) {
  return Math.pow(progress, 3);
}

function quartTiming(progress) {
  return Math.pow(progress, 3);
}

function quintTiming(progress) {
  return Math.pow(progress, 3);
}

function circleTiming(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction));
}

function backTiming(timeFraction) {
  let x = 2;
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}

function bounceTiming(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
    }
  }
}

function elasticTiming(timeFraction) {
  let x = 1.5;
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
}

