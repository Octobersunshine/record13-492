import { Router, type Request, type Response } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataPath = path.resolve(__dirname, '../data/layout.json')

interface LayoutItem {
  id: string
  type: 'weather' | 'todo' | 'stats' | 'shortcuts' | 'calendar' | 'notifications'
  order: number
}

interface LayoutData {
  layout: LayoutItem[]
}

interface LayoutTemplate {
  id: string
  name: string
  description: string
  layout: LayoutItem[]
}

const defaultLayout: LayoutData = {
  layout: [
    { id: 'w1_weather', type: 'weather', order: 0 },
    { id: 'w2_todo', type: 'todo', order: 1 },
    { id: 'w3_stats', type: 'stats', order: 2 },
    { id: 'w4_shortcuts', type: 'shortcuts', order: 3 },
    { id: 'w5_calendar', type: 'calendar', order: 4 },
    { id: 'w6_notifications', type: 'notifications', order: 5 },
  ],
}

const templates: LayoutTemplate[] = [
  {
    id: 'default',
    name: '默认标准',
    description: '6 个基础组件各一个',
    layout: [
      { id: 'default_weather_0', type: 'weather', order: 0 },
      { id: 'default_todo_1', type: 'todo', order: 1 },
      { id: 'default_stats_2', type: 'stats', order: 2 },
      { id: 'default_shortcuts_3', type: 'shortcuts', order: 3 },
      { id: 'default_calendar_4', type: 'calendar', order: 4 },
      { id: 'default_notifications_5', type: 'notifications', order: 5 },
    ],
  },
  {
    id: 'productivity',
    name: '高效办公',
    description: 'todo x2, calendar x2, shortcuts, notifications',
    layout: [
      { id: 'productivity_todo_0', type: 'todo', order: 0 },
      { id: 'productivity_todo_1', type: 'todo', order: 1 },
      { id: 'productivity_calendar_2', type: 'calendar', order: 2 },
      { id: 'productivity_calendar_3', type: 'calendar', order: 3 },
      { id: 'productivity_shortcuts_4', type: 'shortcuts', order: 4 },
      { id: 'productivity_notifications_5', type: 'notifications', order: 5 },
    ],
  },
  {
    id: 'analytics',
    name: '数据分析',
    description: 'stats x3, weather, calendar',
    layout: [
      { id: 'analytics_stats_0', type: 'stats', order: 0 },
      { id: 'analytics_stats_1', type: 'stats', order: 1 },
      { id: 'analytics_stats_2', type: 'stats', order: 2 },
      { id: 'analytics_weather_3', type: 'weather', order: 3 },
      { id: 'analytics_calendar_4', type: 'calendar', order: 4 },
    ],
  },
  {
    id: 'lifestyle',
    name: '生活助手',
    description: 'weather x2, calendar, notifications x2, shortcuts',
    layout: [
      { id: 'lifestyle_weather_0', type: 'weather', order: 0 },
      { id: 'lifestyle_weather_1', type: 'weather', order: 1 },
      { id: 'lifestyle_calendar_2', type: 'calendar', order: 2 },
      { id: 'lifestyle_notifications_3', type: 'notifications', order: 3 },
      { id: 'lifestyle_notifications_4', type: 'notifications', order: 4 },
      { id: 'lifestyle_shortcuts_5', type: 'shortcuts', order: 5 },
    ],
  },
]

const readLayout = (): LayoutData => {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw)
}

const writeLayout = (data: LayoutData): void => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

const router = Router()

router.get('/', (req: Request, res: Response): void => {
  const data = readLayout()
  res.json(data)
})

router.put('/', (req: Request, res: Response): void => {
  const { layout } = req.body as { layout: LayoutItem[] }
  if (!Array.isArray(layout)) {
    res.status(400).json({ error: 'layout must be an array' })
    return
  }
  const data: LayoutData = { layout }
  writeLayout(data)
  res.json(data)
})

router.delete('/', (req: Request, res: Response): void => {
  writeLayout(defaultLayout)
  res.json(defaultLayout)
})

router.get('/templates', (req: Request, res: Response): void => {
  res.json({ templates })
})

export default router
