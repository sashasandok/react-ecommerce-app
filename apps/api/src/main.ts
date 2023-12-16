import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import express from 'express'

async function bootstrap() {
  const PORT = 3001
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  if (process.env.NODE_ENV !== 'development') {
    // serve static assets from the client/dist folder, change this to the correct path for your project
    app.use(express.static(join(__dirname, '../../', 'client', 'dist')))
  }

  await app.listen(PORT)
  console.log(`Server app is running on port: ${PORT}`)
}
bootstrap()
