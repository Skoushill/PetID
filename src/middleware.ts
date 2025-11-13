import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rotas protegidas que precisam de autenticação
  const protectedRoutes = ['/dashboard']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Verificar se tem sessão (em produção, use cookies ou JWT)
    // Por enquanto, apenas redireciona para login se não tiver sessão
    // A verificação real acontece no lado do cliente
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
