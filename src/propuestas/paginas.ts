// Qué componente dibuja cada página en cada propuesta. Lo usa la ruta única del sitio
// (src/pages/[...ruta].astro). Va aparte de registro.ts para no crear imports circulares.

import type { Pagina } from '../data/rutas';

import PlanoInicio from './plano/paginas/index.astro';
import PlanoQuienes from './plano/paginas/quienes-somos.astro';
import PlanoServicios from './plano/paginas/nuestros-servicios.astro';
import PlanoTerminados from './plano/paginas/proyectos-terminados.astro';
import PlanoConstruccion from './plano/paginas/proyectos-en-construccion.astro';
import PlanoContacto from './plano/paginas/contacto.astro';
import PlanoPrivacidad from './plano/paginas/politica-de-privacidad.astro';
import PlanoTrabaja from './plano/paginas/trabaja-con-nosotros.astro';
import PlanoDenuncias from './plano/paginas/canal-de-denuncias.astro';
import PlanoMaquinaria from './plano/paginas/maquinaria-y-equipos.astro';

import PanoInicio from './panoramica/paginas/index.astro';
import PanoQuienes from './panoramica/paginas/quienes-somos.astro';
import PanoServicios from './panoramica/paginas/nuestros-servicios.astro';
import PanoTerminados from './panoramica/paginas/proyectos-terminados.astro';
import PanoConstruccion from './panoramica/paginas/proyectos-en-construccion.astro';
import PanoContacto from './panoramica/paginas/contacto.astro';
import PanoPrivacidad from './panoramica/paginas/politica-de-privacidad.astro';
import PanoObra from './panoramica/paginas/obra.astro';
import PanoTrabaja from './panoramica/paginas/trabaja-con-nosotros.astro';
import PanoDenuncias from './panoramica/paginas/canal-de-denuncias.astro';
import PanoMaquinaria from './panoramica/paginas/maquinaria-y-equipos.astro';

type Componente = typeof PlanoInicio;

export const paginasDe: Record<string, Record<Pagina, Componente>> = {
  plano: {
    inicio: PlanoInicio,
    quienes: PlanoQuienes,
    servicios: PlanoServicios,
    terminados: PlanoTerminados,
    construccion: PlanoConstruccion,
    contacto: PlanoContacto,
    privacidad: PlanoPrivacidad,
    trabaja: PlanoTrabaja,
    denuncias: PlanoDenuncias,
    maquinaria: PlanoMaquinaria,
  },
  panoramica: {
    inicio: PanoInicio,
    quienes: PanoQuienes,
    servicios: PanoServicios,
    terminados: PanoTerminados,
    construccion: PanoConstruccion,
    contacto: PanoContacto,
    privacidad: PanoPrivacidad,
    trabaja: PanoTrabaja,
    denuncias: PanoDenuncias,
    maquinaria: PanoMaquinaria,
  },
};

/** ficha de obra (/proyectos-terminados/<slug>/) de las propuestas que la tienen */
export const fichasDe: Record<string, Componente> = {
  panoramica: PanoObra,
};
