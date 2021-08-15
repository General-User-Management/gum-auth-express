const unless = require('express-unless')
const UnauthorizedError = require('./errors/UnauthorizedError')
const axios = require('axios')

function _authentication (serverUrl, params) {
  return new Promise((resolve, reject) => {
    axios.post(serverUrl, params)
      .then(res => {
        resolve(res.data.data)
      }).catch(err => {
        reject(err)
      })
  })
}

module.exports = function (options) {
  const { gumServerUrl, account = 'account' } = options

  const middleware = async function (req, res, next) {
    const user = req.user
    const username = !!user && !!user[account] ? user[account] : undefined
    if (!username) {
      return next(new UnauthorizedError(403, { message: 'user have not account field' })) // 'username_missing_error'
    }

    const url = req.path
    const method = req.method

    try {
      const isAuth = await _authentication(gumServerUrl, { sub: username, obj: url, act: method })
      if (isAuth) {
        return next()
      }
      return next(new UnauthorizedError(403, { message: 'user have not authority' })) // 'user_have_not_auth'
    } catch (error) {
      return next(new UnauthorizedError(500, { message: 'casbin connect field' })) // 'casbin_server_error'
    }
  }

  middleware.unless = unless
  middleware.UnauthorizedError = UnauthorizedError

  return middleware
}
