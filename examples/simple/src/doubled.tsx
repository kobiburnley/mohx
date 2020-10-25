import * as React from "react"
import { memo } from "react"
import { CounterStore } from "./counterStore"
import { useObserver } from "mohx"

export const Doubled = memo(function _Doubled({ store }: { store: CounterStore }) {
  const { doubled } = useObserver(store, ["doubled"])
  return <b>{doubled}</b>
})
