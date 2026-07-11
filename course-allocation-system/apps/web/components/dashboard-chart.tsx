"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { course: "Computer Science", allocated: 150, waitlisted: 45 },
  { course: "Electrical Eng.", allocated: 120, waitlisted: 30 },
  { course: "Mechanical Eng.", allocated: 100, waitlisted: 25 },
  { course: "Civil Eng.", allocated: 90, waitlisted: 10 },
  { course: "Information Tech.", allocated: 130, waitlisted: 40 },
]

const chartConfig = {
  allocated: {
    label: "Allocated",
    color: "hsl(var(--chart-1))",
  },
  waitlisted: {
    label: "Waitlisted",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DashboardChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Course Allocations Overview</CardTitle>
        <CardDescription>Current semester seat allocations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="course"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.substring(0, 10) + "..."}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="allocated" fill="var(--color-allocated)" radius={4} />
            <Bar dataKey="waitlisted" fill="var(--color-waitlisted)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
