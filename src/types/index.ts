export type Priority = 'Critical' | 'High' | 'Medium' | 'Low'
export type Status = 'todo' | 'in-progress' | 'in-review' | 'done'
export type ViewMode = 'kanban' | 'list' | 'timeline'
export type SortKey = 'title' | 'priority' | 'dueDate' | null
export type SortDirection = 'asc' | 'desc'

export interface User {
    id: string
    name: string
    initials: string
    color: string        // tailwind bg class e.g. 'bg-violet-500'
}

export interface Task {
    id: string
    title: string
    assigneeId: string
    priority: Priority
    status: Status
    startDate: string | null   // ISO date string, nullable
    dueDate: string            // ISO date string, always present
    createdAt: string
}

export interface FilterState {
    statuses: Status[]
    priorities: Priority[]
    assigneeIds: string[]
    dueDateFrom: string | null
    dueDateTo: string | null
}

export interface CollabUser {
    id: string
    name: string
    initials: string
    color: string              // hex color for inline style
    currentTaskId: string | null
}

export interface DragState {
    isDragging: boolean
    draggedTaskId: string | null
    sourceColumnStatus: Status | null
    ghostElement: HTMLElement | null
    placeholderElement: HTMLElement | null
    originRect: DOMRect | null
    offsetX: number
    offsetY: number
    currentDropTarget: Status | null
}
