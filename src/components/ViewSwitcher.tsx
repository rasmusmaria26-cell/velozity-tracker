import { useUIStore } from '@/store/uiStore'

export default function ViewSwitcher() {
    const currentView = useUIStore((s) => s.currentView)
    const setView = useUIStore((s) => s.setView)

    return (
        <div className="flex gap-1 bg-slate-200 p-1 rounded-lg">
            {(['kanban', 'list', 'timeline'] as const).map((view) => (
                <button
                    key={view}
                    onClick={() => setView(view)}
                    className={currentView === view
                        ? 'px-4 py-1.5 rounded-md bg-white text-slate-800 font-medium shadow-sm text-sm transition-all'
                        : 'px-4 py-1.5 rounded-md text-slate-600 text-sm hover:text-slate-800 transition-colors'
                    }
                >
                    {view === 'kanban' ? 'Kanban' : view === 'list' ? 'List' : 'Timeline'}
                </button>
            ))}
        </div>
    )
}
