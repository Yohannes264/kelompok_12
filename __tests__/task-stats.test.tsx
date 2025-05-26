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

    // Use more specific queries to avoid ambiguity
    expect(screen.getByText("Total Tasks")).toBeInTheDocument()
    expect(screen.getByText("To Do")).toBeInTheDocument()
    expect(screen.getByText("In Progress")).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()
    expect(screen.getByText("33%")).toBeInTheDocument() // Completion rate

    // Check that we have the right number of task cards
    const totalTasksCard = screen.getByText("Total Tasks").closest(".rounded-lg")
    expect(totalTasksCard).toHaveTextContent("3")
  })

  test("handles empty task list", () => {
    render(<TaskStats tasks={[]} />)

    expect(screen.getByText("Total Tasks")).toBeInTheDocument()
    expect(screen.getByText("0%")).toBeInTheDocument() // Completion rate

    // Check that total tasks shows 0
    const totalTasksCard = screen.getByText("Total Tasks").closest(".rounded-lg")
    expect(totalTasksCard).toHaveTextContent("0")
  })
})
