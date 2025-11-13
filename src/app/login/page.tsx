"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dog, Mail, Lock, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validações básicas
      if (!email || !password) {
        throw new Error("Preencha todos os campos")
      }

      if (isRegistering && !name) {
        throw new Error("Preencha seu nome completo")
      }

      if (password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres")
      }

      // Simulação de autenticação (em produção, integre com backend real)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Salvar sessão no localStorage
      const userData = {
        email,
        name: isRegistering ? name : email.split("@")[0],
        loggedIn: true,
        timestamp: Date.now()
      }

      localStorage.setItem("userSession", JSON.stringify(userData))

      // Verificar se tem dados do questionário pendentes
      const pendingOwnerData = localStorage.getItem("pendingOwnerData")
      const pendingPetData = localStorage.getItem("pendingPetData")

      if (pendingOwnerData && pendingPetData) {
        // Se tem dados pendentes, redirecionar para checkout
        router.push("/?checkout=true")
      } else {
        // Senão, ir para dashboard
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para início
          </Button>
        </Link>

        <Card className="border-2 border-orange-200 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Dog className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {isRegistering ? "Criar Conta" : "Bem-vindo de volta!"}
            </CardTitle>
            <CardDescription className="text-base">
              {isRegistering 
                ? "Cadastre-se para começar a cuidar do seu pet" 
                : "Acesse sua conta para cuidar do seu pet"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {isRegistering && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>
                <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              {!isRegistering && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-600">Lembrar de mim</span>
                  </label>
                  <a href="#" className="text-orange-600 hover:text-orange-700 font-medium">
                    Esqueceu a senha?
                  </a>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {isRegistering ? "Criando conta..." : "Entrando..."}
                  </>
                ) : (
                  isRegistering ? "Criar Conta" : "Entrar"
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(!isRegistering)
                    setError("")
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isRegistering ? (
                    <>
                      Já tem uma conta?{" "}
                      <span className="text-orange-600 hover:text-orange-700 font-medium">
                        Faça login
                      </span>
                    </>
                  ) : (
                    <>
                      Não tem uma conta?{" "}
                      <span className="text-orange-600 hover:text-orange-700 font-medium">
                        Cadastre-se grátis
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Ao {isRegistering ? "criar uma conta" : "entrar"}, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>
      </div>
    </div>
  )
}
