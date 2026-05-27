#!/usr/bin/env node

import fs from "fs"
import path from "path"

import { scan } from "./scan"
import { createGraph } from "./graph"
import { generateHTML } from "./html"

const target = process.argv[2]
  ? path.resolve(process.argv[2])
  : process.cwd()

console.log("TARGET:")
console.log(target)

const files = scan(target)

console.log("FILES:")
console.log(files)

const graph =
  createGraph(files)

console.log("GRAPH:")
console.log(graph)

const html =
  generateHTML(graph)

fs.writeFileSync(
  "mirror.html",
  html
)

console.log("MIRROR generated.")