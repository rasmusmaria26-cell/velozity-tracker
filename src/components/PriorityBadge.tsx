import { PRIORITY_BADGE_CLASSES } from '@/utils/priorityUtils'
import type { Priority } from '@/types'

export default function PriorityBadge({ priority }: { priority: Priority }) {
    return (
        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded ${PRIORITY_BADGE_CLASSES[priority]}`}>
            {priority}
        </span>
    )
}
