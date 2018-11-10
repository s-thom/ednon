/**
 * Adds zeroes to the beginning of a number to ensure it's the correct minimum length.
 * Numbers with more digits than length are not modified.
 *
 * @param numberToPad Number to pad
 * @param length Number of digits the string should be
 * @returns Formatted number
 */
export function zeroPad(numberToPad: number | string, length: number) {
  const numberStr = numberToPad.toString();
  const placeDifference = length - numberStr.length;

  if (placeDifference <= 0) {
    return numberStr;
  }

  // Generate an array of n+1 nothings, and join them with 0, leaving a string of n 0's
  // tslint:disable-next-line:newline-per-chained-call
  return `${Array(placeDifference + 1).join('0')}${numberStr}`;
}

/**
 * Returns a promise that resolves with no content after
 * the given number of milliseconds have passed
 *
 * @export
 * @param ms Number of milliseconds to delay by
 */
export function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Asynchronously map an array.
 * Functions may run/resolve out of order
 * unlike in Array#map()
 *
 * @param array Array to map
 * @param fn Mapping function
 * @returns Mapped array
 */
export function pMap<T, U>(array: T[], fn: (item: T) => Promise<U>) {
  return Promise.all(array.map(fn));
}

/**
 * Asynchronously filters an array.
 * Functions may run/resolve out of order
 * unlike in Array#map()
 *
 * @param array Array to filter
 * @param fn Filter function
 * @returns Filtered array
 */
export async function pFilter<T>(array: T[], fn: (item: T) => Promise<boolean>) {
  const combinedPromises = await pMap(array, async item => ({
    item,
    filter: await fn(item),
  }));

  return combinedPromises
    .filter(i => i.filter)
    .map(i => i.item);
}

/**
 * Asynchronously reduce an array
 *
 * @param array Array to reduce
 * @param fn Reducer function
 * @param initial Initial value for reducer
 * @returns Result of reduction
 */
export function pReduce<T, U>(array: T[], fn: (prev: U, curr: T) => Promise<U>, initial: U) {
  return array.reduce(
    (prom, current) => {
      return prom
        .then(previous => fn(previous, current));
    },
    Promise.resolve(initial),
  );
}

/**
 * Asynchronously find something in an array
 *
 * @param array Array to reduce
 * @param fn Find function
 * @param initial Initial value for reducer
 * @returns Result of reduction
 */
export async function pFind<T>(array: T[], fn: (item: T) => Promise<boolean>) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const result = await fn(element);
    if (result) {
      return element;
    }
  }
  return undefined;
}

/**
 * Runs the specified function after the returned function has not been called
 * for the timeout length
 *
 * @export
 * @param fn Function to run when timeout expires
 * @param timeout Length of timeout in ms
 */
// tslint:disable-next-line:no-any
export function createInactivityTimeout(fn: (...args: any[]) => any, timeout: number) {
  // tslint:disable-next-line:no-any
  let handler: NodeJS.Timer = 0 as any;

  return (...args) => {
    // Each time handler is called, clear the current timeout
    if (handler) {
      clearTimeout(handler);
    }

    handler = setTimeout(
      () => {
        clearTimeout(handler);
        // tslint:disable-next-line:no-any
        handler = undefined as any;
        // When the timeout completes, run the function
        // Use the latest arguments (if any)
        fn(...args);
      },
      timeout,
    );
  };
}

/**
 * Runs the specified function with a minimum period between calls of the timeout
 *
 * @export
 * @param fn Function to run when there's no timeout
 * @param timeout Length of timeout in ms
 */
// tslint:disable-next-line:no-any
export function createMinPeriodTimeout(fn: (...args: any[]) => any, timeout: number) {
  // tslint:disable-next-line:no-any
  let handler = undefined as any;

  return (...args) => {
    // Ignore function call if there is a timeout currently running
    if (handler) {
      return;
    }

    // Set the timeout
    handler = setTimeout(
      () => {
        clearTimeout(handler);
        // tslint:disable-next-line:no-any
        handler = undefined as any;
      },
      timeout,
    );

    // Run function immediately
    fn(...args);
  };
}

/**
 * Runs the specified function with a minimum period between calls of the timeout
 * Unlike the other version, this runs the function after the timeout
 *
 * @export
 * @param fn Function to run when there's no timeout
 * @param timeout Length of timeout in ms
 */
// tslint:disable-next-line:no-any
export function createMinPeriodPostTimeout(fn: (...args: any[]) => any, timeout: number) {
  // tslint:disable-next-line:no-any
  let handler = undefined as any;

  return (...args) => {
    // Ignore function call if there is a timeout currently running
    if (handler) {
      return;
    }

    // Set the timeout
    handler = setTimeout(
      () => {
        clearTimeout(handler);
        // tslint:disable-next-line:no-any
        handler = undefined as any;

        // Run function now that timeout has finished
        fn(...args);
      },
      timeout,
    );
  };
}

/**
 * Escapes a string to be used in a RegExp constructor
 *
 * @param str String to escape
 * @returns Escaped string
 */
export function escapeRegExp(str: string) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

const ID_BASE = 16;
const ID_DIGITS = 6;
const maxId = Math.pow(ID_BASE, ID_DIGITS);
export function generateId() {
  return zeroPad(
    Math.floor(Math.random() * maxId)
      .toString(ID_BASE),
    ID_DIGITS,
  );
}

export function stringAppendWithSpace(initial: string, ...values: string[] | undefined) {
  return `${initial}${values ? ` ${values.filter(Boolean).join(' ')}` : ''}`;
}
