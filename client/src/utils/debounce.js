export function debounce(fn, wait = 300, options = {}) {
  const { leading = false, trailing = true } = options;
  let timeout = null;
  let lastCallArgs = null;
  let leadingCalled = false;

  const invoke = () => {
    timeout = null;
    if (trailing && lastCallArgs) {
      fn.apply(null, lastCallArgs);
      lastCallArgs = null;
    }
  };

  return function (...args) {
    if (leading && !timeout && !leadingCalled) {
      leadingCalled = true;
      fn.apply(this, args);
    } else {
      lastCallArgs = args;
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      leadingCalled = false;
      invoke();
    }, wait);
  };
}
