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

export default router
