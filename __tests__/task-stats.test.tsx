import { render, screen } from "@testing-library/react"
import { TaskStats } from "@/components/task-stats"
import "@testing-library/jest-dom"

describe("TaskStats", () => {
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
      status: "done" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      priority: "low" as const,
      status: "in-progress" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  test("calculates and displays correct statistics", () => {
    render(<TaskStats tasks={sampleTasks} />)

    expect(screen.getByText("3")).toBeInTheDocument() // Total tasks
    expect(screen.getByText("1")).toBeInTheDocument() // To do tasks
    expect(screen.getByText("33%")).toBeInTheDocument() // Completion rate
  })

  test("handles empty task list", () => {
    render(<TaskStats tasks={[]} />)

    expect(screen.getByText("0")).toBeInTheDocument() // Total tasks
    expect(screen.getByText("0%")).toBeInTheDocument() // Completion rate
  })
})
