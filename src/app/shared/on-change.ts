/**
 * To use as a decorator: allows to act as onChange on a single property of a component
 * @param callback called on change only
 * @returns simpleChanges and new value
 */
export function OnChange<T>(callback: (value: T, simpleChanges: SimpleChange<T>) => void) {
  const cachedKey = Symbol();
  const firstChangeKey = Symbol();
  return (target: any, key: PropertyKey) => {
    Object.defineProperty(target, key, {
      set: function (value) {
        if (this[cachedKey] === value) return;
        this[firstChangeKey] = this[firstChangeKey] === undefined;
        const simpleChange: SimpleChange<T> = {
          firstChange: this[firstChangeKey],
          previousValue: this[cachedKey],
          currentValue: value,
          isFirstChange: () => this[firstChangeKey],
        };
        this[cachedKey] = value;
        callback.call(this, value, simpleChange);
      },
      get: function () {
        return this[cachedKey];
      },
    });
  };
}

export interface SimpleChange<T> {
  firstChange: boolean;
  previousValue: T;
  currentValue: T;
  isFirstChange: () => boolean;
}
