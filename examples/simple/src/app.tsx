import * as React from "react"
import { CounterStore } from "./counterStore"
import { Counter } from "./counter"
import { defaultOptions, useStore } from "mohx"
import { isComputedProp, isObservableProp } from "mobx"

defaultOptions.initHooksOptions = {
  isComputedProp,
  isObservableProp,
}

export function App() {
  const store = useStore(() => new CounterStore({ value: 0 }))

  console.log(JSON.stringify(store, null, 2))

  return <Counter store={store} />
}
