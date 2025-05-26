import { render, screen } from "@testing-library/react"
import { TaskList } from "@/components/task-list"
import "@testing-library/jest-dom"
import { jest } from "@jest/globals"

describe("TaskList", () => {
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  const sampleTasks = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      priority: "high" as const,
      status: "to-do" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      priority: "medium" as const,
      status: "in-progress" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  test("renders tasks correctly", () => {
    render(<TaskList tasks={sampleTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} title="Test Tasks" />)

    expect(screen.getByText("Task 1")).toBeInTheDocument()
    expect(screen.getByText("Task 2")).toBeInTheDocument()
    expect(screen.getByText("Test Tasks")).toBeInTheDocument()
  })

  test("shows empty state when no tasks", () => {
    render(<TaskList tasks={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} title="Empty Tasks" />)

    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument()
  })
})
