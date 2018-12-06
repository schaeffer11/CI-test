import { Router } from 'express'
import isProduction from '../index';

const router = Router()

console.log('router api')

router.get('/ping', (req, res) => {
  console.log('i got here', isProduction)
  res.json({ res: 'pong' })
})

router.get('/test', (req, res) => {
  console.log('i got here', isProduction)
  res.json({ testing: true })
})

router.get('*', (req, res) => {
  res.status(404).send(`No API endpoint found for "${req.url}"`)
})

export default router
