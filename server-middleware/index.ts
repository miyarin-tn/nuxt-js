/**
 * The nuxt server internal API to set cookie token with httpOnly and secure tag
 * - login
 * - logout
 * - refresh token
 *
 * @baseURL /api
 */
import * as path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import cookieParser from 'cookie-parser'

const rootPath = path.join(__dirname, '../')
const API_BASE_URL = process.env.API_BASE_URL || 'https://localhost:8080'

const {
  setCookiesOfTokens,
  clearCookiesOfTokens
} = require(`${rootPath}/utils/token`)
const { AUTH_REFRESH_TOKEN_KEY } = require(`${rootPath}/constants/configs`)
const { CODE_RAR, MESSAGE_RAR } = require(`${rootPath}/constants/req-and-res`)
const { API_ROUTES } = require(`${rootPath}/constants/api-routes`)

const app = express()

// Add middleware feature
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cookieParser())

/**
 * Login API on nuxt server
 *
 * @remoteMethod /api/login (with `/api` is baseURL)
 */
app.post(
  API_ROUTES.LOCAL_SERVER_LOGIN,
  async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body

    let newCredential
    try {
      newCredential = await axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_LOGIN}`,
        body
      )
      setCookiesOfTokens(res, newCredential.data)
      res.json(newCredential.data)
    } catch (error: any) {
      let responseError = error.response && error.response.data
      if (!responseError) {
        delete error.config
        delete error.stack
        responseError = error
      }
      res.statusCode =
        parseInt(responseError.statusCode || error.response.status) || 400
      res.json(responseError)
    }
  }
)

/**
 * Logout API on nuxt server
 *
 * @remoteMethod /api/logout (with `/api` is baseURL)
 */
app.post(
  API_ROUTES.LOCAL_SERVER_LOGOUT,
  (_req: Request, res: Response, _next: NextFunction) => {
    clearCookiesOfTokens(res)
    res.statusCode = 204
    res.end()
  }
)

/**
 * Refresh token on nuxt server
 *
 * @remoteMethod /api/refresh-token (with `/api` is baseURL)
 */
app.post(
  API_ROUTES.LOCAL_SERVER_REFRESH_TOKEN,
  async (req: Request, res: Response, _next: NextFunction) => {
    const refreshToken = req.cookies && req.cookies[AUTH_REFRESH_TOKEN_KEY]
    const errorExpiredToken = new CustomError(
      CODE_RAR.TOKEN_EXPIRED,
      MESSAGE_RAR.TOKEN_EXPIRED
    )

    if (!refreshToken) {
      // Reset cookie of access & refresh token
      clearCookiesOfTokens(res)
      res.status(401)
      res.json(errorExpiredToken)
      return
    }

    // Request API back-end to refresh token
    let newCredential
    try {
      newCredential = await axios.post(
        `${API_BASE_URL}${API_ROUTES.AUTH_REFRESH}`,
        {
          refresh: refreshToken
        }
      )
      setCookiesOfTokens(res, newCredential.data)
      res.json(newCredential.data)
    } catch (error) {
      clearCookiesOfTokens(res)
      const responseError = error.response && error.response.data
      errorExpiredToken.message = responseError.message
      res.status(401)
      res.json(errorExpiredToken)
    }
  }
)

module.exports = app

// Custom error for response
class CustomError extends Error {
  code: string

  constructor(code: string = 'unknown', ...params: any) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
    this.code = code
  }
}
