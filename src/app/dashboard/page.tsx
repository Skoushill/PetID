"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dog, Calendar, Syringe, UtensilsCrossed, Bell, Crown, LogOut, User, Settings, Heart, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Verificar se usuário está logado
    const session = localStorage.getItem("userSession")
    if (!session) {
      router.push("/login")
      return
    }

    try {
      const sessionData = JSON.parse(session)
      setUserName(sessionData.name || sessionData.email.split("@")[0])
      setUserEmail(sessionData.email)

      // Verificar se tem assinatura premium
      const premiumStatus = localStorage.getItem("isPremium")
      setIsPremium(premiumStatus === "true")
    } catch (error) {
      console.error("Erro ao carregar sessão:", error)
      router.push("/login")
      return
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userSession")
    router.push("/")
  }

  const handleUpgradeToPremium = () => {
    router.push("/?pricing=true")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Olá, {userName}! 👋
                </h1>
                <p className="text-xs text-gray-600">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isPremium && (
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Bem-vindo ao seu painel! 🐾
            </h2>
            <p className="text-lg opacity-90">
              Aqui você gerencia tudo sobre seu melhor amigo
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2 border-orange-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Meus Pets</p>
                    <p className="text-3xl font-bold text-orange-600">1</p>
                  </div>
                  <Dog className="w-10 h-10 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Vacinas</p>
                    <p className="text-3xl font-bold text-pink-600">3</p>
                  </div>
                  <Syringe className="w-10 h-10 text-pink-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consultas</p>
                    <p className="text-3xl font-bold text-purple-600">2</p>
                  </div>
                  <Calendar className="w-10 h-10 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Alertas</p>
                    <p className="text-3xl font-bold text-blue-600">1</p>
                  </div>
                  <Bell className="w-10 h-10 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Meus Pets */}
            <Card className="border-2 border-orange-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Meus Pets</CardTitle>
                    <CardDescription>Gerencie o perfil dos seus pets</CardDescription>
                  </div>
                  <Dog className="w-8 h-8 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 border-2 border-orange-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                        <Dog className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">Rex</h3>
                        <p className="text-sm text-gray-600">Golden Retriever • 3 anos</p>
                      </div>
                      {isPremium && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    Ver Perfil Completo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vacinas */}
            <Card className="border-2 border-pink-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Controle de Vacinas</CardTitle>
                    <CardDescription>Próximas vacinas e histórico</CardDescription>
                  </div>
                  <Syringe className="w-8 h-8 text-pink-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-semibold text-yellow-900">Antirrábica</p>
                        <p className="text-sm text-yellow-700">Vence em 15 dias</p>
                      </div>
                    </div>
                  </div>
                  {!isPremium && (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center">
                      <Crown className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-3">
                        Desbloqueie o controle completo de vacinas
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-orange-500 to-pink-500"
                        onClick={handleUpgradeToPremium}
                      >
                        Assinar Premium
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Alimentação */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Alimentação</CardTitle>
                    <CardDescription>Controle de dieta e horários</CardDescription>
                  </div>
                  <UtensilsCrossed className="w-8 h-8 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <p className="font-semibold text-green-900">Última refeição</p>
                      <p className="text-sm text-green-700">Hoje às 12:00 - 200g de ração</p>
                    </div>
                    <Button className="w-full" variant="outline">
                      Registrar Refeição
                    </Button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 text-center">
                    <Crown className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-4">
                      Recurso exclusivo Premium
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-orange-500 to-pink-500"
                      onClick={handleUpgradeToPremium}
                    >
                      Assinar Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Configurações */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Minha Conta</CardTitle>
                    <CardDescription>Configurações e assinatura</CardDescription>
                  </div>
                  <User className="w-8 h-8 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleUpgradeToPremium}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    {isPremium ? "Gerenciar Assinatura" : "Assinar Premium"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair da Conta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium CTA (if not premium) */}
          {!isPremium && (
            <Card className="border-4 border-orange-400 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
              <CardContent className="pt-8 pb-8 text-center">
                <Crown className="w-16 h-16 mx-auto mb-4 text-white" />
                <h3 className="text-3xl font-bold mb-4">
                  Desbloqueie Todos os Recursos!
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Assine o Premium por apenas R$ 39,90/mês e tenha controle total da saúde do seu pet
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={handleUpgradeToPremium}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Assinar Premium Agora
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">
            Feito com <Heart className="w-4 h-4 inline text-pink-500" /> para todos os cachorros do mundo
          </p>
        </div>
      </footer>
    </div>
  )
}
