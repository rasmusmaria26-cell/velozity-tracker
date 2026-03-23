import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFilterStore } from '@/store/filterStore'
import type { Status, Priority } from '@/types'

const STATUS_VALUES: Status[] = ['todo', 'in-progress', 'in-review', 'done']
const PRIORITY_VALUES: Priority[] = ['Critical', 'High', 'Medium', 'Low']

export function useURLFilters() {
    const [searchParams, setSearchParams] = useSearchParams()
    const filters = useFilterStore(s => s.filters)
    const setStatuses = useFilterStore(s => s.setStatuses)
    const setPriorities = useFilterStore(s => s.setPriorities)
    const setAssigneeIds = useFilterStore(s => s.setAssigneeIds)
    const setDueDateFrom = useFilterStore(s => s.setDueDateFrom)
    const setDueDateTo = useFilterStore(s => s.setDueDateTo)

    // Flag: true means URL just changed externally (back/forward)
    // so the write-to-URL effect should skip once
    const isRestoringFromURL = useRef(false)

    // Effect 1: URL → Store (handles back/forward navigation)
    // Runs when searchParams changes
    useEffect(() => {
        isRestoringFromURL.current = true

        const statusParam = searchParams.get('status')
        const priorityParam = searchParams.get('priority')
        const assigneeParam = searchParams.get('assignee')
        const fromParam = searchParams.get('from')
        const toParam = searchParams.get('to')

        setStatuses(
            statusParam
                ? statusParam.split(',').filter((v): v is Status =>
                    STATUS_VALUES.includes(v as Status))
                : []
        )
        setPriorities(
            priorityParam
                ? priorityParam.split(',').filter((v): v is Priority =>
                    PRIORITY_VALUES.includes(v as Priority))
                : []
        )
        setAssigneeIds(assigneeParam ? assigneeParam.split(',') : [])
        setDueDateFrom(fromParam ?? null)
        setDueDateTo(toParam ?? null)
    }, [searchParams])

    // Effect 2: Store → URL (handles user clicking checkboxes)
    // Skips when the change came from URL restoration above
    useEffect(() => {
        if (isRestoringFromURL.current) {
            isRestoringFromURL.current = false
            return
        }

        const params = new URLSearchParams()
        if (filters.statuses.length > 0)
            params.set('status', filters.statuses.join(','))
        if (filters.priorities.length > 0)
            params.set('priority', filters.priorities.join(','))
        if (filters.assigneeIds.length > 0)
            params.set('assignee', filters.assigneeIds.join(','))
        if (filters.dueDateFrom)
            params.set('from', filters.dueDateFrom)
        if (filters.dueDateTo)
            params.set('to', filters.dueDateTo)

        setSearchParams(params)
    }, [filters])
}
