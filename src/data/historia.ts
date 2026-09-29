// Historia (línea de tiempo) y certificaciones de "Quiénes somos".
// `ejemplo: true` = contenido de muestra para que la jefatura vea cómo queda: el sitio lo marca
// como "Ejemplo" y se reemplaza por el real (o se borra) cuando la empresa lo entregue.
// `revisar` = dato real pero por confirmar.
import { empresa } from './empresa';

export interface Hito {
  anio: string;
  titulo: string;
  texto: string;
  ejemplo?: boolean;
  revisar?: string;
}

const fundacion = 2026 - empresa.anios;

export const hitos: Hito[] = [
  {
    anio: String(fundacion),
    titulo: `Nace ${empresa.nombreCorto}`,
    texto: 'Comienza su trabajo en el área de la construcción.',
    revisar: `año exacto de fundación (calculado con los ${empresa.anios} años)`,
  },
  {
    anio: 'Años 2000',
    titulo: 'Primeras grandes obras',
    texto: 'Obras de mayor envergadura consolidan a la empresa en Santiago.',
    ejemplo: true,
  },
  {
    anio: 'Años 2010',
    titulo: 'Nuevas especialidades',
    texto: 'A la obra civil se suman electricidad, voz y datos y montaje industrial.',
    ejemplo: true,
  },
  {
    anio: '2026',
    titulo: `${empresa.anios} años`,
    texto: `Tres décadas de obras. ${empresa.directrices}`,
  },
];

export interface Certificacion {
  nombre: string;
  area: string;
  texto: string;
  ejemplo?: boolean;
}

export const certificaciones: Certificacion[] = [
  {
    nombre: 'ISO 9001',
    area: 'Gestión de calidad',
    texto: 'Procesos de obra documentados y auditados cada año por un organismo certificador externo.',
    ejemplo: true,
  },
];
