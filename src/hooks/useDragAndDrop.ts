import { useEffect, useRef, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import type { DragState, Status, Task } from '@/types'

export function useDragAndDrop() {
    const updateTaskStatus = useTaskStore((s) => s.updateTaskStatus)
    const [isDragging, setIsDragging] = useState(false)

    const dragStateRef = useRef<DragState>({
        isDragging: false,
        draggedTaskId: null,
        sourceColumnStatus: null,
        ghostElement: null,
        placeholderElement: null,
        originRect: null,
        offsetX: 0,
        offsetY: 0,
        currentDropTarget: null,
    })

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            const dragState = dragStateRef.current
            if (!dragState.isDragging || !dragState.ghostElement) return

            const x = e.clientX - dragState.offsetX
            const y = e.clientY - dragState.offsetY
            dragState.ghostElement.style.left = `${x}px`
            dragState.ghostElement.style.top = `${y}px`

            // hide ghost to get element below it
            dragState.ghostElement.style.display = 'none'
            const elementUnder = document.elementFromPoint(e.clientX, e.clientY)
            dragState.ghostElement.style.display = ''

            const columnEl = elementUnder?.closest('[data-column-status]')
            const newTarget = columnEl?.getAttribute('data-column-status') as Status | null

            if (newTarget !== dragState.currentDropTarget) {
                if (dragState.currentDropTarget) {
                    document
                        .querySelector(`[data-column-status="${dragState.currentDropTarget}"]`)
                        ?.classList.remove('bg-blue-50', 'ring-2', 'ring-blue-300')
                }
                if (newTarget) {
                    columnEl?.classList.add('bg-blue-50', 'ring-2', 'ring-blue-300')
                }
                dragState.currentDropTarget = newTarget
            }
        }

        const cleanup = () => {
            const dragState = dragStateRef.current
            dragState.ghostElement?.remove()
            dragState.placeholderElement?.remove()

            if (dragState.draggedTaskId) {
                const cardEl = document.querySelector(
                    `[data-task-id="${dragState.draggedTaskId}"]`
                ) as HTMLElement | null

                if (cardEl) {
                    cardEl.style.opacity = ''
                    cardEl.style.pointerEvents = ''
                }
            }

            document.querySelectorAll('[data-column-status]').forEach((el) => {
                el.classList.remove('bg-blue-50', 'ring-2', 'ring-blue-300')
            })

            dragState.isDragging = false
            dragState.draggedTaskId = null
            dragState.ghostElement = null
            dragState.placeholderElement = null
            dragState.currentDropTarget = null
            dragState.originRect = null
            setIsDragging(false)
        }

        const handlePointerUp = (e: PointerEvent) => {
            const dragState = dragStateRef.current
            if (!dragState.isDragging) return

            const {
                ghostElement,
                draggedTaskId,
                currentDropTarget,
                sourceColumnStatus,
                originRect,
            } = dragState

            if (currentDropTarget && draggedTaskId) {
                if (currentDropTarget !== sourceColumnStatus) {
                    updateTaskStatus(draggedTaskId, currentDropTarget)
                }
                cleanup()
            } else {
                // snap back
                if (ghostElement && originRect) {
                    ghostElement.style.transition =
                        'left 0.3s ease, top 0.3s ease, opacity 0.3s ease'
                    ghostElement.style.left = `${originRect.left}px`
                    ghostElement.style.top = `${originRect.top}px`
                    ghostElement.style.opacity = '0'

                    ghostElement.addEventListener(
                        'transitionend',
                        () => cleanup(),
                        { once: true }
                    )
                } else {
                    cleanup()
                }
            }
        }

        document.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('pointerup', handlePointerUp)
        return () => {
            document.removeEventListener('pointermove', handlePointerMove)
            document.removeEventListener('pointerup', handlePointerUp)
        }
    }, [updateTaskStatus])

    const getCardProps = (task: Task) => {
        return {
            onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
                // ignore right-click and middle-click
                if (e.button !== 0 && e.pointerType === 'mouse') return

                e.preventDefault()

                const cardEl = e.currentTarget as HTMLElement
                const rect = cardEl.getBoundingClientRect()
                const dragState = dragStateRef.current

                dragState.originRect = rect
                dragState.offsetX = e.clientX - rect.left
                dragState.offsetY = e.clientY - rect.top
                dragState.draggedTaskId = task.id
                dragState.sourceColumnStatus = task.status

                const placeholder = document.createElement('div')
                placeholder.style.height = `${rect.height}px`
                placeholder.style.border = '2px dashed #94a3b8'
                placeholder.style.borderRadius = '8px'
                placeholder.style.margin = '0 0 8px 0'
                placeholder.style.backgroundColor = '#f8fafc'
                cardEl.parentElement?.insertBefore(placeholder, cardEl)
                dragState.placeholderElement = placeholder

                cardEl.style.opacity = '0'
                cardEl.style.pointerEvents = 'none'

                // clone appended to body so it escapes column overflow:hidden
                const ghost = cardEl.cloneNode(true) as HTMLElement
                ghost.style.cssText = `
          position: fixed;
          width: ${rect.width}px;
          height: ${rect.height}px;
          left: ${rect.left}px;
          top: ${rect.top}px;
          opacity: 0.85;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 9999;
          cursor: grabbing;
          transform: rotate(1.5deg);
          transition: transform 0.1s ease;
          margin: 0;
        `
                document.body.appendChild(ghost)
                dragState.ghostElement = ghost

                // keep dragging even if pointer leaves window
                cardEl.setPointerCapture(e.pointerId)

                dragState.isDragging = true
                setIsDragging(true)
            },
        }
    }

    return { getCardProps, isDragging }
}
