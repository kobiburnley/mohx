import { render } from "react-dom"
import * as React from "react"
import { App } from "./app"

const root = document.createElement("div")
document.body.appendChild(root)
render(<App />, root)
