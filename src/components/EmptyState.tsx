interface EmptyStateProps {
    type: 'kanban-column' | 'no-results'
    columnLabel?: string
    onClearFilters?: () => void
}

const EmptyState = ({ type, columnLabel, onClearFilters }: EmptyStateProps) => {
    if (type === 'kanban-column') {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <div className="text-3xl mb-2">📭</div>
                <p className="text-sm">No tasks in {columnLabel}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-base font-medium text-slate-600">No tasks match your filters</p>
            <p className="text-sm mb-4">Try adjusting or clearing your filters</p>
            <button
                onClick={onClearFilters}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
            >
                Clear All Filters
            </button>
        </div>
    )
}

export default EmptyState // verified
