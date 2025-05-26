"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Clock, CheckCircle, Circle, PlayCircle } from "lucide-react"
import type { Task } from "@/app/page"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "to-do":
        return <Circle className="h-4 w-4" />
      case "in-progress":
        return <PlayCircle className="h-4 w-4" />
      case "done":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "to-do":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "done":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{task.title}</CardTitle>
          <div className="flex gap-1 ml-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={getPriorityColor(task.priority)}>{task.priority.toUpperCase()}</Badge>
          <Badge className={getStatusColor(task.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(task.status)}
              {task.status.replace("-", " ").toUpperCase()}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{task.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Created: {task.createdAt.toLocaleDateString()}</span>
        </div>
        {task.updatedAt.getTime() !== task.createdAt.getTime() && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Clock className="h-3 w-3" />
            <span>Updated: {task.updatedAt.toLocaleDateString()}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
