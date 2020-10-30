import * as React from "react"
import { Counter } from "./counter"
import { defaultOptions, useStore } from "mohx"
import { isComputedProp, isObservableProp } from "mobx"
import { CounterStore } from "./stores"

defaultOptions.initHooksOptions = {
  isComputedProp,
  isObservableProp,
}

export function App() {
  const store = useStore(() => new CounterStore({ value: 0 }))

  // console.log(JSON.stringify(store, null, 2))

  return <Counter store={store} />
}
