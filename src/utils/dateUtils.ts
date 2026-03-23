import { differenceInDays, isToday, isBefore, startOfDay, format, parseISO } from 'date-fns'

export function formatDueDate(dueDateStr: string): {
    label: string
    variant: 'normal' | 'today' | 'overdue-mild' | 'overdue-severe'
} {
    const dueDate = parseISO(dueDateStr)
    const today = startOfDay(new Date())

    if (isToday(dueDate)) {
        return { label: 'Due Today', variant: 'today' }
    }

    if (isBefore(dueDate, today)) {
        const daysOverdue = differenceInDays(today, dueDate)
        if (daysOverdue > 7) {
            return { label: `${daysOverdue} days overdue`, variant: 'overdue-severe' }
        }
        return { label: format(dueDate, 'MMM d'), variant: 'overdue-mild' }
    }

    return { label: format(dueDate, 'MMM d'), variant: 'normal' }
}
