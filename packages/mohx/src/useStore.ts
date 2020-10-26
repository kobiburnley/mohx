import { useState } from "react"

export function useStore<T>(getStore: () => T) {
  const [store] = useState(() => {
    return getStore()
  })
  return store
}
