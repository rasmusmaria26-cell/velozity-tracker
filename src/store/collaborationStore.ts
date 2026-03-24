import { create } from 'zustand'
import { COLLAB_USERS } from '@/data/mockUsers'
import type { CollabUser } from '@/types'

interface CollabState {
    collabUsers: CollabUser[]
    updateUserLocation: (userId: string, taskId: string | null) => void
    moveUserCursor: (userId: string, taskId: string | null, pos?: { x: number, y: number }) => void
}

export const useCollabStore = create<CollabState>((set) => ({
    collabUsers: COLLAB_USERS,

    updateUserLocation: (userId, taskId) =>
        set((state) => ({
            collabUsers: state.collabUsers.map((u) =>
                u.id === userId ? { ...u, currentTaskId: taskId } : u
            ),
        })),

    moveUserCursor: (userId, taskId, pos) =>
        set((state) => ({
            collabUsers: state.collabUsers.map((u) =>
                u.id === userId ? { ...u, currentTaskId: taskId, cursorPos: pos } : u
            ),
        })),
}))
