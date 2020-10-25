import * as React from "react"
import { CounterStore } from "./counterStore"
import { Counter } from "./counter"
import { useStore } from "mohx"

export function App() {
  const store = useStore(() => new CounterStore())

  return <Counter store={store} />
}
