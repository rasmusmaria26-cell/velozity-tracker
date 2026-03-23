import FilterBar from '@/components/FilterBar'
import KanbanView from '@/views/KanbanView'
import { useURLFilters } from '@/hooks/useURLFilters'
import { useUIStore } from '@/store/uiStore'

function App() {
  useURLFilters() // Initialize URL sync
  const currentView = useUIStore((s) => s.currentView)

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <FilterBar />
      <div className="flex-1 overflow-hidden relative">
        {currentView === 'kanban' && <KanbanView />}
      </div>
    </div>
  )
}

export default App
