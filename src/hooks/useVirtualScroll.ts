import { useState, useRef } from 'react'

interface VirtualScrollConfig {
    totalCount: number
    rowHeight: number
    containerHeight: number
    buffer: number
}

export function useVirtualScroll({ totalCount, rowHeight, containerHeight, buffer }: VirtualScrollConfig) {
    const [scrollTop, setScrollTop] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const firstIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer)
    const lastIndex = Math.min(totalCount - 1, Math.ceil((scrollTop + containerHeight) / rowHeight) + buffer)

    const visibleItems = []
    for (let i = firstIndex; i <= lastIndex; i++) {
        visibleItems.push({ index: i, offsetTop: i * rowHeight })
    }

    const totalHeight = totalCount * rowHeight

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop)
    }

    return { visibleItems, totalHeight, onScroll, scrollContainerRef }
}
