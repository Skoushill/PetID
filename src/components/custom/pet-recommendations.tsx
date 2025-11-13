"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  UtensilsCrossed, 
  Syringe, 
  Heart, 
  Sparkles, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Droplets,
  Activity,
  Shield,
  Crown
} from "lucide-react"
import type { OwnerData, PetData } from "./onboarding-questionnaire"

interface PetRecommendationsProps {
  ownerData: OwnerData
  petData: PetData
  isPremium: boolean
  onUpgrade: () => void
}

export function PetRecommendations({ ownerData, petData, isPremium, onUpgrade }: PetRecommendationsProps) {
  // Generate personalized recommendations based on pet data
  const generateDietRecommendations = () => {
    const ageInMonths = petData.ageUnit === "years" 
      ? parseInt(petData.age) * 12 
      : parseInt(petData.age)
    
    const weight = parseFloat(petData.weight)
    
    let recommendations = []
    
    // Age-based recommendations
    if (ageInMonths < 12) {
      recommendations.push("Ração específica para filhotes (puppy) com alto teor proteico")
      recommendations.push("Alimentar 3-4 vezes ao dia em porções menores")
      recommendations.push("Evitar alimentos humanos e guloseimas em excesso")
    } else if (ageInMonths < 84) {
      recommendations.push("Ração premium para adultos adequada ao porte")
      recommendations.push("Alimentar 2 vezes ao dia em horários regulares")
      recommendations.push("Manter água fresca sempre disponível")
    } else {
      recommendations.push("Ração sênior com nutrientes específicos para idade avançada")
      recommendations.push("Considerar suplementos para articulações")
      recommendations.push("Monitorar peso regularmente")
    }
    
    // Size-based portions
    if (petData.size === "small") {
      recommendations.push(`Porção diária: ${Math.round(weight * 40)}g dividida em 2 refeições`)
    } else if (petData.size === "medium") {
      recommendations.push(`Porção diária: ${Math.round(weight * 35)}g dividida em 2 refeições`)
    } else if (petData.size === "large") {
      recommendations.push(`Porção diária: ${Math.round(weight * 30)}g dividida em 2 refeições`)
    } else {
      recommendations.push(`Porção diária: ${Math.round(weight * 25)}g dividida em 2 refeições`)
    }
    
    // Activity level
    if (petData.activityLevel === "high") {
      recommendations.push("Considerar ração com maior teor energético devido à alta atividade")
    } else if (petData.activityLevel === "low") {
      recommendations.push("Ração light ou controle de peso para evitar obesidade")
    }
    
    return recommendations
  }

  const generateVaccineSchedule = () => {
    const ageInMonths = petData.ageUnit === "years" 
      ? parseInt(petData.age) * 12 
      : parseInt(petData.age)
    
    let schedule = []
    
    if (ageInMonths < 4) {
      schedule.push({ vaccine: "V8 ou V10 (1ª dose)", timing: "6-8 semanas", status: "urgente" })
      schedule.push({ vaccine: "V8 ou V10 (2ª dose)", timing: "9-12 semanas", status: "próximo" })
      schedule.push({ vaccine: "V8 ou V10 (3ª dose)", timing: "13-16 semanas", status: "futuro" })
      schedule.push({ vaccine: "Antirrábica", timing: "16 semanas", status: "futuro" })
    } else if (ageInMonths < 12) {
      schedule.push({ vaccine: "V8 ou V10 (reforço)", timing: "Anual", status: "verificar" })
      schedule.push({ vaccine: "Antirrábica (reforço)", timing: "Anual", status: "verificar" })
      schedule.push({ vaccine: "Giárdia", timing: "Opcional", status: "consultar" })
    } else {
      schedule.push({ vaccine: "V8 ou V10 (anual)", timing: "A cada 12 meses", status: "manter" })
      schedule.push({ vaccine: "Antirrábica (anual)", timing: "A cada 12 meses", status: "manter" })
      schedule.push({ vaccine: "Leishmaniose", timing: "Anual (áreas endêmicas)", status: "consultar" })
      schedule.push({ vaccine: "Gripe Canina", timing: "Anual (opcional)", status: "consultar" })
    }
    
    return schedule
  }

  const generateCareRecommendations = () => {
    const ageInMonths = petData.ageUnit === "years" 
      ? parseInt(petData.age) * 12 
      : parseInt(petData.age)
    
    let care = []
    
    // Age-based care
    if (ageInMonths < 12) {
      care.push({ title: "Socialização", desc: "Exponha a diferentes ambientes, pessoas e outros animais", icon: Heart })
      care.push({ title: "Treinamento", desc: "Comece comandos básicos: sentar, ficar, vir", icon: Sparkles })
      care.push({ title: "Vermifugação", desc: "A cada 3 meses até 1 ano de idade", icon: Shield })
    } else if (ageInMonths < 84) {
      care.push({ title: "Exercícios", desc: `${petData.activityLevel === "high" ? "60-90 min" : "30-45 min"} de atividade diária`, icon: Activity })
      care.push({ title: "Higiene Dental", desc: "Escovação 2-3x por semana, petiscos dentais", icon: Sparkles })
      care.push({ title: "Banho", desc: "A cada 15-30 dias com produtos específicos", icon: Droplets })
    } else {
      care.push({ title: "Check-ups", desc: "Consultas veterinárias a cada 6 meses", icon: Heart })
      care.push({ title: "Conforto", desc: "Cama ortopédica, ambiente aquecido", icon: Sparkles })
      care.push({ title: "Suplementação", desc: "Considerar condroitina e glucosamina", icon: Shield })
    }
    
    // Size-based care
    if (petData.size === "large" || petData.size === "giant") {
      care.push({ title: "Articulações", desc: "Evitar escadas e pisos escorregadios", icon: AlertCircle })
    }
    
    return care
  }

  const dietRecommendations = generateDietRecommendations()
  const vaccineSchedule = generateVaccineSchedule()
  const careRecommendations = generateCareRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome Header */}
        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">
                  Olá, {ownerData.name}! 👋
                </CardTitle>
                <CardDescription className="text-white/90 text-lg">
                  Aqui estão as recomendações personalizadas para <strong>{petData.name}</strong>
                </CardDescription>
              </div>
              {!isPremium && (
                <Badge className="bg-white/20 text-white border-white/30">
                  Plano Gratuito
                </Badge>
              )}
              {isPremium && (
                <Badge className="bg-white text-orange-600 border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-90">Raça</div>
                <div className="font-bold">{petData.breed}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-90">Idade</div>
                <div className="font-bold">{petData.age} {petData.ageUnit === "years" ? "anos" : "meses"}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-90">Peso</div>
                <div className="font-bold">{petData.weight} kg</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="text-sm opacity-90">Porte</div>
                <div className="font-bold capitalize">{
                  petData.size === "small" ? "Pequeno" :
                  petData.size === "medium" ? "Médio" :
                  petData.size === "large" ? "Grande" : "Gigante"
                }</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Premium Upsell Banner */}
        {!isPremium && (
          <Card className="border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-pink-50">
            <CardContent className="py-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      Desbloqueie Recursos Premium! 🌟
                    </h3>
                    <p className="text-sm text-gray-600">
                      Controle completo de vacinas, lembretes automáticos, dicas personalizadas e muito mais por apenas R$ 39,90/mês
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={onUpgrade}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 flex-shrink-0"
                >
                  Assinar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="diet" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-orange-200">
            <TabsTrigger value="diet" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Alimentação
            </TabsTrigger>
            <TabsTrigger value="vaccines" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Syringe className="w-4 h-4 mr-2" />
              Vacinas
            </TabsTrigger>
            <TabsTrigger value="care" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Heart className="w-4 h-4 mr-2" />
              Cuidados
            </TabsTrigger>
          </TabsList>

          {/* Diet Tab */}
          <TabsContent value="diet" className="space-y-4">
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                  Recomendações de Alimentação
                </CardTitle>
                <CardDescription>
                  Plano nutricional personalizado para {petData.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dietRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 bg-orange-50 rounded-xl p-4">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}

                {petData.allergies && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-red-900 mb-1">Atenção: Alergias/Restrições</h4>
                        <p className="text-sm text-red-800">{petData.allergies}</p>
                      </div>
                    </div>
                  </div>
                )}

                {isPremium && (
                  <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-6 text-white">
                    <div className="flex items-start gap-3 mb-4">
                      <Crown className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">Recursos Premium Ativos</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Lembretes automáticos de horários de alimentação
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Controle de porções e peso
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Histórico completo de alimentação
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vaccines Tab */}
          <TabsContent value="vaccines" className="space-y-4">
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-pink-600" />
                  Calendário de Vacinação
                </CardTitle>
                <CardDescription>
                  Mantenha {petData.name} protegido com vacinas em dia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {vaccineSchedule.map((item, index) => (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          item.status === "urgente" ? "bg-red-100" :
                          item.status === "próximo" ? "bg-orange-100" :
                          item.status === "verificar" ? "bg-yellow-100" :
                          "bg-green-100"
                        }`}>
                          <Syringe className={`w-5 h-5 ${
                            item.status === "urgente" ? "text-red-600" :
                            item.status === "próximo" ? "text-orange-600" :
                            item.status === "verificar" ? "text-yellow-600" :
                            "text-green-600"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{item.vaccine}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            {item.timing}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        item.status === "urgente" ? "bg-red-500 text-white" :
                        item.status === "próximo" ? "bg-orange-500 text-white" :
                        item.status === "verificar" ? "bg-yellow-500 text-white" :
                        "bg-green-500 text-white"
                      }>
                        {item.status === "urgente" ? "Urgente" :
                         item.status === "próximo" ? "Próximo" :
                         item.status === "verificar" ? "Verificar" :
                         item.status === "manter" ? "Manter" : "Consultar"}
                      </Badge>
                    </div>
                  </div>
                ))}

                {!isPremium && (
                  <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl p-6 text-white">
                    <div className="flex items-start gap-3">
                      <Crown className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg mb-2">Desbloqueie Controle Completo</h4>
                        <p className="text-sm opacity-90 mb-4">
                          Com o Premium você recebe lembretes automáticos, registra vacinas aplicadas 
                          e mantém o histórico completo de imunização.
                        </p>
                        <Button 
                          onClick={onUpgrade}
                          className="bg-white text-orange-600 hover:bg-gray-100"
                        >
                          Assinar Premium
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Care Tab */}
          <TabsContent value="care" className="space-y-4">
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Cuidados Essenciais
                </CardTitle>
                <CardDescription>
                  Dicas personalizadas para o bem-estar de {petData.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {careRecommendations.map((care, index) => {
                    const Icon = care.icon
                    return (
                      <div key={index} className="bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{care.title}</h4>
                            <p className="text-sm text-gray-600">{care.desc}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {petData.healthConditions && (
                  <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">Condições de Saúde Registradas</h4>
                        <p className="text-sm text-blue-800">{petData.healthConditions}</p>
                        <p className="text-xs text-blue-700 mt-2">
                          Consulte sempre seu veterinário para cuidados específicos
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Info Card */}
        <Card className="border-2 border-gray-200">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Suas Informações de Contato</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📧 {ownerData.email}</p>
                  <p>📱 {ownerData.phone}</p>
                </div>
              </div>
              <Button variant="outline" className="border-2 border-gray-300">
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
