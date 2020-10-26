import * as React from "react"
import { memo } from "react"
import { CounterStore } from "./counterStore"
import { useObserver, useStore } from "mohx"
import { Doubled } from "./doubled"

export const Counter = memo(function CounterC({
  store,
  level = 0,
}: {
  store: CounterStore
  level?: number
}) {
  const { value } = useObserver(store, ["value"])

  const anotherCounter = useStore(() => new CounterStore({value: 0}))

  return (
    <>
      <span>
        {value}, <Doubled store={store} />
      </span>
      <button onClick={store.increment}>Increment</button>

      {level < 5 && (
        <div>
          <Counter store={anotherCounter} level={level + 1} />
        </div>
      )}
    </>
  )
})
