"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, PlayCircle, TrendingUp } from "lucide-react"
import type { Task } from "@/app/page"

interface TaskStatsProps {
  tasks: Task[]
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length
  const todoTasks = tasks.filter((task) => task.status === "to-do").length
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length
  const doneTasks = tasks.filter((task) => task.status === "done").length
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "To Do",
      value: todoTasks,
      icon: Clock,
      color: "text-gray-600",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: PlayCircle,
      color: "text-yellow-600",
    },
    {
      title: "Completed",
      value: doneTasks,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
