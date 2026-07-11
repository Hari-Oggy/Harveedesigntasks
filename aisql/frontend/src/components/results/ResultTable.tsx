import { ChevronDown } from 'lucide-react'
import { useState } from 'react'


interface ResultTableProps {
  columns: string[]
  rows: Record<string, unknown>[]
  totalRows: number
}

export function ResultTable({ columns, rows, totalRows }: ResultTableProps) {
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDesc, setSortDesc] = useState(false)

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDesc(!sortDesc)
    } else {
      setSortCol(col)
      setSortDesc(false)
    }
  }

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortCol) return 0
    const aVal = a[sortCol] as any
    const bVal = b[sortCol] as any
    
    if (aVal === bVal) return 0
    if (aVal === null) return 1
    if (bVal === null) return -1
    
    const modifier = sortDesc ? -1 : 1
    return aVal < bVal ? -1 * modifier : 1 * modifier
  })

  return (
    <div className="w-full flex flex-col h-full bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-500 w-12 text-center text-xs uppercase tracking-wider">
                #
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  className="px-4 py-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors group select-none text-xs uppercase tracking-wider"
                >
                  <div className="flex items-center justify-between gap-2">
                    {col}
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${
                        sortCol === col
                          ? sortDesc ? 'rotate-180 opacity-100' : 'opacity-100'
                          : 'opacity-0 group-hover:opacity-50'
                      }`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5 text-center text-gray-400 text-xs font-medium">
                  {idx + 1}
                </td>
                {columns.map((col) => {
                  const val = row[col]
                  const isNull = val === null || val === undefined
                  const isNumber = typeof val === 'number'
                  
                  return (
                    <td
                      key={col}
                      className={`px-4 py-2.5 text-[13px] ${
                        isNull ? 'italic text-gray-400' : 
                        isNumber ? 'text-gray-700 tabular-nums' : 
                        'text-gray-700'
                      }`}
                    >
                      {isNull ? 'null' : String(val)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalRows > rows.length && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center font-medium">
          Showing {rows.length} of {totalRows.toLocaleString()} rows (Limit 1000)
        </div>
      )}
    </div>
  )
}
