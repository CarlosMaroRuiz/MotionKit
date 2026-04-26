export function animate(from, to, options) {
  const start = performance.now();
  let handle;
  
  const step = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / (options.duration * 1000), 1);
    const eased = options.ease ? (1 - Math.pow(1 - progress, 3)) : progress;
    const current = from + (to - from) * eased;
    
    options.onUpdate(current);
    
    if (progress < 1) {
      handle = requestAnimationFrame(step);
    }
  };
  
  handle = requestAnimationFrame(step);
  return { stop: () => cancelAnimationFrame(handle) };
}
