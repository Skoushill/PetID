"use client"

import { useState } from "react"
import { Heart, Calendar, Syringe, UtensilsCrossed, Bell, Sparkles, Dog, Info, Check, Crown, Zap, Lock, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OnboardingQuestionnaire, type OwnerData, type PetData } from "@/components/custom/onboarding-questionnaire"
import { PetRecommendations } from "@/components/custom/pet-recommendations"
import { AsaasCheckout } from "@/components/custom/asaas-checkout"
import Link from "next/link"

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("home")
  const [showPricing, setShowPricing] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null)
  const [petData, setPetData] = useState<PetData | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const handleQuestionnaireComplete = (owner: OwnerData, pet: PetData) => {
    setOwnerData(owner)
    setPetData(pet)
    setShowQuestionnaire(false)
    setShowRecommendations(true)
  }

  const handleStartQuestionnaire = () => {
    setShowQuestionnaire(true)
    setSelectedTab("questionnaire")
  }

  const handleStartCheckout = () => {
    setShowCheckout(true)
    setShowPricing(false)
  }

  const handleCheckoutSuccess = () => {
    setIsPremium(true)
    setShowCheckout(false)
    setShowPricing(false)
  }

  // Show checkout
  if (showCheckout && ownerData) {
    return (
      <AsaasCheckout
        ownerData={ownerData}
        onSuccess={handleCheckoutSuccess}
        onCancel={() => {
          setShowCheckout(false)
          setShowPricing(true)
        }}
      />
    )
  }

  // Show questionnaire
  if (showQuestionnaire) {
    return (
      <OnboardingQuestionnaire 
        onComplete={handleQuestionnaireComplete}
        onCancel={() => {
          setShowQuestionnaire(false)
          setSelectedTab("home")
        }}
      />
    )
  }

  // Show recommendations after questionnaire
  if (showRecommendations && ownerData && petData) {
    return (
      <PetRecommendations 
        ownerData={ownerData}
        petData={petData}
        isPremium={isPremium}
        onUpgrade={() => setShowPricing(true)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Dog className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  PetID
                </h1>
                <p className="text-xs text-gray-600">Seu cachorro merece!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-2 border-orange-300 hover:bg-orange-50"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                onClick={() => setShowPricing(true)}
              >
                <Crown className="w-4 h-4 mr-2" />
                Assinar Premium
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {selectedTab === "home" && !showPricing && (
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 px-4 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Tecnologia + Amor pelos Animais
            </Badge>
            
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Cuide do seu{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                melhor amigo
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Registre vacinas, controle alimentação, receba lembretes e crie um perfil digital completo. 
              Seu cachorro também merece um app feito só pra ele! 🐾
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 w-full sm:w-auto"
                onClick={handleStartQuestionnaire}
              >
                <Dog className="w-5 h-5 mr-2" />
                Cadastrar Meu Pet
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-300 hover:bg-orange-50 w-full sm:w-auto" 
                onClick={() => setShowPricing(true)}
              >
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos Premium
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-orange-100">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">350+</div>
                <div className="text-xs md:text-sm text-gray-600">Raças</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-pink-100">
                <div className="text-2xl md:text-3xl font-bold text-pink-600">100%</div>
                <div className="text-xs md:text-sm text-gray-600">Cuidado</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-purple-100">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">50k+</div>
                <div className="text-xs md:text-sm text-gray-600">Pets</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {showPricing && (
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 px-4 py-2 mb-4">
                <Crown className="w-4 h-4 mr-1" />
                Planos e Preços
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Escolha o melhor para seu pet
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comece grátis ou desbloqueie recursos premium para cuidar ainda melhor do seu amigo! 🐕
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="border-2 border-gray-200 hover:shadow-xl transition-all">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Dog className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Plano Gratuito</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    R$ 0
                    <span className="text-lg font-normal text-gray-600">/mês</span>
                  </div>
                  <CardDescription>Perfeito para começar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Cadastro básico do pet</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Informações básicas de raças</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Perfil digital simples</span>
                    </li>
                    <li className="flex items-start gap-3 opacity-50">
                      <span className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">✕</span>
                      <span className="text-gray-500">Características completas</span>
                    </li>
                    <li className="flex items-start gap-3 opacity-50">
                      <span className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">✕</span>
                      <span className="text-gray-500">Controle de vacinas</span>
                    </li>
                    <li className="flex items-start gap-3 opacity-50">
                      <span className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">✕</span>
                      <span className="text-gray-500">Controle de alimentação</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => setShowPricing(false)}
                  >
                    Continuar Grátis
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="border-4 border-orange-400 hover:shadow-2xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-br from-orange-500 to-pink-500 text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
                  RECOMENDADO
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Plano Premium</CardTitle>
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    R$ 39,90
                    <span className="text-lg font-normal text-gray-600">/mês</span>
                  </div>
                  <CardDescription>Cuidado completo para seu pet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 border-2 border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-orange-600" />
                      <span className="font-bold text-orange-900">Tudo do Gratuito +</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Características Completas</span>
                        <span className="text-sm text-gray-600">Peso, tamanho, expectativa de vida, comportamento e curiosidades</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Registro Completo</span>
                        <span className="text-sm text-gray-600">Idade, peso, vacinas e alimentação organizados</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Dicas Personalizadas</span>
                        <span className="text-sm text-gray-600">Saúde, bem-estar e adestramento específicos</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Perfil Digital Completo</span>
                        <span className="text-sm text-gray-600">Fotos, histórico e momentos especiais</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Controle de Vacinas</span>
                        <span className="text-sm text-gray-600">Calendário completo e lembretes automáticos</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-900 font-semibold block">Controle de Alimentação</span>
                        <span className="text-sm text-gray-600">Monitore dieta, porções e horários</span>
                      </div>
                    </li>
                  </ul>

                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <Sparkles className="w-5 h-5" />
                      <span className="font-bold">Cancele quando quiser, sem multa!</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg py-6"
                    onClick={() => {
                      if (ownerData) {
                        handleStartCheckout()
                      } else {
                        // Primeiro precisa cadastrar
                        setShowPricing(false)
                        handleStartQuestionnaire()
                      }
                    }}
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Assinar por R$ 39,90/mês
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Pagamento seguro via ASAAS • Cancele quando quiser
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Section */}
            <div className="mt-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Por que escolher o Premium? 🌟
                </h3>
                <p className="text-lg opacity-90">
                  Tenha controle total da saúde e bem-estar do seu pet
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Syringe className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Nunca Esqueça Vacinas</h4>
                  <p className="text-sm opacity-90">
                    Receba lembretes automáticos para manter a carteira de vacinação em dia
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <UtensilsCrossed className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Alimentação Saudável</h4>
                  <p className="text-sm opacity-90">
                    Controle porções, horários e receba dicas nutricionais personalizadas
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Alertas Inteligentes</h4>
                  <p className="text-sm opacity-90">
                    Notificações personalizadas para consultas, medicamentos e cuidados
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                variant="ghost" 
                onClick={() => setShowPricing(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Voltar para início
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {selectedTab === "features" && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tudo que seu pet precisa em um só lugar
              </h2>
              <p className="text-lg text-gray-600">
                Cuidar nunca foi tão fácil e divertido! ❤️
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 - Free */}
              <Card className="border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Dog className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Cadastro Completo</CardTitle>
                  <CardDescription>
                    Registre todas as informações do seu pet em um perfil digital organizado
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 2 - Premium */}
              <Card className="border-2 border-orange-300 hover:border-orange-400 transition-all hover:shadow-xl relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Características Completas</CardTitle>
                  <CardDescription>
                    Peso ideal, tamanho, expectativa de vida, comportamento e curiosidades da raça.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 3 - Premium */}
              <Card className="border-2 border-orange-300 hover:border-orange-400 transition-all hover:shadow-xl relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Controle de Vacinas</CardTitle>
                  <CardDescription>
                    Calendário completo com lembretes automáticos para nunca esquecer.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 4 - Premium */}
              <Card className="border-2 border-orange-300 hover:border-orange-400 transition-all hover:shadow-xl relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Alertas Inteligentes</CardTitle>
                  <CardDescription>
                    Lembretes personalizados para consultas veterinárias e cuidados essenciais.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 5 - Premium */}
              <Card className="border-2 border-orange-300 hover:border-orange-400 transition-all hover:shadow-xl relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Dicas Personalizadas</CardTitle>
                  <CardDescription>
                    Sugestões de saúde, bem-estar e adestramento específicas para seu pet.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Feature 6 - Premium */}
              <Card className="border-2 border-orange-300 hover:border-orange-400 transition-all hover:shadow-xl relative overflow-hidden">
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Controle de Alimentação</CardTitle>
                  <CardDescription>
                    Monitore dieta, porções e horários para uma alimentação saudável.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* CTA Premium */}
            <div className="mt-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Desbloqueie todos os recursos! 🚀
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Assine o Premium por apenas R$ 39,90/mês e tenha controle total da saúde do seu pet
              </p>
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100"
                onClick={() => setShowPricing(true)}
              >
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      {!showPricing && (
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Seu cachorro merece o melhor cuidado! 🐾
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Junte-se a milhares de tutores que já transformaram a forma de cuidar dos seus pets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={handleStartQuestionnaire}
                >
                  <Dog className="w-5 h-5 mr-2" />
                  Começar Agora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10"
                  onClick={() => setShowPricing(true)}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Ver Premium
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white" />
                  ))}
                </div>
                <span className="opacity-90">+50.000 tutores felizes</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm">
            Feito com <Heart className="w-4 h-4 inline text-pink-500" /> para todos os cachorros do mundo
          </p>
          <p className="text-xs mt-2 text-gray-400">
            PetID © 2024 - Tecnologia que cuida de quem você ama
          </p>
        </div>
      </footer>

      {/* Navigation Tabs (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around py-2">
          <button
            onClick={() => {
              setSelectedTab("home")
              setShowPricing(false)
            }}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              selectedTab === "home" && !showPricing ? "text-orange-600" : "text-gray-400"
            }`}
          >
            <Dog className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </button>
          <button
            onClick={() => {
              setSelectedTab("features")
              setShowPricing(false)
            }}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              selectedTab === "features" && !showPricing ? "text-orange-600" : "text-gray-400"
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-xs">Features</span>
          </button>
          <button
            onClick={() => setShowPricing(true)}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              showPricing ? "text-orange-600" : "text-gray-400"
            }`}
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs">Premium</span>
          </button>
          <button
            onClick={handleStartQuestionnaire}
            className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400"
          >
            <Dog className="w-5 h-5" />
            <span className="text-xs">Cadastrar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
