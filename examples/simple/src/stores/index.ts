import { initHooksProto } from "mohx"
import { CounterStore } from "./counterStore"

initHooksProto(CounterStore)

export * from "./counterStore"
