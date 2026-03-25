import React, { memo } from 'react'
import { formatDueDate } from '@/utils/dateUtils'

const VARIANT_CLASSES = {
    normal: 'text-slate-500',
    today: 'text-amber-600 font-medium',
    'overdue-mild': 'text-red-500',
    'overdue-severe': 'text-red-600 font-semibold',
}

function DueDateLabel({ dueDate }: { dueDate: string }) {
    const { label, variant } = formatDueDate(dueDate)
    return (
        <span className={`text-xs ${VARIANT_CLASSES[variant]}`}>
            {label}
        </span>
    )
}

export default memo(DueDateLabel)
