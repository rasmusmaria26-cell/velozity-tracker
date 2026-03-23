import type { User, CollabUser } from '@/types'

export const USERS: User[] = [
    { id: 'u1', name: 'Arjun Sharma', initials: 'AS', color: 'bg-violet-500' },
    { id: 'u2', name: 'Priya Nair', initials: 'PN', color: 'bg-pink-500' },
    { id: 'u3', name: 'Karan Mehta', initials: 'KM', color: 'bg-sky-500' },
    { id: 'u4', name: 'Sneha Iyer', initials: 'SI', color: 'bg-emerald-500' },
    { id: 'u5', name: 'Rahul Desai', initials: 'RD', color: 'bg-amber-500' },
    { id: 'u6', name: 'Meera Pillai', initials: 'MP', color: 'bg-rose-500' },
]

export const COLLAB_USERS: CollabUser[] = [
    { id: 'c1', name: 'Dev Singh', initials: 'DS', color: '#7c3aed', currentTaskId: null },
    { id: 'c2', name: 'Anita Roy', initials: 'AR', color: '#db2777', currentTaskId: null },
    { id: 'c3', name: 'Tom Nguyen', initials: 'TN', color: '#0284c7', currentTaskId: null },
]
