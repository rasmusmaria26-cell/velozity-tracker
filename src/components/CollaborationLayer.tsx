import { useEffect } from 'react'
import { useCollabStore } from '@/store/collaborationStore'
import { useUIStore } from '@/store/uiStore'

export default function CollaborationLayer() {
    const collabUsers = useCollabStore((s) => s.collabUsers)
    const moveUserCursor = useCollabStore((s) => s.moveUserCursor)
    const currentView = useUIStore((s) => s.currentView)

    useEffect(() => {
        // Only simulate visually in the Kanban specific scope as denoted by the specification.
        if (currentView !== 'kanban') return

        const interval = setInterval(() => {
            // Rotate active participation via random subset selection bounds
            const randomUser = collabUsers[Math.floor(Math.random() * collabUsers.length)]

            const cardNodes = document.querySelectorAll('[data-task-id]')
            if (cardNodes.length === 0) return

            // Determine wandering probability or precision card targeting
            const isWandering = Math.random() > 0.75

            if (isWandering) {
                const x = window.innerWidth / 2 + (Math.random() * 500 - 250)
                const y = window.innerHeight / 2 + (Math.random() * 400 - 200)
                moveUserCursor(randomUser.id, null, { x, y })
            } else {
                // Select random active node currently represented within the live DOM flow
                const randomCard = cardNodes[Math.floor(Math.random() * cardNodes.length)] as HTMLElement
                const taskId = randomCard.getAttribute('data-task-id')
                const rect = randomCard.getBoundingClientRect()

                const x = rect.left + Math.random() * rect.width
                const y = rect.top + Math.random() * rect.height

                moveUserCursor(randomUser.id, taskId, { x, y })
            }
        }, 1800)

        return () => clearInterval(interval)
    }, [collabUsers, moveUserCursor, currentView])

    if (currentView !== 'kanban') return null

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {collabUsers.map((user) => {
                if (!user.cursorPos) return null

                return (
                    <div
                        key={user.id}
                        className="absolute flex flex-col items-center gap-1 transition-all duration-[1200ms] ease-out drop-shadow-md"
                        style={{
                            left: user.cursorPos.x,
                            top: user.cursorPos.y,
                        }}
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ transform: 'translate(-4px, -4px)' }}
                        >
                            <path
                                d="M5.5 3.5L18.5 10L11.5 12L8.5 19L5.5 3.5Z"
                                fill={user.color}
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <div
                            className="px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-white whitespace-nowrap"
                            style={{ backgroundColor: user.color }}
                        >
                            {user.name.split(' ')[0]}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
