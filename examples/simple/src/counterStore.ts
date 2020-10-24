import { action, computed, makeObservable, observable } from "mobx"

export class CounterStore {
  value = 0

  constructor() {
    makeObservable(this, {
      value: observable,
      increment: action,
      doubled: computed,
    })
  }

  increment = () => {
    this.value += 1
  }

  get doubled() {
    return this.value * 2 + 1
  }
}
