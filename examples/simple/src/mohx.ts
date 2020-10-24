import { useEffect, useState } from "react"
import { EventEmitter } from "events"
import { isComputedProp, isObservableProp } from "mobx"

const eventsPropertyKey = typeof Symbol !== "undefined" ? Symbol("_mohxEvents") : "_mohxEvents"
export type HasMohxEvents = Record<typeof eventsPropertyKey, EventEmitter>

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

export function useObserver<T, K extends keyof T>(store: T, keys: K[]) {
  const result: Partial<Record<K, T[K]>> = {}

  for (const key of keys) {
    const [value, setValue] = useState(() => store[key])
    useEffect(() => {
      const hasMohxEvents = (store as unknown) as HasMohxEvents
      const listener = () => setValue(store[key])
      hasMohxEvents[eventsPropertyKey as "_mohxEvents"].on(key as symbol | string, listener)
      return () => {
        hasMohxEvents[eventsPropertyKey as "_mohxEvents"].off(key as symbol | string, listener)
      }
    }, [])
    result[key] = value
  }

  return result as Record<K, T[K]>
}

export function useStore<T>(getStore: () => T) {
  const [store] = useState(() => {
    const v = getStore()
    initHooks(v)
    return v
  })
  return store
}
