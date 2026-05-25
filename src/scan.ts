import fs from "fs"
import path from "path"

export function scan(dir: string) {
  const files: string[] = []

  function walk(current: string) {
    const entries = fs.readdirSync(current)

    for (const entry of entries) {
      const full = path.join(current, entry)
      const stat = fs.statSync(full)

      if (
        entry === "node_modules" ||
        entry === ".git"
      ) {
        continue
      }

      if (stat.isDirectory()) {
        walk(full)
      } else {
        files.push(full)
      }
    }
  }

  walk(dir)

  return files
}