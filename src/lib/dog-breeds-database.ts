// Database completo de raças de cachorro com informações detalhadas

export interface DogBreed {
  id: string
  name: string
  nameEn: string
  category: 'toy' | 'small' | 'medium' | 'large' | 'giant'
  origin: string
  
  // Características físicas
  weight: {
    min: number
    max: number
    unit: 'kg'
  }
  height: {
    min: number
    max: number
    unit: 'cm'
  }
  lifeExpectancy: {
    min: number
    max: number
    unit: 'anos'
  }
  
  // Características comportamentais (1-5)
  temperament: {
    friendly: number
    energyLevel: number
    trainability: number
    goodWithKids: number
    goodWithPets: number
    barkingLevel: number
    sheddingLevel: number
  }
  
  // Informações detalhadas
  description: string
  characteristics: string[]
  healthConcerns: string[]
  groomingNeeds: string
  exerciseNeeds: string
  funFact: string
  
  // Premium features
  premiumContent: {
    dietRecommendations: string[]
    trainingTips: string[]
    commonHealthIssues: string[]
    vaccineSchedule: string[]
  }
}

export const dogBreedsDatabase: DogBreed[] = [
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    nameEn: 'Golden Retriever',
    category: 'large',
    origin: 'Escócia',
    weight: { min: 25, max: 34, unit: 'kg' },
    height: { min: 51, max: 61, unit: 'cm' },
    lifeExpectancy: { min: 10, max: 12, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 4,
      trainability: 5,
      goodWithKids: 5,
      goodWithPets: 5,
      barkingLevel: 2,
      sheddingLevel: 4
    },
    description: 'Extremamente inteligente, leal e afetuoso. Ótimo com crianças e outros animais. Necessita de exercícios diários e adora nadar!',
    characteristics: [
      'Pelagem dourada e densa',
      'Muito sociável e amigável',
      'Excelente cão de família',
      'Adora água e natação',
      'Inteligente e fácil de treinar'
    ],
    healthConcerns: [
      'Displasia de quadril',
      'Problemas cardíacos',
      'Câncer',
      'Problemas oculares'
    ],
    groomingNeeds: 'Escovação 2-3x por semana, banho mensal',
    exerciseNeeds: '60-90 minutos diários de atividade física',
    funFact: 'Golden Retrievers têm uma "boca macia" - podem carregar um ovo na boca sem quebrá-lo!',
    premiumContent: {
      dietRecommendations: [
        'Ração premium para raças grandes',
        '2-3 xícaras por dia divididas em 2 refeições',
        'Evitar exercícios logo após alimentação',
        'Suplementação de glucosamina para articulações'
      ],
      trainingTips: [
        'Comece o treinamento cedo (8 semanas)',
        'Use reforço positivo e petiscos',
        'Socialize desde filhote',
        'Treine comandos básicos: sentar, ficar, vir'
      ],
      commonHealthIssues: [
        'Displasia de quadril e cotovelo',
        'Problemas cardíacos hereditários',
        'Câncer (linfoma, hemangiosarcoma)',
        'Hipotireoidismo'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço V8/V10 + Raiva'
      ]
    }
  },
  {
    id: 'labrador-retriever',
    name: 'Labrador Retriever',
    nameEn: 'Labrador Retriever',
    category: 'large',
    origin: 'Canadá',
    weight: { min: 25, max: 36, unit: 'kg' },
    height: { min: 54, max: 62, unit: 'cm' },
    lifeExpectancy: { min: 10, max: 14, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 5,
      trainability: 5,
      goodWithKids: 5,
      goodWithPets: 5,
      barkingLevel: 3,
      sheddingLevel: 4
    },
    description: 'Cão extremamente versátil, amigável e energético. Excelente para famílias ativas. Adora nadar e buscar objetos.',
    characteristics: [
      'Pelagem curta e densa',
      'Muito ativo e brincalhão',
      'Excelente nadador',
      'Ótimo cão de trabalho',
      'Extremamente leal'
    ],
    healthConcerns: [
      'Obesidade',
      'Displasia de quadril',
      'Problemas oculares',
      'Alergias de pele'
    ],
    groomingNeeds: 'Escovação semanal, banho a cada 2 meses',
    exerciseNeeds: '60-90 minutos diários de exercício intenso',
    funFact: 'Labradores são a raça mais popular do mundo há mais de 30 anos!',
    premiumContent: {
      dietRecommendations: [
        'Controle rigoroso de porções (tendência à obesidade)',
        '2.5-3 xícaras de ração premium por dia',
        'Evitar petiscos em excesso',
        'Ômega-3 para pelagem saudável'
      ],
      trainingTips: [
        'Treinamento de obediência desde cedo',
        'Exercícios de busca e natação',
        'Socialização intensa',
        'Canalizar energia com atividades'
      ],
      commonHealthIssues: [
        'Obesidade (principal problema)',
        'Displasia coxofemoral',
        'Atrofia progressiva da retina',
        'Dermatites alérgicas'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'german-shepherd',
    name: 'Pastor Alemão',
    nameEn: 'German Shepherd',
    category: 'large',
    origin: 'Alemanha',
    weight: { min: 22, max: 40, unit: 'kg' },
    height: { min: 55, max: 65, unit: 'cm' },
    lifeExpectancy: { min: 9, max: 13, unit: 'anos' },
    temperament: {
      friendly: 4,
      energyLevel: 5,
      trainability: 5,
      goodWithKids: 4,
      goodWithPets: 3,
      barkingLevel: 4,
      sheddingLevel: 5
    },
    description: 'Inteligente, corajoso e leal. Excelente cão de guarda e trabalho. Requer treinamento consistente e socialização.',
    characteristics: [
      'Altamente inteligente',
      'Protetor da família',
      'Versátil em trabalhos',
      'Atlético e ágil',
      'Leal e obediente'
    ],
    healthConcerns: [
      'Displasia de quadril',
      'Mielopatia degenerativa',
      'Torção gástrica',
      'Alergias'
    ],
    groomingNeeds: 'Escovação 3-4x por semana, banho mensal',
    exerciseNeeds: '90-120 minutos diários de atividade',
    funFact: 'Pastores Alemães são a segunda raça mais inteligente do mundo!',
    premiumContent: {
      dietRecommendations: [
        'Ração para raças grandes e ativas',
        '3-4 xícaras por dia em 2 refeições',
        'Proteína de alta qualidade',
        'Suplementos para articulações'
      ],
      trainingTips: [
        'Treinamento de obediência obrigatório',
        'Socialização desde filhote',
        'Exercícios mentais diários',
        'Estabelecer liderança clara'
      ],
      commonHealthIssues: [
        'Displasia coxofemoral severa',
        'Mielopatia degenerativa (paralisia)',
        'Torção gástrica (emergência)',
        'Panosteíte (dor óssea)'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço + Leishmaniose (se área endêmica)'
      ]
    }
  },
  {
    id: 'bulldog-frances',
    name: 'Bulldog Francês',
    nameEn: 'French Bulldog',
    category: 'small',
    origin: 'França',
    weight: { min: 8, max: 14, unit: 'kg' },
    height: { min: 28, max: 33, unit: 'cm' },
    lifeExpectancy: { min: 10, max: 12, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 2,
      trainability: 3,
      goodWithKids: 5,
      goodWithPets: 4,
      barkingLevel: 2,
      sheddingLevel: 3
    },
    description: 'Companheiro afetuoso e brincalhão. Perfeito para apartamentos. Adora estar perto da família.',
    characteristics: [
      'Orelhas de morcego características',
      'Compacto e musculoso',
      'Muito afetuoso',
      'Baixa necessidade de exercício',
      'Ótimo para apartamentos'
    ],
    healthConcerns: [
      'Problemas respiratórios',
      'Sensibilidade ao calor',
      'Problemas de coluna',
      'Alergias de pele'
    ],
    groomingNeeds: 'Escovação semanal, limpeza de dobras diária',
    exerciseNeeds: '30-45 minutos diários de caminhada leve',
    funFact: 'Bulldogs Franceses não sabem nadar devido à sua estrutura corporal!',
    premiumContent: {
      dietRecommendations: [
        'Ração para raças pequenas',
        '1-1.5 xícaras por dia',
        'Evitar alimentos que causam gases',
        'Controle de peso rigoroso'
      ],
      trainingTips: [
        'Paciência no treinamento (teimosos)',
        'Reforço positivo constante',
        'Sessões curtas de treino',
        'Evitar exercícios em calor'
      ],
      commonHealthIssues: [
        'Síndrome braquicefálica (respiração)',
        'Hérnia de disco',
        'Alergias alimentares e de pele',
        'Problemas oculares (olho seco)'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'poodle',
    name: 'Poodle',
    nameEn: 'Poodle',
    category: 'medium',
    origin: 'França/Alemanha',
    weight: { min: 20, max: 32, unit: 'kg' },
    height: { min: 45, max: 60, unit: 'cm' },
    lifeExpectancy: { min: 12, max: 15, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 4,
      trainability: 5,
      goodWithKids: 5,
      goodWithPets: 4,
      barkingLevel: 3,
      sheddingLevel: 1
    },
    description: 'Extremamente inteligente e elegante. Hipoalergênico. Excelente para famílias e pessoas com alergias.',
    characteristics: [
      'Pelagem encaracolada hipoalergênica',
      'Muito inteligente',
      'Elegante e atlético',
      'Versátil em tamanhos',
      'Fácil de treinar'
    ],
    healthConcerns: [
      'Problemas oculares',
      'Displasia de quadril',
      'Epilepsia',
      'Doença de Addison'
    ],
    groomingNeeds: 'Tosa profissional a cada 6-8 semanas, escovação diária',
    exerciseNeeds: '60 minutos diários de atividade',
    funFact: 'Poodles são a segunda raça mais inteligente, perdendo apenas para Border Collies!',
    premiumContent: {
      dietRecommendations: [
        'Ração premium para raças médias',
        '2-2.5 xícaras por dia',
        'Alimentos ricos em ômega para pelagem',
        'Evitar alimentos com corantes'
      ],
      trainingTips: [
        'Aprende comandos rapidamente',
        'Precisa de estímulo mental constante',
        'Excelente para truques e agilidade',
        'Socialização importante'
      ],
      commonHealthIssues: [
        'Atrofia progressiva da retina',
        'Luxação patelar',
        'Epilepsia idiopática',
        'Hipotireoidismo'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'shih-tzu',
    name: 'Shih Tzu',
    nameEn: 'Shih Tzu',
    category: 'toy',
    origin: 'China',
    weight: { min: 4, max: 7, unit: 'kg' },
    height: { min: 20, max: 28, unit: 'cm' },
    lifeExpectancy: { min: 10, max: 16, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 2,
      trainability: 3,
      goodWithKids: 4,
      goodWithPets: 5,
      barkingLevel: 3,
      sheddingLevel: 2
    },
    description: 'Companheiro afetuoso e carinhoso. Perfeito para apartamentos. Adora colo e atenção.',
    characteristics: [
      'Pelagem longa e sedosa',
      'Muito afetuoso',
      'Companheiro ideal',
      'Baixa necessidade de exercício',
      'Ótimo para idosos'
    ],
    healthConcerns: [
      'Problemas oculares',
      'Problemas respiratórios',
      'Problemas dentários',
      'Luxação patelar'
    ],
    groomingNeeds: 'Escovação diária, banho quinzenal, tosa mensal',
    exerciseNeeds: '20-30 minutos diários de caminhada',
    funFact: 'Shih Tzu significa "cão leão" em chinês!',
    premiumContent: {
      dietRecommendations: [
        'Ração para raças pequenas',
        '0.5-1 xícara por dia',
        'Alimentos de fácil mastigação',
        'Evitar alimentos duros'
      ],
      trainingTips: [
        'Paciência no treinamento',
        'Reforço positivo constante',
        'Socialização desde cedo',
        'Treinamento de higiene importante'
      ],
      commonHealthIssues: [
        'Úlceras de córnea',
        'Síndrome braquicefálica leve',
        'Doença periodontal',
        'Luxação de patela'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'yorkshire-terrier',
    name: 'Yorkshire Terrier',
    nameEn: 'Yorkshire Terrier',
    category: 'toy',
    origin: 'Inglaterra',
    weight: { min: 2, max: 3, unit: 'kg' },
    height: { min: 18, max: 23, unit: 'cm' },
    lifeExpectancy: { min: 13, max: 16, unit: 'anos' },
    temperament: {
      friendly: 4,
      energyLevel: 4,
      trainability: 4,
      goodWithKids: 3,
      goodWithPets: 3,
      barkingLevel: 5,
      sheddingLevel: 1
    },
    description: 'Pequeno mas corajoso. Muito ativo e alerta. Excelente cão de companhia para quem busca um pet compacto.',
    characteristics: [
      'Pelagem longa e sedosa',
      'Muito corajoso',
      'Alerta e vigilante',
      'Compacto e portátil',
      'Hipoalergênico'
    ],
    healthConcerns: [
      'Luxação patelar',
      'Problemas dentários',
      'Hipoglicemia',
      'Colapso traqueal'
    ],
    groomingNeeds: 'Escovação diária, banho quinzenal',
    exerciseNeeds: '30 minutos diários de atividade',
    funFact: 'Yorkies eram originalmente criados para caçar ratos em minas de carvão!',
    premiumContent: {
      dietRecommendations: [
        'Ração para raças toy',
        '0.25-0.5 xícara por dia',
        'Refeições frequentes (3-4x/dia)',
        'Evitar hipoglicemia'
      ],
      trainingTips: [
        'Estabelecer limites desde cedo',
        'Socialização importante',
        'Controlar latidos excessivos',
        'Treinamento de higiene'
      ],
      commonHealthIssues: [
        'Luxação de patela',
        'Doença periodontal severa',
        'Hipoglicemia (filhotes)',
        'Colapso de traqueia'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'beagle',
    name: 'Beagle',
    nameEn: 'Beagle',
    category: 'medium',
    origin: 'Inglaterra',
    weight: { min: 9, max: 11, unit: 'kg' },
    height: { min: 33, max: 41, unit: 'cm' },
    lifeExpectancy: { min: 12, max: 15, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 5,
      trainability: 3,
      goodWithKids: 5,
      goodWithPets: 5,
      barkingLevel: 5,
      sheddingLevel: 3
    },
    description: 'Alegre, curioso e amigável. Excelente farejador. Ótimo com crianças e outros pets.',
    characteristics: [
      'Excelente olfato',
      'Muito sociável',
      'Energético e brincalhão',
      'Ótimo com famílias',
      'Voz característica'
    ],
    healthConcerns: [
      'Obesidade',
      'Epilepsia',
      'Hipotireoidismo',
      'Problemas de disco'
    ],
    groomingNeeds: 'Escovação semanal, banho mensal',
    exerciseNeeds: '60 minutos diários de exercício',
    funFact: 'Beagles têm 220 milhões de receptores olfativos - humanos têm apenas 5 milhões!',
    premiumContent: {
      dietRecommendations: [
        'Controle rigoroso de porções',
        '1-1.5 xícaras por dia',
        'Evitar petiscos em excesso',
        'Alimentos baixos em calorias'
      ],
      trainingTips: [
        'Paciência (podem ser teimosos)',
        'Treinamento com recompensas',
        'Exercícios de farejamento',
        'Socialização importante'
      ],
      commonHealthIssues: [
        'Obesidade (principal risco)',
        'Epilepsia idiopática',
        'Hipotireoidismo',
        'Doença do disco intervertebral'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'rottweiler',
    name: 'Rottweiler',
    nameEn: 'Rottweiler',
    category: 'large',
    origin: 'Alemanha',
    weight: { min: 35, max: 60, unit: 'kg' },
    height: { min: 56, max: 69, unit: 'cm' },
    lifeExpectancy: { min: 8, max: 10, unit: 'anos' },
    temperament: {
      friendly: 3,
      energyLevel: 4,
      trainability: 5,
      goodWithKids: 4,
      goodWithPets: 2,
      barkingLevel: 3,
      sheddingLevel: 4
    },
    description: 'Poderoso, leal e protetor. Excelente cão de guarda. Requer treinamento firme e socialização.',
    characteristics: [
      'Muito forte e musculoso',
      'Extremamente leal',
      'Excelente guardião',
      'Confiante e corajoso',
      'Inteligente'
    ],
    healthConcerns: [
      'Displasia de quadril',
      'Problemas cardíacos',
      'Câncer ósseo',
      'Torção gástrica'
    ],
    groomingNeeds: 'Escovação semanal, banho mensal',
    exerciseNeeds: '60-90 minutos diários de exercício',
    funFact: 'Rottweilers eram usados para puxar carroças de açougueiros na Alemanha medieval!',
    premiumContent: {
      dietRecommendations: [
        'Ração para raças grandes',
        '4-6 xícaras por dia',
        'Proteína de alta qualidade',
        'Suplementos para articulações'
      ],
      trainingTips: [
        'Treinamento obrigatório desde cedo',
        'Socialização intensiva',
        'Liderança firme e consistente',
        'Exercícios mentais diários'
      ],
      commonHealthIssues: [
        'Displasia coxofemoral',
        'Cardiomiopatia dilatada',
        'Osteossarcoma (câncer ósseo)',
        'Torção gástrica'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  },
  {
    id: 'boxer',
    name: 'Boxer',
    nameEn: 'Boxer',
    category: 'large',
    origin: 'Alemanha',
    weight: { min: 25, max: 32, unit: 'kg' },
    height: { min: 53, max: 63, unit: 'cm' },
    lifeExpectancy: { min: 10, max: 12, unit: 'anos' },
    temperament: {
      friendly: 5,
      energyLevel: 5,
      trainability: 4,
      goodWithKids: 5,
      goodWithPets: 4,
      barkingLevel: 3,
      sheddingLevel: 3
    },
    description: 'Brincalhão, energético e leal. Excelente com crianças. Mantém espírito jovem por toda vida.',
    characteristics: [
      'Muito brincalhão',
      'Energético e atlético',
      'Protetor da família',
      'Paciente com crianças',
      'Expressivo e comunicativo'
    ],
    healthConcerns: [
      'Problemas cardíacos',
      'Câncer',
      'Displasia de quadril',
      'Alergias'
    ],
    groomingNeeds: 'Escovação semanal, banho mensal',
    exerciseNeeds: '60-90 minutos diários de exercício intenso',
    funFact: 'Boxers são conhecidos como "eternos filhotes" devido ao seu comportamento brincalhão!',
    premiumContent: {
      dietRecommendations: [
        'Ração para raças grandes e ativas',
        '3-4 xícaras por dia',
        'Proteína de qualidade',
        'Evitar exercícios após refeições'
      ],
      trainingTips: [
        'Canalizar energia com exercícios',
        'Treinamento consistente',
        'Socialização importante',
        'Paciência com teimosia'
      ],
      commonHealthIssues: [
        'Cardiomiopatia arritmogênica',
        'Câncer (linfoma, mastocitoma)',
        'Displasia de quadril',
        'Alergias alimentares e de pele'
      ],
      vaccineSchedule: [
        '6-8 semanas: V8 ou V10 (1ª dose)',
        '12 semanas: V8 ou V10 (2ª dose)',
        '16 semanas: V8 ou V10 (3ª dose) + Raiva',
        'Anual: Reforço completo'
      ]
    }
  }
]

// Função para buscar raça por ID
export function getBreedById(id: string): DogBreed | undefined {
  return dogBreedsDatabase.find(breed => breed.id === id)
}

// Função para buscar raças por categoria
export function getBreedsByCategory(category: DogBreed['category']): DogBreed[] {
  return dogBreedsDatabase.filter(breed => breed.category === category)
}

// Função para buscar raças por nome
export function searchBreedsByName(query: string): DogBreed[] {
  const lowerQuery = query.toLowerCase()
  return dogBreedsDatabase.filter(
    breed => 
      breed.name.toLowerCase().includes(lowerQuery) ||
      breed.nameEn.toLowerCase().includes(lowerQuery)
  )
}

// Função para obter todas as raças
export function getAllBreeds(): DogBreed[] {
  return dogBreedsDatabase
}

// Função para simular identificação de raça por imagem
export function identifyBreedFromImage(): DogBreed {
  // Em produção, isso seria uma chamada para API de IA
  // Por enquanto, retorna uma raça aleatória
  const randomIndex = Math.floor(Math.random() * dogBreedsDatabase.length)
  return dogBreedsDatabase[randomIndex]
}
