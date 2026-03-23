import { create } from 'zustand'
import type { CollabUser } from '@/types'
import { COLLAB_USERS } from '@/data/mockUsers'

interface CollabStore {
    collabUsers: CollabUser[]
    moveUser: (userId: string, taskId: string | null) => void
}

export const useCollabStore = create<CollabStore>((set) => ({
    collabUsers: COLLAB_USERS,

    moveUser: (userId, taskId) =>
        set((s) => ({
            collabUsers: s.collabUsers.map((u) =>
                u.id === userId ? { ...u, currentTaskId: taskId } : u
            ),
        })),
}))
