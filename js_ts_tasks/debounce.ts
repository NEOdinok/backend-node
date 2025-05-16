// Написать debounce функцию

// const fn = debounce(() => console.log('fn'), 300);
// fn()
// fn()

function debounce(fn: () => void, timeout: number): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn();
    }, timeout);
  };
}
