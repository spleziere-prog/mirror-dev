#!/usr/bin/env node

import fs from "fs"
import { scan } from "./scan"
import { createGraph } from "./graph"
import { generateHTML } from "./html"

const files = scan(process.cwd())

const graph = createGraph(files)

const html = generateHTML(graph)

fs.writeFileSync("mirror.html", html)

console.log("MIRROR generated.")