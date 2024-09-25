import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export function middleware(req: NextRequest) {
  // Parsear las cookies
  const cookies = cookie.parse(req.headers.get("Cookie") || "");
  const token = cookies.token; // Obtener el token de las cookies
  const tokenFromOauth = req.cookies.get("token"); // Obtener el token de OAuth

  let tokenData;

  if (token) {
    // Intentar parsear el token
    try {
      tokenData = JSON.parse(token);
    } catch (error) {
      console.error("Error al parsear el token de las cookies:", error);
    }
  }

  let tokenDataAuth;

  if (tokenFromOauth) {
    // Intentar parsear el token de OAuth
    try {
      tokenDataAuth = JSON.parse(tokenFromOauth.value);
    } catch (error) {
      console.error("Error al parsear el token de OAuth:", error);
    }
  }

  // Redirigir si no hay token y se intenta acceder a /recruiter
  if (!token && !tokenFromOauth && req.nextUrl.pathname.startsWith("/recruiter")) {
    console.log("Cannot enter recruiter area without a token.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Manejar el flujo de OAuth
  if (req.nextUrl.pathname.startsWith("/oauth")) {
    const oAuthToken = req.nextUrl.searchParams.get("token");

    if (oAuthToken) {
      const response = NextResponse.next();

      // Configurar la cookie para guardar el token de OAuth
      response.cookies.set({
        name: "token",
        value: oAuthToken,
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        httpOnly: true, // Asegúrate de que esta opción se ajuste a tus necesidades
      });

      return NextResponse.redirect(new URL("/recruiter", req.url));
    }
  }

  return NextResponse.next(); // Continúa con la solicitud si no se cumplen las condiciones anteriores
}
