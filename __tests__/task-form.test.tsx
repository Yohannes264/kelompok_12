"use client"

import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { TaskForm } from "@/components/task-form"
import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

describe("TaskForm", () => {
  const mockOnSubmit = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders form fields correctly", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
  })

  test("shows validation errors for empty required fields", async () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const submitButton = screen.getByRole("button", { name: /create task/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument()
      expect(screen.getByText("Description is required")).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test("submits form with valid data", async () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: "Test Task" },
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    })

    const submitButton = screen.getByRole("button", { name: /create task/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Test Task",
        description: "Test Description",
        priority: "medium",
        status: "to-do",
      })
    })
  })

  test("calls onCancel when cancel button is clicked", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const cancelButton = screen.getByRole("button", { name: /cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalled()
  })

  test("populates form with initial data when editing", () => {
    const initialData = {
      id: "1",
      title: "Edit Task",
      description: "Edit Description",
      priority: "high" as const,
      status: "in-progress" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} initialData={initialData} isEditing={true} />)

    expect(screen.getByDisplayValue("Edit Task")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Edit Description")).toBeInTheDocument()
  })
})
