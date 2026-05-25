import fs from "fs"

export function createGraph(files: string[]) {
  let graph = "graph LR\n"

  files.forEach((file, i) => {
    const clean = cleanName(file)

    graph += `Node${i}[${clean}]\n`

    try {
      const content = fs.readFileSync(file, "utf-8")

      const imports = content.match(/from ["'](.+)["']/g)

      if (imports) {
        imports.forEach((imp, j) => {
          graph += `Node${i} --> Import${i}${j}\n`
        })
      }
    } catch {}
  })

  return graph
}

function cleanName(name: string) {
  return name
    .replace(process.cwd(), "")
    .replace(/[/.]/g, "_")
    .replace(/-/g, "_")
}