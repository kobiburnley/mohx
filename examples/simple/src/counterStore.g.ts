import { CounterStoreParams } from "./counterStore"
import { IAtom, createAtom } from "mobx"

export abstract class _$CounterStore {
  _$CounterStore_super: CounterStoreParams = {} as any
  _$CounterStore_atoms: Record<string, IAtom> = {} as any

  get value() {
    const { value } = this._$CounterStore_super
    return value
  }

  set value(v: number) {
    this._$CounterStore_super.value = v
  }
}
