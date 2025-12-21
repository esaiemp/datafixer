/**
 * Parse CSV text into a 2D array
 * Properly handles quoted fields, escaped quotes, and commas within fields
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let inQuotes = false
  let i = 0

  while (i < text.length) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        // Escaped quote
        currentField += '"'
        i += 2
        continue
      } else if (char === '"') {
        // End of quoted field
        inQuotes = false
        i++
        continue
      } else {
        // Regular character inside quotes
        currentField += char
        i++
        continue
      }
    } else {
      if (char === '"') {
        // Start of quoted field
        inQuotes = true
        i++
        continue
      } else if (char === ",") {
        // Field delimiter
        currentRow.push(currentField)
        currentField = ""
        i++
        continue
      } else if (char === "\r" && nextChar === "\n") {
        // Windows line ending
        currentRow.push(currentField)
        if (currentRow.length > 0 || currentField !== "") {
          rows.push(currentRow)
        }
        currentRow = []
        currentField = ""
        i += 2
        continue
      } else if (char === "\n" || char === "\r") {
        // Unix/Mac line ending
        currentRow.push(currentField)
        if (currentRow.length > 0 || currentField !== "") {
          rows.push(currentRow)
        }
        currentRow = []
        currentField = ""
        i++
        continue
      } else {
        // Regular character
        currentField += char
        i++
        continue
      }
    }
  }

  // Don't forget the last field and row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }

  // Filter out completely empty rows
  return rows.filter((row) => row.some((field) => field.trim() !== ""))
}

/**
 * Generate CSV text from a 2D array
 * Properly quotes fields that contain commas, quotes, or newlines
 */
export function generateCSV(rows: string[][], header?: string[]): string {
  const allRows = header ? [header, ...rows] : rows

  return allRows
    .map((row) => {
      return row
        .map((field) => {
          // Check if field needs quoting
          if (field.includes(",") || field.includes('"') || field.includes("\n") || field.includes("\r")) {
            // Escape quotes by doubling them
            const escaped = field.replace(/"/g, '""')
            return `"${escaped}"`
          }
          return field
        })
        .join(",")
    })
    .join("\n")
}

/**
 * Sanitize cell values to prevent CSV injection attacks
 * Removes formula characters from the start of cells
 */
export function sanitizeForCSV(value: string): string {
  if (!value || value.length === 0) return value

  const dangerousChars = ["=", "+", "-", "@", "\t", "\r"]

  // If the value starts with a dangerous character, prefix with a single quote
  if (dangerousChars.some((char) => value.startsWith(char))) {
    return `'${value}`
  }

  return value
}
