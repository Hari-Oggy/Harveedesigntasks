import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { BarChart2, TrendingUp, PieChart as PieIcon, Activity } from 'lucide-react'
import type { ChartSuggestion } from '../../types'

interface ResultChartProps {
  data: Record<string, unknown>[]
  suggestion: ChartSuggestion
}

const COLORS = ['#0a6c4c', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E']

export function ResultChart({ data, suggestion }: ResultChartProps) {
  const { chart_type, x_column, y_column, title } = suggestion

  const renderChart = () => {
    switch (chart_type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey={x_column} tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey={y_column} fill="#0a6c4c" radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey={x_column} tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey={y_column} stroke="#0a6c4c" strokeWidth={3} dot={{ r: 4, fill: '#0a6c4c', strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </LineChart>
        )
      case 'area':
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey={x_column} tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey={y_column} fill="#0a6c4c" fillOpacity={0.2} stroke="#0a6c4c" strokeWidth={2} />
          </AreaChart>
        )
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={y_column}
              nameKey={x_column}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => {
                if (!name || percent === undefined) return ''
                return `${name} (${(percent * 100).toFixed(0)}%)`
              }}
              labelLine={{ stroke: '#9CA3AF' }}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        )
      case 'scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey={x_column} tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <YAxis dataKey={y_column} tick={{ fontSize: 12, fill: '#6B7280' }} stroke="#D1D5DB" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px' }}
            />
            <Scatter name={title} data={data} fill="#0a6c4c" />
          </ScatterChart>
        )
      default:
        return null
    }
  }

  const getIcon = () => {
    switch (chart_type) {
      case 'bar': return <BarChart2 size={16} />
      case 'line':
      case 'area': return <TrendingUp size={16} />
      case 'pie': return <PieIcon size={16} />
      case 'scatter': return <Activity size={16} />
      default: return null
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 px-2">
        <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
        <div className="text-gray-400 bg-gray-100 p-1.5 rounded-md">
          {getIcon()}
        </div>
      </div>
      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
