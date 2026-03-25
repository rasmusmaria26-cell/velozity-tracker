import React, { memo } from 'react'
import { PRIORITY_BADGE_CLASSES, PRIORITY_BAR_COLORS } from '@/utils/priorityUtils'
import type { Priority } from '@/types'

function PriorityBadge({ priority, compact }: { priority: Priority, compact?: boolean }) {
    if (compact) {
        return (
            <div
                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: PRIORITY_BAR_COLORS[priority] }}
                title={priority}
            />
        )
    }

    return (
        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded shadow-sm ${PRIORITY_BADGE_CLASSES[priority]}`}>
            {priority}
        </span>
    )
}

export default memo(PriorityBadge)
