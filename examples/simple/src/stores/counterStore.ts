import { observable } from "mobx"

export interface CounterStoreParams {
  value: number
}
export class CounterStore {
  @observable value: number

  constructor(params: CounterStoreParams) {
    this.value = params.value
  }

  increment = () => {
    this.value += 1
  }

  get doubled() {
    return this.value * 2 + 1
  }
}
