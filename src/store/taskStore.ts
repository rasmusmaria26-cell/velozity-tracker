import { create } from 'zustand'
import type { Task, Status } from '@/types'
import { SEED_TASKS } from '@/data/seedGenerator'

interface TaskStore {
    tasks: Task[]
    updateTaskStatus: (taskId: string, newStatus: Status) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: SEED_TASKS,

    updateTaskStatus: (taskId, newStatus) =>
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
            ),
        })),
}))
