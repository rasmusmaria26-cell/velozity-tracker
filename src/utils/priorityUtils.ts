import type { Priority } from '@/types'

export const PRIORITY_BADGE_CLASSES: Record<Priority, string> = {
    Critical: 'bg-red-100 text-red-700 border border-red-200',
    High: 'bg-orange-100 text-orange-700 border border-orange-200',
    Medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    Low: 'bg-green-100 text-green-700 border border-green-200',
}

export const PRIORITY_BAR_COLORS: Record<Priority, string> = {
    Critical: '#ef4444',
    High: '#f97316',
    Medium: '#eab308',
    Low: '#22c55e',
}

// For sorting: lower number = higher priority
export const PRIORITY_ORDER: Record<Priority, number> = {
    Critical: 0,
    High: 1,
    Medium: 2,
    Low: 3,
}
