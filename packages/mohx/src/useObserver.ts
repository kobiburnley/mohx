import { useEffect, useState } from "react"
import { eventsPropertyKey } from "./symbols"
import { HasMohxEvents } from "./hasMohxEvents"

export function useObserver<T, K extends keyof T>(store: T, keys: K[]) {
  const result: Partial<Record<K, T[K]>> = {}

  for (const key of keys) {
    const [value, setValue] = useState(() => store[key])
    useEffect(() => {
      const hasMohxEvents = (store as unknown) as HasMohxEvents
      const listener = () => setValue(store[key])
      hasMohxEvents[eventsPropertyKey as "_mohxEvents"].on(
        key as symbol | string,
        listener
      )
      return () => {
        hasMohxEvents[eventsPropertyKey as "_mohxEvents"].off(
          key as symbol | string,
          listener
        )
      }
    }, [])
    result[key] = value
  }

  return result as Record<K, T[K]>
}
