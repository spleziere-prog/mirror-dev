export function createGraph(files: string[]) {

  let graph = `
graph LR
`

  const relations = new Set<string>()
  const nodes = new Set<string>()

  files.forEach((file) => {

    const normalized =
      file.replace(/\\/g, "/")

    // Start graph from src
    const srcIndex =
      normalized.indexOf("/src/")

    if (srcIndex === -1) {
      return
    }

    const relative =
      normalized.slice(srcIndex + 1)

    const parts =
      relative.split("/")

    // remove filename
    parts.pop()

    for (
      let i = 0;
      i < parts.length - 1;
      i++
    ) {

      const parent =
        sanitize(parts[i])

      const child =
        sanitize(parts[i + 1])

      if (
        parent &&
        child &&
        parent !== child
      ) {

        nodes.add(parent)
        nodes.add(child)

        relations.add(
          `${parent} --> ${child}`
        )

      }

    }

  })

  // create nodes
  nodes.forEach((node) => {

    graph += `
${node}["📁 ${node}"]
`

  })

  // create relations
  relations.forEach((relation) => {

    graph += `
${relation}
`

  })

  return graph
}

function sanitize(name: string) {

  return name
    .replace(/[^a-zA-Z0-9]/g, "_")
}