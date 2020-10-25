import { EventEmitter } from "events"
import { eventsPropertyKey } from "./symbols"
import { isObservableProp } from "./isObservableProp"
import { isComputedProp } from "./isComputedProp"

export function initHooks<T>(store: T) {
  const events = new EventEmitter()

  let _computedProp: string | null = null

  Object.defineProperty(store, eventsPropertyKey, {
    get() {
      return events
    },
  })

  const propertyNames = Object.getOwnPropertyNames(store)
  const computedPropertyNames = propertyNames.filter((prop) =>
    isComputedProp(store, prop as string)
  )
  const observablePropertyNames = propertyNames.filter(
    (prop) => isObservableProp(store, prop as string) && !isComputedProp(store, prop as string)
  )

  for (const prop of observablePropertyNames) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const propertyDescriptor = Object.getOwnPropertyDescriptor(store, prop)!
    Object.defineProperty(store, prop, {
      ...propertyDescriptor,
      get(this: T) {
        const v = propertyDescriptor.get?.call(this)
        if (_computedProp != null) {
          events.on(prop, events.emit.bind(events, _computedProp))
        }
        return v
      },
      set(this: T, value: any) {
        propertyDescriptor.set?.call(this, value)
        events.emit(prop)
      },
    })
  }

  for (const prop of computedPropertyNames) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const propertyDescriptor = Object.getOwnPropertyDescriptor(store, prop)!
    _computedProp = prop
    propertyDescriptor.get?.call(store)
  }
  _computedProp = null
}
