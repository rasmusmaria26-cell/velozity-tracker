import FilterBar from '@/components/FilterBar'
import KanbanView from '@/views/KanbanView'
import { lazy, Suspense } from 'react'
import { useURLFilters } from '@/hooks/useURLFilters'
import { useUIStore } from '@/store/uiStore'
import ViewSwitcher from '@/components/ViewSwitcher'
import CollaborationBar from '@/components/CollaborationBar'
import CollaborationLayer from '@/components/CollaborationLayer'

const ListView = lazy(() => import('@/views/ListView'))
const TimelineView = lazy(() => import('@/views/TimelineView'))

function App() {
  useURLFilters()
  const currentView = useUIStore((s) => s.currentView)

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden relative">
      <CollaborationLayer />
      <CollaborationBar />
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-200">
        <h1 className="text-lg font-semibold text-slate-800">Project Tracker</h1>
        <ViewSwitcher />
      </div>
      <FilterBar />
      <div className="flex-1 overflow-hidden relative">
        {currentView === 'kanban' && <KanbanView />}
        <Suspense fallback={<div className="p-8 text-slate-400">Loading...</div>}>
          {currentView === 'list' && <ListView />}
          {currentView === 'timeline' && <TimelineView />}
        </Suspense>
      </div>
    </div>
  )
}

export default App
