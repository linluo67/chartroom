export function animation(obj, target, fn1) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var step = (target - obj.scrollTop) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer);
      if (fn1) {
        fn1();
      }
    } else {
      obj.scrollTop = obj.scrollTop + step;
    }
  }, 10);
}

export function debounce(fn) {
  let t = null;
  return function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn.apply(this, arguments);
    }, 1000);
  };
}

export function throttle(fn, delay = 200) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    });
  };
}
