// frontend/src/utils/modalidadesInfo.ts

export interface ModalidadInfo {
  name: string;
  description: string;
  characteristics: string[];
  typicalValue: string;
  whenUsed: string;
}

export const modalidadesInfo: Record<string, ModalidadInfo> = {
  'Licitación pública': {
    name: 'Licitación Pública',
    description: 'Proceso mediante el cual las entidades estatales seleccionan la oferta más favorable para la celebración de contratos de obra, bienes o servicios de mayor cuantía.',
    characteristics: [
      'Procedimiento público y abierto',
      'Cualquier interesado puede participar',
      'Se utiliza para contratos de mayor valor',
      'Requiere publicación en el SECOP'
    ],
    typicalValue: 'Superior a 1.000 SMMLV (~$1.000 millones COP)',
    whenUsed: 'Contratos de gran envergadura, obras públicas, adquisiciones de bienes y servicios de alto valor.'
  },
  'Selección Abreviada de Menor Cuantía': {
    name: 'Selección Abreviada de Menor Cuantía',
    description: 'Modalidad simplificada para contratos de menor valor que busca agilizar el proceso de selección.',
    characteristics: [
      'Procedimiento simplificado',
      'Plazos más cortos',
      'Menores requisitos documentales',
      'Puede limitarse a proveedores inscritos'
    ],
    typicalValue: 'Entre 50 y 1.000 SMMLV (~$50M - $1.000M COP)',
    whenUsed: 'Contratos de mediana cuantía donde se requiere celeridad.'
  },
  'Concurso de méritos abierto': {
    name: 'Concurso de Méritos Abierto',
    description: 'Modalidad para seleccionar consultores o proyectos que requieren evaluación de aspectos técnicos y cualitativos.',
    characteristics: [
      'Evaluación técnica cualitativa',
      'Abierto a todos los interesados',
      'Comparación de hojas de vida y propuestas',
      'Puntúa experiencia y formación'
    ],
    typicalValue: 'Variable según complejidad',
    whenUsed: 'Consultorías, interventorías, estudios, diseños, proyectos arquitectónicos.'
  },
  'Concurso de méritos con precalificación': {
    name: 'Concurso de Méritos con Precalificación',
    description: 'Modalidad de dos fases donde primero se preseleccionan los oferentes calificados.',
    characteristics: [
      'Fase de precalificación (verificación de requisitos)',
      'Solo precalificados presentan oferta técnica',
      'Evaluación más rigurosa',
      'Mayor seguridad en la selección'
    ],
    typicalValue: 'Proyectos de alta complejidad',
    whenUsed: 'Proyectos especializados que requieren experiencia demostrada (megaproyectos, consultoría compleja).'
  },
  'Contratación directa': {
    name: 'Contratación Directa',
    description: 'Modalidad sin competencia que permite seleccionar directamente a un contratista bajo causales específicas.',
    characteristics: [
      'No requiere proceso de selección',
      'Solo aplica causales legales específicas',
      'Menor transparencia (regulada)',
      'Procedimiento más rápido'
    ],
    typicalValue: 'Cualquier cuantía (con justificación)',
    whenUsed: 'Urgencia manifiesta, única oferta, contratos interadministrativos, prestación de servicios profesionales.'
  },
  'Contratación Directa (con ofertas)': {
    name: 'Contratación Directa (con ofertas)',
    description: 'Variante de contratación directa donde se solicitan ofertas a varios proveedores.',
    characteristics: [
      'Se invita a mínimo 3 proveedores',
      'Comparación de ofertas',
      'Más competitivo que contratación directa simple',
      'Procedimiento ágil'
    ],
    typicalValue: 'Media a alta',
    whenUsed: 'Cuando siendo causal de contratación directa, se busca fomentar la competencia.'
  },
  'Contratación régimen especial': {
    name: 'Contratación Régimen Especial',
    description: 'Aplicable a entidades con normas especiales (universidades públicas, corporaciones autónomas, etc.).',
    characteristics: [
      'Normas particulares según entidad',
      'Mayor flexibilidad',
      'Procedimientos internos',
      'Sujeto a regulación especial'
    ],
    typicalValue: 'Variable',
    whenUsed: 'Contratos de entidades con régimen especial (universidades públicas, fondos mixtos, etc.).'
  },
  'Mínima cuantía': {
    name: 'Mínima Cuantía',
    description: 'Modalidad más simple para contratos de muy bajo valor, sin necesidad de proceso competitivo.',
    characteristics: [
      'Procedimiento más ágil',
      'Sin publicidad (solo registros internos)',
      'No requiere garantías',
      'Contratos de bajo riesgo'
    ],
    typicalValue: 'Hasta 50 SMMLV (~$50 millones COP)',
    whenUsed: 'Contratos de bajo valor, compras menores, servicios ocasionales, mantenimiento sencillo.'
  },
  'Selección abreviada subasta inversa': {
    name: 'Selección Abreviada - Subasta Inversa',
    description: 'Modalidad donde los proveedores pujan hacia abajo para ofrecer el precio más bajo.',
    characteristics: [
      'Competencia por precio',
      'Mecanismo de puja electrónica',
      'Gana la oferta más baja',
      'Proceso transparente'
    ],
    typicalValue: 'Bienes y servicios estandarizados',
    whenUsed: 'Bienes de características técnicas uniformes (canasta familiar, medicamentos, insumos, etc.).'
  }
};

// Función para obtener información de una modalidad
export const getModalidadInfo = (modalidadName: string): ModalidadInfo | null => {
  // Búsqueda exacta
  if (modalidadesInfo[modalidadName]) {
    return modalidadesInfo[modalidadName];
  }
  
  // Búsqueda parcial (por si hay variaciones en el nombre)
  for (const [key, value] of Object.entries(modalidadesInfo)) {
    if (modalidadName.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(modalidadName.toLowerCase())) {
      return value;
    }
  }
  
  return null;
};