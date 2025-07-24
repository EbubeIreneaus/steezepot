import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  try {
    const path = event.path;
    if (!path.startsWith("/api/admin") || path.includes("/auth")) {
      return;
    }

    const config = useRuntimeConfig();
    const token = getCookie(event, 'authToken')

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized access please re-login.",
      });
    }
    const user = jwt.verify(token || "", config.JWT_SECRET) as {
      isAdmin: boolean;
    };

    if (!user.isAdmin) {
      throw createError({
        statusCode: 400,
        statusMessage: "Unauthorized access please re-login.",
      });
    }

    return;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || "Internal server error",
    });
  }
});
