import { createAtom, IAtom } from "mobx"
import { EventEmitter } from "events"

export abstract class AtomsExtensions {
  private _$AtomsExtensions_atoms?: Record<string, IAtom>
  get $AtomsExtensions_atoms() {
    if (this._$AtomsExtensions_atoms == null) {
      this._$AtomsExtensions_atoms = {}
    }
    return this._$AtomsExtensions_atoms
  }

  private _$AtomsExtensions_super?: Record<string, any>
  get $AtomsExtensions_super() {
    if (this._$AtomsExtensions_super == null) {
      this._$AtomsExtensions_super = {}
    }
    return this._$AtomsExtensions_super
  }

  private _$AtomsExtensions_events?: EventEmitter
  get $AtomsExtensions_events() {
    if (this._$AtomsExtensions_events == null) {
      this._$AtomsExtensions_events = new EventEmitter()
    }
    return this._$AtomsExtensions_events
  }
}

function getMobxDecorators(clz: new (...args: any[]) => unknown) {
  for (const symbol of Object.getOwnPropertySymbols(clz.prototype)) {
    if (symbol.toString() === "Symbol(mobx-decorators)") {
      return clz.prototype[symbol]
    }
  }
}

export function initHooksProto<T>(clz: new (...args: any[]) => T) {
  console.log("initHooksProto")
  for (const prop of [
    ...Object.getOwnPropertyNames(AtomsExtensions.prototype),
    ...Object.getOwnPropertySymbols(AtomsExtensions.prototype),
  ]) {
    Object.defineProperty(
      clz.prototype,
      prop,
      Object.getOwnPropertyDescriptor(
        AtomsExtensions.prototype,
        prop
      ) as PropertyDescriptor
    )
  }

  for (const [prop, observable] of Object.entries(
    getMobxDecorators(clz)
  ) as any) {
    if (observable.annotationType_ === "observable") {
      Object.defineProperty(clz.prototype, prop, {
        configurable: true,
        enumerable: true,
        get(this: AtomsExtensions) {
          this.$AtomsExtensions_atoms[prop].reportObserved()
          return this.$AtomsExtensions_super[prop]
        },
        set(this: AtomsExtensions, value: any) {
          if (this.$AtomsExtensions_atoms[prop] == null) {
            this.$AtomsExtensions_atoms[prop] = createAtom(prop)
          }
          this.$AtomsExtensions_super[prop] = value
          // console.log('set2', _this1, this)
          this.$AtomsExtensions_atoms[prop].reportChanged()
          this.$AtomsExtensions_events.emit(prop)
          return this.$AtomsExtensions_super[prop]
        },
      })
    }
  }
}
