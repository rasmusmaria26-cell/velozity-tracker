import { useMemo } from 'react'
import {
    startOfMonth, endOfMonth, eachDayOfInterval,
    differenceInDays, format, isToday, getDaysInMonth, parseISO
} from 'date-fns'
import { useTaskStore } from '@/store/taskStore'
import { useFilterStore } from '@/store/filterStore'
import PriorityBadge from '@/components/PriorityBadge'
import { PRIORITY_BAR_COLORS } from '@/utils/priorityUtils'

const DAY_WIDTH = 36      // px per day
const ROW_HEIGHT = 48     // px per task row

const TimelineView = () => {
    const tasks = useTaskStore((s) => s.tasks)
    const filters = useFilterStore((s) => s.filters)
    const applyFilters = useFilterStore((s) => s.applyFilters)

    const filteredTasks = useMemo(
        () => applyFilters(tasks),
        [tasks, filters, applyFilters]
    )

    const today = new Date()
    const monthStart = startOfMonth(today)
    const monthEnd = endOfMonth(today)
    const days = useMemo(() => eachDayOfInterval({ start: monthStart, end: monthEnd }), [monthStart, monthEnd])

    const totalDays = getDaysInMonth(today)
    const totalWidth = totalDays * DAY_WIDTH

    const todayLeft = differenceInDays(today, monthStart) * DAY_WIDTH + (DAY_WIDTH / 2)

    return (
        <div className="flex-1 overflow-auto flex flex-col bg-slate-50 relative">
            {/* Header: task name column + day columns */}
            <div className="flex sticky top-0 bg-white border-b border-slate-200 z-30 w-full md:w-max shadow-sm">
                <div className="w-48 sticky left-0 z-40 bg-white shrink-0 px-4 py-2 text-[11px] uppercase tracking-wider font-bold text-slate-500 border-r border-slate-200 flex items-center">
                    Task
                </div>
                <div className="flex bg-white" style={{ width: totalWidth }}>
                    {days.map((day) => (
                        <div key={day.toISOString()}
                            style={{ width: DAY_WIDTH, minWidth: DAY_WIDTH }}
                            className={`flex items-center justify-center text-xs py-2 border-r border-slate-100 shrink-0 
                   ${isToday(day) ? 'bg-blue-50 font-bold text-blue-600' : 'text-slate-500 font-medium'}`}>
                            {format(day, 'd')}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollable body */}
            <div className="relative w-fit" style={{ width: 192 + totalWidth, minHeight: '100%' }}>

                {/* Today vertical line */}
                <div className="absolute top-0 bottom-0 w-px bg-blue-500/50 z-10 pointer-events-none"
                    style={{ left: 192 + todayLeft }} />

                {/* Task rows */}
                <div className="flex flex-col w-full pb-8">
                    {filteredTasks.map((task) => {
                        let barLeft = 0
                        let barWidth = 0

                        if (task.startDate) {
                            barLeft = Math.max(0, differenceInDays(parseISO(task.startDate), monthStart)) * DAY_WIDTH
                            const barRight = Math.min(totalDays, differenceInDays(parseISO(task.dueDate), monthStart) + 1) * DAY_WIDTH
                            barWidth = Math.max(DAY_WIDTH, barRight - barLeft)
                        } else {
                            barLeft = Math.max(0, differenceInDays(parseISO(task.dueDate), monthStart)) * DAY_WIDTH
                            barWidth = DAY_WIDTH
                        }

                        const priorityColor = PRIORITY_BAR_COLORS[task.priority]

                        return (
                            <div key={task.id}
                                style={{ height: ROW_HEIGHT }}
                                className="flex items-center border-b border-slate-200/60 hover:bg-slate-100/50 bg-white transition-colors w-full group">

                                {/* Task name column - fixed width */}
                                <div className="w-48 sticky left-0 z-20 bg-white group-hover:bg-slate-100/80 shrink-0 px-3 flex items-center gap-2 border-r border-slate-200 overflow-hidden h-full transition-colors">
                                    <PriorityBadge priority={task.priority} compact />
                                    <span className="text-sm font-medium text-slate-700 truncate">{task.title}</span>
                                </div>

                                {/* Bar area */}
                                <div className="relative flex-1 h-full pointer-events-none">
                                    <div
                                        className="absolute shadow-sm transition-opacity"
                                        style={{
                                            left: barLeft,
                                            width: barWidth,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            height: 20,
                                            borderRadius: 4,
                                            backgroundColor: priorityColor,
                                            opacity: task.startDate ? 1 : 0.4,
                                        }}
                                        title={`${task.title} — ${task.startDate ?? 'no start'} → ${task.dueDate}`}
                                    />
                                </div>
                            </div>
                        )
                    })}

                    {/* Empty state */}
                    {filteredTasks.length === 0 && (
                        <div className="sticky left-0 w-full p-12 text-center text-slate-400 font-medium">
                            No tasks match the current filters
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TimelineView
