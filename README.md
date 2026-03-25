# Velozity Project Tracker

A high-performance, real-time-simulated task management application built with **React, TypeScript, and Tailwind CSS**. Velozity is designed for scale, featuring zero-dependency drag-and-drop mechanics and virtualized list rendering.

## 🚀 Key Features

- **Kanban Board**: Drag-and-drop tasks across statuses with high-frequency pointer tracking.
- **Virtualized List View**: Smooth performance for 500+ tasks using custom row-offset logic.
- **Timeline (Gantt) View**: Data-driven schedule visualization with relative date positioning.
- **Collaboration Simulation**: Simulated multi-user presence with active task indicators.
- **Advanced Filtering**: Real-time multi-criteria filtering across all project views.
- **Responsive Design**: Tablet-optimized layout (768px) with toggleable UI elements.

## 🛠️ Technical Stack

- **Framework**: Vite + React 18+ (TS)
- **State Management**: Zustand (Atomic updates for sub-millisecond responsiveness)
- **Styling**: Tailwind CSS (Zero runtime CSS overhead)
- **Date Utilities**: date-fns
- **Icons/Avatars**: Custom Initials-based generation

## 🧠 Explanation Field: Architectural Decisions

### 1. Unified State with Zustand
We opted for **Zustand** over Redux or Context API to handle high-frequency updates (e.g., cursor movements and drag offsets). Its atomic selector pattern ensures that dragging a task card in the Kanban view doesn't trigger unnecessary re-renders in the sidebar or collaboration bars unless explicitly required.

### 2. Zero-Dependency Drag & Drop
To maintain a small bundle size and eliminate "library lag," we built a custom DnD engine using **Native Pointer Events**.
- **Mechanics**: On `pointerdown`, we clone the target element into a "ghost" container, calculate the viewport offset, and track movement on `document`.
- **Performance**: We use `translate3d` for hardware acceleration and `memo` on task cards to ensure 60fps movement even on lower-end devices.

### 3. High-Efficiency virtualization
The List View utilizes a custom **`useVirtualScroll`** hook. Instead of rendering 500+ DOM nodes, we only render the tasks currently visible in the viewport plus a small buffer. This keeps the DOM tree shallow, significantly improving memory usage and scroll responsiveness.

### 4. Responsive Resilience
The app utilizes a "mobile-at-heart, desktop-by-design" approach. Using Tailwind's breakpoint system, we hide complex filter panels behind a toggle on tablet/mobile viewports (`md` breakpoint), ensuring the primary productivity tools (cards and lists) have maximum screen real estate.

## 📦 Getting Started

1. **Install Dependencies**: `npm install`
2. **Development**: `npm run dev`
3. **Build**: `npm run build`
4. **Lint**: `npm run lint`

## 📁 Project Structure

- `src/store`: Zustand store definitions.
- `src/components`: Reusable UI components.
- `src/views`: Primary application layouts (Kanban, List, Timeline).
- `src/hooks`: Custom performance logic (DnD, Virtualization).
- `src/utils`: Date processing and priority mapping.

