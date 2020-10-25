import { useState } from "react"
import { initHooks } from "./initHooks"

export function useStore<T>(getStore: () => T) {
  const [store] = useState(() => {
    const v = getStore()
    initHooks(v)
    return v
  })
  return store
}
