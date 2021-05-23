import { Response } from 'express'
import cookie from 'cookie'
import jwtDecode from 'jwt-decode'
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  COOKIE_OPTIONS
} from '../constants/configs'

/**
 * Check JWT token
 *
 * @param  {string} token
 * @returns {boolean} true if the specified token is alive token, false otherwise.
 */
export const isAliveJWT = (token: string): boolean => {
  if (!token) {
    return false
  }

  const tokenDecode = decodeJWT(token)
  if (tokenDecode && tokenDecode.exp * 1000 > new Date().getTime()) {
    return true
  }
  return false
}

/**
 * Decode JWT token
 *
 * @param  {string} token
 * @returns {any} JWT token or false
 */
export const decodeJWT = (token: string): any => {
  if (!token) {
    return false
  }

  const decode = jwtDecode(token)
  if (process.server) {
    return decode
  }

  try {
    const tokenDecode = decode && JSON.parse(JSON.stringify(decode))
    return tokenDecode
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * Sets the cookies of 2 tokens: access & refresh
 *
 * @param  {Response} res
 * @param  {string} accessToken
 * @param  {string} refreshToken
 */
export const setCookiesOfTokens = (res: Response, { access, refresh }: any) => {
  const accessToken = access
  const refreshToken = refresh
  const accessObj = decodeJWT(accessToken) || {}
  const refreshObj = decodeJWT(refreshToken) || {}

  if (typeof res.cookie !== 'function') {
    return _setCookiesOfTokens(res, {
      accessToken,
      refreshToken,
      accessExp: accessObj.exp,
      refreshExp: refreshObj.exp
    })
  }

  res.cookie(AUTH_ACCESS_TOKEN_KEY, accessToken, {
    ...COOKIE_OPTIONS,
    expires: new Date(accessObj.exp * 1000)
  })
  res.cookie(AUTH_REFRESH_TOKEN_KEY, refreshToken, {
    ...COOKIE_OPTIONS,
    expires: new Date(refreshObj.exp * 1000)
  })
}

/**
 * Sets the cookies of 2 tokens by express response without cookie-parser
 *
 * @param  {Response} res
 * @param  {string} accessToken
 * @param  {string} refreshToken
 * @param  {number} accessExp
 * @param  {number} refreshExp
 */
const _setCookiesOfTokens = (
  res: Response,
  { accessToken, refreshToken, accessExp, refreshExp }: any
) => {
  res.setHeader('Set-Cookie', [
    cookie.serialize(AUTH_ACCESS_TOKEN_KEY, accessToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(accessExp * 1000)
    }),
    cookie.serialize(AUTH_REFRESH_TOKEN_KEY, refreshToken, {
      ...COOKIE_OPTIONS,
      expires: new Date(refreshExp * 1000)
    })
  ])
}

/**
 * Clear cookies of 2 tokens: access & refresh
 *
 * @param      {<type>}  res     The resource
 */
export const clearCookiesOfTokens = (res: Response) => {
  if (typeof res.clearCookie !== 'function') {
    return _clearCookiesOfTokens(res)
  }
  res.clearCookie(AUTH_ACCESS_TOKEN_KEY)
  res.clearCookie(AUTH_REFRESH_TOKEN_KEY)
}

/**
 * Clear cookies of 2 tokens: access & refresh by expres response without cookie-parser
 *
 * @return     {<type>}  { description_of_the_return_value }
 */
const _clearCookiesOfTokens = (res: Response) => {
  res.setHeader('Set-Cookie', [
    cookie.serialize(AUTH_ACCESS_TOKEN_KEY, '', {
      maxAge: 0
    }),
    cookie.serialize(AUTH_REFRESH_TOKEN_KEY, '', {
      maxAge: 0
    })
  ])
}
