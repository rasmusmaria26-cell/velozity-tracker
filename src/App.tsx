import FilterBar from '@/components/FilterBar'
import { useURLFilters } from '@/hooks/useURLFilters'

function App() {
  useURLFilters() // Initialize URL sync

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <FilterBar />
      <div className="flex-1 p-4 text-slate-500">
        Velozity Tracker — building...
      </div>
    </div>
  )
}

export default App
