import fs from "fs"
import path from "path"

export function scan(dir: string): string[] {

  const files: string[] = []

  function walk(current: string) {

    let entries: string[] = []

    try {

      entries = fs.readdirSync(current)

    } catch {

      return
    }

    for (const entry of entries) {

      const full =
        path.join(current, entry)

      // Ignore heavy folders
      if (
        entry === "node_modules" ||
        entry === ".git" ||
        entry === "dist" ||
        entry === "build" ||
        entry === ".next" ||
        entry === "coverage" ||
        entry === ".turbo"
      ) {
        continue
      }

      let stat

      try {

        stat = fs.statSync(full)

      } catch {

        continue
      }

      // Folder
      if (stat.isDirectory()) {

        walk(full)

      }

      // File
      else {

        const normalized =
          full.replace(/\\/g, "/")

        // Detect ALL relevant files
        const isCodeFile =

          normalized.endsWith(".ts") ||
          normalized.endsWith(".tsx") ||
          normalized.endsWith(".js") ||
          normalized.endsWith(".jsx")

        if (isCodeFile) {

          files.push(normalized)

        }

      }

    }

  }

  walk(dir)

  console.log("FILES FOUND:")
  console.log(files.length)

  return files
}