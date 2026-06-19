import { CheckSquare, Circle } from 'lucide-react'

const todos = [
  { id: 1, text: '完成项目报告', done: true },
  { id: 2, text: '团队周会', done: true },
  { id: 3, text: '代码评审', done: false },
  { id: 4, text: '更新设计文档', done: false },
  { id: 5, text: '发布 v2.0', done: false },
]

export default function TodoWidget() {
  const completed = todos.filter((t) => t.done).length
  const total = todos.length
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
        <CheckSquare size={14} />
        待办事项
      </div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-2xl font-bold">
          {completed}/{total}
        </span>
        <span className="text-xs text-slate-400">{pct}% 完成</span>
      </div>
      <div className="progress-bar mb-4 h-1.5">
        <div className="progress-fill h-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2.5 text-sm">
            <Circle
              size={14}
              className={
                todo.done
                  ? 'fill-mint-400 text-mint-400'
                  : 'text-slate-500'
              }
            />
            <span className={todo.done ? 'text-slate-500 line-through' : 'text-slate-200'}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
