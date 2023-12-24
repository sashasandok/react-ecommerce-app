import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import express from 'express'
import * as session from 'express-session'
import * as passport from 'passport'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoDBStore = require('connect-mongodb-session')(session)

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  const whitelist = process.env.WHITELIST_ADDRESSES.split(', ')

  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        console.log('allowed cors for:', origin)
        callback(null, true)
      } else {
        console.log('blocked cors for:', origin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  })
  app.setGlobalPrefix('api')

  const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.rbangce.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    collection: 'mySessions',
  })

  app.use(
    session({
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: +process.env.SESSION_MAX_AGE,
      },
      store,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  if (process.env.NODE_ENV !== 'development') {
    // serve static assets from the client/dist folder, change this to the correct path for your project
    app.use(express.static(join(__dirname, '../../', 'client', 'dist')))
  }

  await app.listen(PORT)
  console.log(`Server app is running on port: ${PORT}`)
}
bootstrap()
