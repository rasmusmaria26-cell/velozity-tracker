import { subDays, addDays, format } from 'date-fns'
import type { Task, Priority, Status } from '@/types'
import { USERS } from './mockUsers'

// Deterministic seed so tests are reproducible
// Change SEED value to get a different dataset
const SEED = 42

function seededRandom(seed: number) {
    let s = seed
    return function () {
        s = (s * 16807 + 0) % 2147483647
        return (s - 1) / 2147483646
    }
}

const ADJECTIVES = [
    'Refactor', 'Implement', 'Fix', 'Design', 'Review', 'Update',
    'Migrate', 'Optimize', 'Document', 'Test', 'Deploy', 'Audit',
    'Build', 'Integrate', 'Configure', 'Remove', 'Add', 'Rewrite',
]

const NOUNS = [
    'authentication', 'payment gateway', 'dashboard UI', 'API endpoint',
    'database schema', 'user profile', 'notification system', 'search feature',
    'onboarding flow', 'analytics module', 'email templates', 'CI/CD pipeline',
    'error handling', 'caching layer', 'file upload', 'export functionality',
    'admin panel', 'mobile layout', 'dark mode', 'performance metrics',
]

const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low']
const STATUSES: Status[] = ['todo', 'in-progress', 'in-review', 'done']

// Distribution weights
const STATUS_WEIGHTS = [0.30, 0.30, 0.20, 0.20]  // todo, in-progress, in-review, done
const PRIORITY_WEIGHTS = [0.15, 0.25, 0.35, 0.25] // Critical, High, Medium, Low

function weightedPick<T>(items: T[], weights: number[], rand: number): T {
    let cumulative = 0
    for (let i = 0; i < items.length; i++) {
        cumulative += weights[i]
        if (rand < cumulative) return items[i]
    }
    return items[items.length - 1]
}

export function generateTasks(count = 500): Task[] {
    const rand = seededRandom(SEED)
    const today = new Date()
    const tasks: Task[] = []

    for (let i = 0; i < count; i++) {
        const priority = weightedPick(PRIORITIES, PRIORITY_WEIGHTS, rand())
        const status = weightedPick(STATUSES, STATUS_WEIGHTS, rand())
        const assignee = USERS[Math.floor(rand() * USERS.length)]

        const adjective = ADJECTIVES[Math.floor(rand() * ADJECTIVES.length)]
        const noun = NOUNS[Math.floor(rand() * NOUNS.length)]
        const title = `${adjective} ${noun}`

        // Due date distribution:
        // 20% overdue (1–30 days ago)
        // 10% due today
        // 70% future (1–60 days ahead)
        const dueDateRoll = rand()
        let dueDate: Date
        if (dueDateRoll < 0.20) {
            dueDate = subDays(today, Math.ceil(rand() * 30))
        } else if (dueDateRoll < 0.30) {
            dueDate = today
        } else {
            dueDate = addDays(today, Math.ceil(rand() * 60))
        }

        // Start date: 70% have one, 30% don't
        let startDate: string | null = null
        if (rand() < 0.70) {
            const daysBeforeDue = Math.ceil(rand() * 14) + 1
            startDate = format(subDays(dueDate, daysBeforeDue), 'yyyy-MM-dd')
        }

        tasks.push({
            id: `task-${i + 1}`,
            title,
            assigneeId: assignee.id,
            priority,
            status,
            startDate,
            dueDate: format(dueDate, 'yyyy-MM-dd'),
            createdAt: format(subDays(today, Math.ceil(rand() * 90)), 'yyyy-MM-dd'),
        })
    }

    return tasks
}

export const SEED_TASKS = generateTasks(500)
