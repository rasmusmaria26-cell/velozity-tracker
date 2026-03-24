import { useCollabStore } from '@/store/collaborationStore'

export default function CollaborationBar() {
    const collabUsers = useCollabStore((s) => s.collabUsers)

    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-b border-slate-200">
            <div className="flex items-center gap-1">
                {collabUsers.map(user => (
                    <div key={user.id}
                        title={user.name}
                        style={{ backgroundColor: user.color }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm border border-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                ))}
            </div>
            <span className="text-sm font-medium text-slate-500">
                {collabUsers.length} people are viewing this board
            </span>
        </div>
    )
}
