"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Check, User, Dog, Calendar, Weight, Ruler, Activity, Heart, Mail, Phone } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export interface OwnerData {
  name: string
  email: string
  phone: string
}

export interface PetData {
  name: string
  breed: string
  age: string
  ageUnit: "months" | "years"
  weight: string
  gender: "male" | "female"
  size: "small" | "medium" | "large" | "giant"
  activityLevel: "low" | "moderate" | "high"
  healthConditions: string
  currentDiet: string
  allergies: string
}

interface OnboardingQuestionnaireProps {
  onComplete: (ownerData: OwnerData, petData: PetData) => void
  onCancel: () => void
}

export function OnboardingQuestionnaire({ onComplete, onCancel }: OnboardingQuestionnaireProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  // Owner data
  const [ownerData, setOwnerData] = useState<OwnerData>({
    name: "",
    email: "",
    phone: ""
  })

  // Pet data
  const [petData, setPetData] = useState<PetData>({
    name: "",
    breed: "",
    age: "",
    ageUnit: "years",
    weight: "",
    gender: "male",
    size: "medium",
    activityLevel: "moderate",
    healthConditions: "",
    currentDiet: "",
    allergies: ""
  })

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(ownerData, petData)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    if (step === 1) {
      return ownerData.name.trim() !== "" && 
             ownerData.email.trim() !== "" && 
             ownerData.phone.trim() !== ""
    }
    if (step === 2) {
      return petData.name.trim() !== "" && 
             petData.breed.trim() !== "" && 
             petData.age.trim() !== "" && 
             petData.weight.trim() !== ""
    }
    if (step === 3) {
      return true // Step 3 is optional info
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Passo {step} de {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((step / totalSteps) * 100)}% completo
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-2 border-orange-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {step === 1 && <User className="w-8 h-8 text-white" />}
              {step === 2 && <Dog className="w-8 h-8 text-white" />}
              {step === 3 && <Heart className="w-8 h-8 text-white" />}
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              {step === 1 && "Seus Dados"}
              {step === 2 && "Informações do Pet"}
              {step === 3 && "Detalhes Adicionais"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Vamos começar criando sua conta"}
              {step === 2 && "Conte-nos sobre seu amigo peludo"}
              {step === 3 && "Informações para cuidados personalizados"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Owner Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-600" />
                    Nome Completo *
                  </Label>
                  <Input
                    id="owner-name"
                    placeholder="Digite seu nome completo"
                    value={ownerData.name}
                    onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-600" />
                    E-mail *
                  </Label>
                  <Input
                    id="owner-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={ownerData.email}
                    onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner-phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-600" />
                    Celular *
                  </Label>
                  <Input
                    id="owner-phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={ownerData.phone}
                    onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>🔒 Seus dados estão seguros!</strong> Usaremos essas informações apenas para 
                    enviar lembretes importantes sobre a saúde do seu pet.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Pet Basic Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pet-name" className="flex items-center gap-2">
                    <Dog className="w-4 h-4 text-orange-600" />
                    Nome do Pet *
                  </Label>
                  <Input
                    id="pet-name"
                    placeholder="Como você chama seu amigo?"
                    value={petData.name}
                    onChange={(e) => setPetData({ ...petData, name: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet-breed">Raça *</Label>
                  <Input
                    id="pet-breed"
                    placeholder="Ex: Labrador, Vira-lata, Golden Retriever..."
                    value={petData.breed}
                    onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pet-age" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      Idade *
                    </Label>
                    <Input
                      id="pet-age"
                      type="number"
                      placeholder="0"
                      value={petData.age}
                      onChange={(e) => setPetData({ ...petData, age: e.target.value })}
                      className="border-2 border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age-unit">Unidade *</Label>
                    <Select 
                      value={petData.ageUnit} 
                      onValueChange={(value: "months" | "years") => setPetData({ ...petData, ageUnit: value })}
                    >
                      <SelectTrigger className="border-2 border-orange-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="months">Meses</SelectItem>
                        <SelectItem value="years">Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pet-weight" className="flex items-center gap-2">
                    <Weight className="w-4 h-4 text-orange-600" />
                    Peso (kg) *
                  </Label>
                  <Input
                    id="pet-weight"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={petData.weight}
                    onChange={(e) => setPetData({ ...petData, weight: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sexo *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={petData.gender === "male" ? "default" : "outline"}
                      className={petData.gender === "male" 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                        : "border-2 border-gray-300"
                      }
                      onClick={() => setPetData({ ...petData, gender: "male" })}
                    >
                      Macho
                    </Button>
                    <Button
                      type="button"
                      variant={petData.gender === "female" ? "default" : "outline"}
                      className={petData.gender === "female" 
                        ? "bg-gradient-to-r from-pink-500 to-pink-600" 
                        : "border-2 border-gray-300"
                      }
                      onClick={() => setPetData({ ...petData, gender: "female" })}
                    >
                      Fêmea
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-orange-600" />
                    Porte *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "small", label: "Pequeno", desc: "até 10kg" },
                      { value: "medium", label: "Médio", desc: "10-25kg" },
                      { value: "large", label: "Grande", desc: "25-45kg" },
                      { value: "giant", label: "Gigante", desc: "+45kg" }
                    ].map((size) => (
                      <Button
                        key={size.value}
                        type="button"
                        variant={petData.size === size.value ? "default" : "outline"}
                        className={`h-auto py-3 flex flex-col ${
                          petData.size === size.value 
                            ? "bg-gradient-to-r from-orange-500 to-pink-500" 
                            : "border-2 border-gray-300"
                        }`}
                        onClick={() => setPetData({ ...petData, size: size.value as any })}
                      >
                        <span className="font-bold">{size.label}</span>
                        <span className="text-xs opacity-80">{size.desc}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Additional Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-600" />
                    Nível de Atividade
                  </Label>
                  <Select 
                    value={petData.activityLevel} 
                    onValueChange={(value: "low" | "moderate" | "high") => setPetData({ ...petData, activityLevel: value })}
                  >
                    <SelectTrigger className="border-2 border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixo - Prefere descansar</SelectItem>
                      <SelectItem value="moderate">Moderado - Passeios regulares</SelectItem>
                      <SelectItem value="high">Alto - Muito ativo e brincalhão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-diet">Alimentação Atual</Label>
                  <Textarea
                    id="current-diet"
                    placeholder="Ex: Ração premium 2x ao dia, petiscos naturais..."
                    value={petData.currentDiet}
                    onChange={(e) => setPetData({ ...petData, currentDiet: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Alergias ou Restrições</Label>
                  <Textarea
                    id="allergies"
                    placeholder="Ex: Alergia a frango, intolerância a lactose..."
                    value={petData.allergies}
                    onChange={(e) => setPetData({ ...petData, allergies: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="health-conditions">Condições de Saúde</Label>
                  <Textarea
                    id="health-conditions"
                    placeholder="Ex: Displasia, problemas cardíacos, diabetes..."
                    value={petData.healthConditions}
                    onChange={(e) => setPetData({ ...petData, healthConditions: e.target.value })}
                    className="border-2 border-orange-200 focus:border-orange-400 min-h-[80px]"
                  />
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-800">
                    <strong>✨ Quase lá!</strong> Com essas informações, vamos gerar recomendações 
                    personalizadas de alimentação, vacinas e cuidados específicos para seu pet.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-2 border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              )}
              
              {step === 1 && (
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="border-2 border-gray-300"
                >
                  Cancelar
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === totalSteps ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Required fields note */}
            <p className="text-xs text-center text-gray-500 pt-2">
              * Campos obrigatórios
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
