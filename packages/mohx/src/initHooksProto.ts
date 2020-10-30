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

function getMobxDecorators(
  clz: new (...args: any[]) => unknown
): Record<string, { annotationType_?: string }> {
  for (const symbol of Object.getOwnPropertySymbols(clz.prototype)) {
    if (symbol.toString() === "Symbol(mobx-decorators)") {
      return clz.prototype[symbol]
    }
  }
  return {}
}

export function initHooksProto<T>(clz: new (...args: any[]) => T) {
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

  const mobxDecorators = getMobxDecorators(clz)

  for (const [prop, observable] of Object.entries(mobxDecorators)) {
    if (observable.annotationType_ === "observable") {
      Object.defineProperty(clz.prototype, prop, {
        configurable: true,
        enumerable: true,
        get(this: AtomsExtensions) {
          const {
            $AtomsExtensions_atoms: atoms,
            $AtomsExtensions_super: supers,
          } = this
          atoms[prop].reportObserved()
          return supers[prop]
        },
        set(this: AtomsExtensions, value: any) {
          const {
            $AtomsExtensions_events: events,
            $AtomsExtensions_atoms: atoms,
            $AtomsExtensions_super: supers,
          } = this
          if (atoms[prop] == null) {
            atoms[prop] = createAtom(prop)
          }
          supers[prop] = value
          atoms[prop].reportChanged()
          events.emit(prop)
          return supers[prop]
        },
      })
    }
  }
}
