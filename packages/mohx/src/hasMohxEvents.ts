import { EventEmitter } from "events"
import { eventsPropertyKey } from "./symbols"

export type HasMohxEvents = Record<typeof eventsPropertyKey, EventEmitter>
