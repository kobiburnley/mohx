import * as React from "react"
import { memo } from "react"
import { useObserver } from "mohx"
import { CounterStore } from "./stores"

export const Doubled = memo(function _Doubled({
  store,
}: {
  store: CounterStore
}) {
  const { doubled } = useObserver(store, ["doubled"])
  return <b>{doubled}</b>
})
