"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock, Check, ArrowLeft, Crown, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import type { OwnerData } from "./onboarding-questionnaire"

interface AsaasCheckoutProps {
  ownerData: OwnerData
  onSuccess: () => void
  onCancel: () => void
}

export function AsaasCheckout({ ownerData, onSuccess, onCancel }: AsaasCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "pix">("credit_card")
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  
  // Card data
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState(ownerData.name)
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cpf, setCpf] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setErrorMessage("")

    try {
      // Validações antes de enviar
      if (!cpf || cpf.replace(/\D/g, "").length !== 11) {
        throw new Error("CPF inválido. Digite um CPF válido com 11 dígitos.")
      }

      if (paymentMethod === "credit_card") {
        if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
          throw new Error("Número do cartão inválido.")
        }
        if (!cardName || cardName.trim().length < 3) {
          throw new Error("Nome do titular inválido.")
        }
        if (!cardExpiry || cardExpiry.length !== 5) {
          throw new Error("Data de validade inválida. Use o formato MM/AA.")
        }
        if (!cardCvv || cardCvv.length < 3) {
          throw new Error("CVV inválido.")
        }

        // Validar data de validade
        const [month, year] = cardExpiry.split("/")
        const currentYear = new Date().getFullYear() % 100
        const currentMonth = new Date().getMonth() + 1
        
        if (parseInt(month) < 1 || parseInt(month) > 12) {
          throw new Error("Mês de validade inválido.")
        }
        
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
          throw new Error("Cartão vencido. Verifique a data de validade.")
        }
      }

      const response = await fetch("/api/asaas/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            name: ownerData.name,
            email: ownerData.email,
            phone: ownerData.phone,
            cpfCnpj: cpf.replace(/\D/g, ""),
          },
          paymentMethod,
          billingType: paymentMethod === "credit_card" ? "CREDIT_CARD" : "PIX",
          value: 39.90,
          cycle: "MONTHLY",
          creditCard: paymentMethod === "credit_card" ? {
            holderName: cardName,
            number: cardNumber.replace(/\s/g, ""),
            expiryMonth: cardExpiry.split("/")[0],
            expiryYear: "20" + cardExpiry.split("/")[1],
            ccv: cardCvv,
          } : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Tratamento de erros específicos do ASAAS
        if (data.details?.errors) {
          const errorMessages = data.details.errors.map((err: any) => err.description || err.message).join(". ")
          throw new Error(errorMessages || "Erro ao processar pagamento")
        }
        throw new Error(data.error || "Erro ao processar pagamento. Tente novamente.")
      }

      if (data.success) {
        // Salvar status premium
        localStorage.setItem("isPremium", "true")
        
        // Se for PIX, mostrar QR Code (implementar depois)
        if (paymentMethod === "pix" && data.pix) {
          // TODO: Mostrar QR Code do PIX
          console.log("PIX QR Code:", data.pix)
        }
        
        setShowSuccess(true)
        setTimeout(() => {
          setIsProcessing(false)
          onSuccess()
        }, 2000)
      } else {
        throw new Error("Erro ao processar pagamento. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro no pagamento:", error)
      setIsProcessing(false)
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Erro ao processar pagamento. Verifique os dados e tente novamente."
      )
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4)
    }
    return v
  }

  const formatCPF = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length <= 11) {
      return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  // Success Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-200 shadow-2xl">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pagamento Confirmado! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Sua assinatura Premium foi ativada com sucesso!
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-6 border-2 border-orange-200">
              <Crown className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <p className="text-sm text-gray-700">
                Agora você tem acesso completo a todos os recursos premium do PetID!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="mb-6 text-gray-600 hover:text-gray-900"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card className="border-2 border-orange-200 shadow-xl">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Pagamento Seguro</CardTitle>
              <CardDescription>
                Seus dados estão protegidos com criptografia SSL
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Payment Method Selection */}
                <div className="space-y-2">
                  <Label>Método de Pagamento</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={paymentMethod === "credit_card" ? "default" : "outline"}
                      className={paymentMethod === "credit_card" 
                        ? "bg-gradient-to-r from-orange-500 to-pink-500" 
                        : "border-2 border-gray-300"
                      }
                      onClick={() => setPaymentMethod("credit_card")}
                      disabled={isProcessing}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Cartão
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === "pix" ? "default" : "outline"}
                      className={paymentMethod === "pix" 
                        ? "bg-gradient-to-r from-orange-500 to-pink-500" 
                        : "border-2 border-gray-300"
                      }
                      onClick={() => setPaymentMethod("pix")}
                      disabled={isProcessing}
                    >
                      PIX
                    </Button>
                  </div>
                </div>

                {/* CPF */}
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                    maxLength={14}
                    required
                    disabled={isProcessing}
                    className="border-2 border-orange-200 focus:border-orange-400"
                  />
                </div>

                {paymentMethod === "credit_card" ? (
                  <>
                    {/* Card Number */}
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Número do Cartão *</Label>
                      <Input
                        id="card-number"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                        disabled={isProcessing}
                        className="border-2 border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    {/* Card Name */}
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Nome no Cartão *</Label>
                      <Input
                        id="card-name"
                        placeholder="Nome como está no cartão"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        required
                        disabled={isProcessing}
                        className="border-2 border-orange-200 focus:border-orange-400"
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Validade *</Label>
                        <Input
                          id="card-expiry"
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                          required
                          disabled={isProcessing}
                          className="border-2 border-orange-200 focus:border-orange-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV *</Label>
                        <Input
                          id="card-cvv"
                          placeholder="000"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          maxLength={4}
                          required
                          disabled={isProcessing}
                          className="border-2 border-orange-200 focus:border-orange-400"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                    <p className="text-sm text-blue-800 mb-4">
                      Após confirmar, você receberá o código PIX para pagamento.
                      A assinatura será ativada automaticamente após a confirmação do pagamento.
                    </p>
                    <Badge className="bg-blue-500 text-white">
                      Pagamento instantâneo
                    </Badge>
                  </div>
                )}

                {/* Security Badge */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-green-600" />
                    <div className="text-sm text-green-800">
                      <strong>Pagamento 100% seguro</strong>
                      <p className="text-xs">Processado via ASAAS com criptografia SSL</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-lg py-6"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processando pagamento...
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      Confirmar Assinatura - R$ 39,90
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Ao confirmar, você concorda com nossos Termos de Serviço
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-2 border-orange-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Resumo da Assinatura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Plano Premium</h3>
                    <p className="text-sm text-gray-600">Assinatura Mensal</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plano Premium</span>
                    <span className="font-semibold">R$ 39,90/mês</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Primeira cobrança</span>
                    <span className="font-semibold">Hoje</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Próxima cobrança</span>
                    <span className="font-semibold">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-orange-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-orange-600">R$ 39,90</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-sm text-orange-900 mb-3">Incluído no Premium:</h4>
                  <div className="space-y-2">
                    {[
                      "Características completas",
                      "Controle de vacinas",
                      "Controle de alimentação",
                      "Dicas personalizadas",
                      "Perfil digital completo",
                      "Alertas inteligentes"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-blue-800">
                    <strong>💡 Dica:</strong> Você pode cancelar sua assinatura a qualquer momento,
                    sem multas ou taxas adicionais.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg">Dados do Titular</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Nome:</span>
                  <span className="ml-2 font-semibold">{ownerData.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">E-mail:</span>
                  <span className="ml-2 font-semibold">{ownerData.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Celular:</span>
                  <span className="ml-2 font-semibold">{ownerData.phone}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
