import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer, paymentMethod, billingType, value, cycle, creditCard } = body

    // Validação básica
    if (!customer || !customer.email || !customer.name) {
      return NextResponse.json(
        { error: "Dados do cliente incompletos. Verifique nome e e-mail." },
        { status: 400 }
      )
    }

    if (!customer.cpfCnpj || customer.cpfCnpj.length !== 11) {
      return NextResponse.json(
        { error: "CPF inválido. Digite um CPF válido com 11 dígitos." },
        { status: 400 }
      )
    }

    // API Key do ASAAS (ambiente de homologação)
    const asaasApiKey = process.env.ASAAS_API_KEY

    if (!asaasApiKey) {
      console.error("ASAAS_API_KEY não configurada")
      return NextResponse.json(
        { error: "Configuração do sistema de pagamento não encontrada. Entre em contato com o suporte." },
        { status: 500 }
      )
    }

    // URL base do ASAAS (sandbox para homologação)
    const asaasBaseUrl = "https://sandbox.asaas.com/api/v3"

    // 1. Criar ou buscar cliente no ASAAS
    let customerId: string

    const customerResponse = await fetch(`${asaasBaseUrl}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": asaasApiKey,
      },
      body: JSON.stringify({
        name: customer.name,
        email: customer.email,
        phone: customer.phone?.replace(/\D/g, ""),
        cpfCnpj: customer.cpfCnpj,
      }),
    })

    if (!customerResponse.ok) {
      const errorData = await customerResponse.json()
      console.error("Erro ao criar cliente:", errorData)
      
      // Se cliente já existe, buscar pelo email
      if (errorData.errors?.[0]?.code === "invalid_action" || errorData.errors?.[0]?.description?.includes("já existe")) {
        const searchResponse = await fetch(
          `${asaasBaseUrl}/customers?email=${encodeURIComponent(customer.email)}`,
          {
            headers: {
              "access_token": asaasApiKey,
            },
          }
        )
        
        if (searchResponse.ok) {
          const searchData = await searchResponse.json()
          if (searchData.data && searchData.data.length > 0) {
            customerId = searchData.data[0].id
          } else {
            return NextResponse.json(
              { error: "Erro ao localizar cliente. Tente novamente.", details: errorData },
              { status: 400 }
            )
          }
        } else {
          return NextResponse.json(
            { error: "Erro ao buscar cliente existente.", details: errorData },
            { status: 400 }
          )
        }
      } else {
        // Outros erros
        const errorMessage = errorData.errors?.[0]?.description || "Erro ao criar cliente"
        return NextResponse.json(
          { error: errorMessage, details: errorData },
          { status: 400 }
        )
      }
    } else {
      const customerData = await customerResponse.json()
      customerId = customerData.id
    }

    // 2. Criar assinatura
    const today = new Date()
    const nextDueDate = new Date(today)
    nextDueDate.setDate(today.getDate() + 1) // Próximo dia útil

    const subscriptionResponse = await fetch(`${asaasBaseUrl}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": asaasApiKey,
      },
      body: JSON.stringify({
        customer: customerId,
        billingType: billingType,
        value: value,
        nextDueDate: nextDueDate.toISOString().split("T")[0],
        cycle: cycle,
        description: "Assinatura Premium PetID - Controle completo do seu pet",
      }),
    })

    if (!subscriptionResponse.ok) {
      const errorData = await subscriptionResponse.json()
      console.error("Erro ao criar assinatura:", errorData)
      const errorMessage = errorData.errors?.[0]?.description || "Erro ao criar assinatura"
      return NextResponse.json(
        { error: errorMessage, details: errorData },
        { status: 400 }
      )
    }

    const subscriptionData = await subscriptionResponse.json()

    // 3. Se for cartão de crédito, processar pagamento da primeira cobrança
    if (billingType === "CREDIT_CARD" && creditCard) {
      // Buscar a primeira cobrança da assinatura
      const paymentsResponse = await fetch(
        `${asaasBaseUrl}/payments?subscription=${subscriptionData.id}`,
        {
          headers: {
            "access_token": asaasApiKey,
          },
        }
      )

      if (!paymentsResponse.ok) {
        return NextResponse.json(
          { error: "Erro ao buscar cobranças da assinatura" },
          { status: 400 }
        )
      }

      const paymentsData = await paymentsResponse.json()
      const firstPayment = paymentsData.data[0]

      if (!firstPayment) {
        return NextResponse.json(
          { error: "Nenhuma cobrança encontrada para a assinatura" },
          { status: 400 }
        )
      }

      // Processar pagamento com cartão
      const paymentResponse = await fetch(
        `${asaasBaseUrl}/payments/${firstPayment.id}/payWithCreditCard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": asaasApiKey,
          },
          body: JSON.stringify({
            creditCard: {
              holderName: creditCard.holderName,
              number: creditCard.number.replace(/\s/g, ""),
              expiryMonth: creditCard.expiryMonth,
              expiryYear: creditCard.expiryYear,
              ccv: creditCard.ccv,
            },
            creditCardHolderInfo: {
              name: customer.name,
              email: customer.email,
              cpfCnpj: customer.cpfCnpj,
              postalCode: "00000000",
              addressNumber: "S/N",
              phone: customer.phone?.replace(/\D/g, ""),
            },
          }),
        }
      )

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        console.error("Erro ao processar pagamento:", errorData)
        
        // Mensagens de erro mais amigáveis
        let errorMessage = "Erro ao processar pagamento com cartão"
        
        if (errorData.errors) {
          const firstError = errorData.errors[0]
          if (firstError.description) {
            errorMessage = firstError.description
          } else if (firstError.code === "invalid_card") {
            errorMessage = "Cartão inválido. Verifique os dados do cartão."
          } else if (firstError.code === "card_declined") {
            errorMessage = "Cartão recusado. Entre em contato com seu banco."
          } else if (firstError.code === "insufficient_funds") {
            errorMessage = "Saldo insuficiente. Tente outro cartão."
          }
        }
        
        return NextResponse.json(
          { 
            error: errorMessage, 
            details: errorData 
          },
          { status: 400 }
        )
      }

      const paymentData = await paymentResponse.json()
      
      return NextResponse.json({
        success: true,
        subscription: subscriptionData,
        payment: paymentData,
        message: "Assinatura criada e pagamento processado com sucesso!"
      })
    }

    // 4. Se for PIX, retornar dados do PIX
    if (billingType === "PIX") {
      // Buscar a primeira cobrança da assinatura
      const paymentsResponse = await fetch(
        `${asaasBaseUrl}/payments?subscription=${subscriptionData.id}`,
        {
          headers: {
            "access_token": asaasApiKey,
          },
        }
      )

      if (paymentsResponse.ok) {
        const paymentsData = await paymentsResponse.json()
        const firstPayment = paymentsData.data[0]

        if (firstPayment) {
          // Gerar QR Code PIX
          const pixResponse = await fetch(
            `${asaasBaseUrl}/payments/${firstPayment.id}/pixQrCode`,
            {
              method: "GET",
              headers: {
                "access_token": asaasApiKey,
              },
            }
          )

          if (pixResponse.ok) {
            const pixData = await pixResponse.json()
            return NextResponse.json({
              success: true,
              subscription: subscriptionData,
              payment: firstPayment,
              pix: pixData,
              message: "Assinatura criada! Use o QR Code para pagar."
            })
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      subscription: subscriptionData,
      message: "Assinatura criada com sucesso!"
    })

  } catch (error) {
    console.error("Erro no processamento:", error)
    return NextResponse.json(
      { 
        error: "Erro interno no servidor. Tente novamente em alguns instantes.", 
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      },
      { status: 500 }
    )
  }
}
