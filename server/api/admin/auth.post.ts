import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody(event) 
    console.log(body)
    const {user, password} = body
    if (user===config.ADMIN_USER && password===config.ADMIN_PASSWORD) {
     const token = jwt.sign({'isAdmin': true}, config.JWT_SECRET)
     setCookie(event, 'authToken', token, {
      sameSite: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
     })
     return {success: true}
    }
    return createError({statusCode: 422, statusMessage: 'Admin not found'})
  } catch (error: any) {
    return createError({statusCode: 500, statusMessage: error.message})
  }
})
