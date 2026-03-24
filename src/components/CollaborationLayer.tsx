import { useEffect } from 'react'
import { useCollabStore } from '@/store/collaborationStore'
import { useTaskStore } from '@/store/taskStore'

export default function CollaborationLayer() {
    const collabUsers = useCollabStore(s => s.collabUsers)
    const updateUserLocation = useCollabStore(s => s.updateUserLocation)
    const tasks = useTaskStore(s => s.tasks)

    useEffect(() => {
        // assign starting tasks on mount
        collabUsers.forEach(user => {
            const t = tasks[Math.floor(Math.random() * tasks.length)]
            updateUserLocation(user.id, t.id)
        })

        const interval = setInterval(() => {
            collabUsers.forEach(user => {
                if (Math.random() < 0.4) {
                    const t = tasks[Math.floor(Math.random() * tasks.length)]
                    updateUserLocation(user.id, t.id)
                }
            })
        }, 4000)

        return () => clearInterval(interval)
    }, []) // intentionally empty — run once on mount

    return null
}
