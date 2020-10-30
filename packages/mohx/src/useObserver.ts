import { useEffect, useState } from "react"
import { assertHasAtomsExtensions } from "./assertHasAtomsExtensions"

export function useObserver<T, K extends keyof T>(store: T, keys: K[]) {
  assertHasAtomsExtensions(store)

  const [result] = useState<Partial<Record<K, T[K]>>>({})

  for (const key of keys) {
    const [, setValue] = useState(() => {
      const v = store[key]
      result[key] = v
      return v
    })
    useEffect(() => {
      const { $AtomsExtensions_events: events } = store
      const listener = () => {
        const v = store[key]
        result[key] = v
        setValue(store[key])
      }
      events.on(key as symbol | string, listener)
      return () => {
        events.off(key as symbol | string, listener)
      }
    }, [])
  }

  return result as Record<K, T[K]>
}
