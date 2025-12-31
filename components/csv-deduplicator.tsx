"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Upload, Download, FileText, Trash2 } from "lucide-react"
import { parseCSV, generateCSV, sanitizeForCSV } from "@/lib/csv-utils"
import { DFLogo } from "@/components/df-logo"
import Link from "next/link"

type DeduplicationMode = "entire-row" | "specific-column"
type KeepOption = "first" | "last"

interface ProcessingResult {
  originalCount: number
  uniqueCount: number
  removedCount: number
  fileName: string
}

export default function CSVDeduplicator() {
  const [file, setFile] = useState<File | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [mode, setMode] = useState<DeduplicationMode>("entire-row")
  const [selectedColumn, setSelectedColumn] = useState<string>("")
  const [keepOption, setKeepOption] = useState<KeepOption>("first")
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [hasHeader, setHasHeader] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProcessingResult | null>(null)
  const [processedData, setProcessedData] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    if (!selectedFile.name.endsWith(".csv")) {
      setError("Please select a valid CSV file")
      return
    }

    // Validate file size (max 50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50MB")
      return
    }

    setFile(selectedFile)
    setError(null)
    setResult(null)
    setProcessedData(null)

    try {
      const text = await selectedFile.text()
      const parsed = parseCSV(text)

      if (parsed.length === 0) {
        setError("CSV file is empty")
        return
      }

      // Extract column names from first row if header exists
      if (hasHeader && parsed.length > 0) {
        setColumns(parsed[0])
        setSelectedColumn(parsed[0][0] || "")
      } else {
        // Generate column indices as names
        const colCount = parsed[0]?.length || 0
        const generatedCols = Array.from({ length: colCount }, (_, i) => `Column ${i + 1}`)
        setColumns(generatedCols)
        setSelectedColumn(generatedCols[0] || "")
      }
    } catch (err) {
      setError("Failed to parse CSV file. Please ensure it is properly formatted.")
      setFile(null)
    }
  }

  const processCSV = async () => {
    if (!file) return

    setProcessing(true)
    setError(null)
    setResult(null)

    try {
      const text = await file.text()
      const rows = parseCSV(text)

      if (rows.length === 0) {
        throw new Error("CSV file is empty")
      }

      let headerRow: string[] = []
      let dataRows: string[][] = []

      if (hasHeader) {
        headerRow = rows[0]
        dataRows = rows.slice(1)
      } else {
        dataRows = rows
      }

      const originalCount = dataRows.length
      const seen = new Set<string>()
      const uniqueRows: string[][] = []

      // Process based on mode
      if (mode === "entire-row") {
        const rowsToProcess = keepOption === "first" ? dataRows : [...dataRows].reverse()

        for (const row of rowsToProcess) {
          const key = row
            .map((cell) => {
              let value = cell
              if (trimWhitespace) value = value.trim()
              if (!caseSensitive) value = value.toLowerCase()
              return value
            })
            .join("|")

          if (!seen.has(key)) {
            seen.add(key)
            uniqueRows.push(row)
          }
        }

        if (keepOption === "last") uniqueRows.reverse()
      } else {
        // Specific column mode
        const columnIndex = hasHeader
          ? headerRow.indexOf(selectedColumn)
          : Number.parseInt(selectedColumn.replace("Column ", "")) - 1

        if (columnIndex === -1 || columnIndex >= (dataRows[0]?.length || 0)) {
          throw new Error("Selected column not found in CSV")
        }

        const rowsToProcess = keepOption === "first" ? dataRows : [...dataRows].reverse()

        for (const row of rowsToProcess) {
          let keyValue = row[columnIndex] || ""
          if (trimWhitespace) keyValue = keyValue.trim()
          if (!caseSensitive) keyValue = keyValue.toLowerCase()

          if (!seen.has(keyValue)) {
            seen.add(keyValue)
            uniqueRows.push(row)
          }
        }

        if (keepOption === "last") uniqueRows.reverse()
      }

      // Sanitize data to prevent CSV injection
      const sanitizedRows = uniqueRows.map((row) => row.map(sanitizeForCSV))
      const sanitizedHeader = hasHeader ? headerRow.map(sanitizeForCSV) : []

      // Generate CSV output
      const csvOutput = generateCSV(sanitizedRows, hasHeader ? sanitizedHeader : undefined)

      setProcessedData(csvOutput)
      setResult({
        originalCount,
        uniqueCount: uniqueRows.length,
        removedCount: originalCount - uniqueRows.length,
        fileName: file.name.replace(".csv", "_deduplicated.csv"),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process CSV file")
    } finally {
      setProcessing(false)
    }
  }

  const downloadCSV = () => {
    if (!processedData || !result) return

    const blob = new Blob([processedData], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = result.fileName
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const resetTool = () => {
    setFile(null)
    setColumns([])
    setSelectedColumn("")
    setError(null)
    setResult(null)
    setProcessedData(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-10 px-5 text-center">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 hover:opacity-90 transition-opacity">
            <DFLogo size="md" />
            <span className="text-xl font-bold">DataFixer</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">Remove Duplicates from CSV</h1>
          <p className="text-base md:text-lg text-primary-foreground/90 text-balance">
            Clean your CSV files directly in your browser. Fast, free, and secure – no uploads.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - File Upload & Options */}
          <Card className="shadow-md h-fit">
            <CardHeader>
              <CardTitle className="text-xl">Upload CSV File</CardTitle>
              <CardDescription>
                Select a CSV file to remove duplicates. All processing happens locally in your browser.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div className="space-y-3">
                <Label htmlFor="csv-file" className="text-base font-medium">
                  Choose File
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                    aria-describedby="file-requirements"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full sm:w-auto"
                    type="button"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select CSV File
                  </Button>
                  {file && (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm truncate" title={file.name}>
                        {file.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetTool}
                        className="flex-shrink-0"
                        aria-label="Remove file"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p id="file-requirements" className="text-sm text-muted-foreground">
                  Max file size: 50MB. CSV format only.
                </p>
              </div>

              {/* Options - Only show when file is loaded */}
              {file && columns.length > 0 && (
                <>
                  {/* Header Row Toggle */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has-header"
                      checked={hasHeader}
                      onCheckedChange={(checked) => setHasHeader(checked as boolean)}
                    />
                    <Label htmlFor="has-header" className="font-normal cursor-pointer">
                      First row contains column headers
                    </Label>
                  </div>

                  {/* Deduplication Mode */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Deduplication Mode</Label>
                    <RadioGroup value={mode} onValueChange={(value) => setMode(value as DeduplicationMode)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="entire-row" id="entire-row" />
                        <Label htmlFor="entire-row" className="font-normal cursor-pointer">
                          Remove duplicate rows (compare all columns)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specific-column" id="specific-column" />
                        <Label htmlFor="specific-column" className="font-normal cursor-pointer">
                          Remove duplicates based on specific column
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Column Selection */}
                  {mode === "specific-column" && (
                    <div className="space-y-2">
                      <Label htmlFor="column-select" className="text-base font-medium">
                        Select Column
                      </Label>
                      <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                        <SelectTrigger id="column-select">
                          <SelectValue placeholder="Choose a column" />
                        </SelectTrigger>
                        <SelectContent>
                          {columns.map((col, index) => (
                            <SelectItem key={index} value={col}>
                              {col}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Keep Option */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">When Duplicates Found</Label>
                    <RadioGroup value={keepOption} onValueChange={(value) => setKeepOption(value as KeepOption)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="first" id="keep-first" />
                        <Label htmlFor="keep-first" className="font-normal cursor-pointer">
                          Keep first occurrence
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="last" id="keep-last" />
                        <Label htmlFor="keep-last" className="font-normal cursor-pointer">
                          Keep last occurrence
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Additional Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="trim-whitespace"
                          checked={trimWhitespace}
                          onCheckedChange={(checked) => setTrimWhitespace(checked as boolean)}
                        />
                        <Label htmlFor="trim-whitespace" className="font-normal cursor-pointer">
                          Trim whitespace before comparison
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="case-sensitive"
                          checked={caseSensitive}
                          onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                        />
                        <Label htmlFor="case-sensitive" className="font-normal cursor-pointer">
                          Case-sensitive comparison
                        </Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Error Alert - Show in left column */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Right Column - Action Button & Results */}
          <div className="space-y-6">
            {/* Process Button Card */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Process CSV</CardTitle>
                <CardDescription>Click the button below to remove duplicates from your file.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={processCSV} disabled={!file || processing} className="w-full" size="lg">
                  {processing ? "Processing..." : "Remove Duplicates"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Card */}
            {result && processedData && (
              <Card className="shadow-md border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Processing Complete!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Results:</p>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>Original rows: {result.originalCount}</li>
                      <li>Unique rows: {result.uniqueCount}</li>
                      <li>Duplicates removed: {result.removedCount}</li>
                    </ul>
                  </div>
                  <Button onClick={downloadCSV} className="w-full" variant="default" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download Cleaned CSV
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground leading-relaxed">
          <p className="mt-6 text-center text-sm text-gray-700 leading-relaxed">
  Remove duplicate rows from your CSV files quickly and securely with DataFixer. 
  All processing happens directly in your browser, so your sensitive data never leaves your device. 
  Our CSV Duplicates Removal tool is perfect for cleaning contact lists, sales reports, product catalogs, 
  survey data, and any other CSV files. Fast, reliable, and easy to use: just upload your file, 
  choose your options, and download a clean, ready-to-use CSV. 
  Keep your data accurate, organized, and ready for analysis without installing any software.
</p>
        </div>
      </div>

      <footer className="bg-[#111827] text-[#9ca3af] py-[30px] px-5 text-center text-sm mt-12">
        <div className="flex justify-center mb-4">
          <DFLogo size="sm" className="opacity-60" />
        </div>
        <p className="mb-2">
          <Link href="/" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            Home
          </Link>{" "}
          |
          <Link href="/about" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            About Us
          </Link>{" "}
          |
          <Link href="/privacy" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            Privacy Policy
          </Link>{" "}
          |
          <Link href="/about" className="text-[#9ca3af] no-underline mx-2.5 hover:text-white">
            Contact Us
          </Link>
        </p>
        <p className="m-0">© DataFixer</p>
      </footer>
    </div>
  )
}
