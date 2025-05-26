"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskCard } from "@/components/task-card"
import type { Task } from "@/app/page"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  title: string
}

export function TaskList({ tasks, onEdit, onDelete, title }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>No tasks found. Create your first task to get started!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
