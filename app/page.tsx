"use client"

import { useState, useEffect } from "react"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"
import { TaskStats } from "@/components/task-stats"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckSquare, Plus } from "lucide-react"

export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "to-do" | "in-progress" | "done"
  createdAt: Date
  updatedAt: Date
}

export default function TaskEasyApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskeasy-tasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }))
        setTasks(parsedTasks)
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskeasy-tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks((prev) => [...prev, newTask])
    setShowForm(false)
  }

  const updateTask = (id: string, taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...taskData, updatedAt: new Date() } : task)))
    setEditingTask(null)
    setShowForm(false)
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setShowForm(false)
  }

  // Sort tasks by priority (high -> medium -> low)
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  const todoTasks = sortedTasks.filter((task) => task.status === "to-do")
  const inProgressTasks = sortedTasks.filter((task) => task.status === "in-progress")
  const doneTasks = sortedTasks.filter((task) => task.status === "done")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckSquare className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">TaskEasy</h1>
          </div>
          <p className="text-lg text-gray-600">Lightweight task management for agile teams</p>
        </div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Add Task Button */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Task Management</CardTitle>
                    <CardDescription>Create, update, and track your tasks efficiently</CardDescription>
                  </div>
                  <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              {showForm && (
                <CardContent>
                  <TaskForm
                    onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
                    onCancel={handleCancelEdit}
                    initialData={editingTask}
                    isEditing={!!editingTask}
                  />
                </CardContent>
              )}
            </Card>
          </div>
        </div>

        {/* Task Lists */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
            <TabsTrigger value="to-do">To Do ({todoTasks.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressTasks.length})</TabsTrigger>
            <TabsTrigger value="done">Done ({doneTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <TaskList tasks={sortedTasks} onEdit={handleEdit} onDelete={deleteTask} title="All Tasks" />
          </TabsContent>

          <TabsContent value="to-do" className="mt-6">
            <TaskList tasks={todoTasks} onEdit={handleEdit} onDelete={deleteTask} title="To Do Tasks" />
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            <TaskList tasks={inProgressTasks} onEdit={handleEdit} onDelete={deleteTask} title="In Progress Tasks" />
          </TabsContent>

          <TabsContent value="done" className="mt-6">
            <TaskList tasks={doneTasks} onEdit={handleEdit} onDelete={deleteTask} title="Completed Tasks" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
