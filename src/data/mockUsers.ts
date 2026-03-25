import type { User, CollabUser } from '@/types'

export const USERS: User[] = [
    { id: 'u1', name: 'Arjun Sharma', initials: 'AS', color: '#7c3aed' },
    { id: 'u2', name: 'Priya Nair', initials: 'PN', color: '#db2777' },
    { id: 'u3', name: 'Karan Mehta', initials: 'KM', color: '#0284c7' },
    { id: 'u4', name: 'Sneha Iyer', initials: 'SI', color: '#059669' },
    { id: 'u5', name: 'Rahul Desai', initials: 'RD', color: '#d97706' },
    { id: 'u6', name: 'Meera Pillai', initials: 'MP', color: '#e11d48' },
]

export const COLLAB_USERS: CollabUser[] = [
    { id: 'c1', name: 'Dev Singh', initials: 'DS', color: '#7c3aed', currentTaskId: null },
    { id: 'c2', name: 'Anita Roy', initials: 'AR', color: '#db2777', currentTaskId: null },
    { id: 'c3', name: 'Tom Nguyen', initials: 'TN', color: '#0284c7', currentTaskId: null },
]
