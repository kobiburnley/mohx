import { useEffect, useState } from "react"
import { AtomsExtensions } from "./initHooksProto"

export function useObserver<T, K extends keyof T>(store: T, keys: K[]) {
  const result: Partial<Record<K, T[K]>> = {}

  for (const key of keys) {
    const [value, setValue] = useState(() => store[key])
    useEffect(() => {
      const hasMohxEvents = (store as unknown) as AtomsExtensions
      const listener = () => setValue(store[key])
      hasMohxEvents.$AtomsExtensions_events.on(
        key as symbol | string,
        listener
      )
      return () => {
        hasMohxEvents.$AtomsExtensions_events.off(
          key as symbol | string,
          listener
        )
      }
    }, [])
    result[key] = value
  }

  return result as Record<K, T[K]>
}
