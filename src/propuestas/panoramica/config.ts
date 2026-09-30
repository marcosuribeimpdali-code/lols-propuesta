import { enlazador } from '../../data/rutas';
import { principal } from '../registro';
import { paginaDe, type Estado } from '../../data/proyectos';

export const SLUG = 'panoramica';
/** prefijo de esta propuesta en el sitio: '' cuando es la principal (ver registro.ts) */
export const BASE = principal === SLUG ? '' : `/${SLUG}`;
export const r = enlazador(BASE);

/** ficha de una obra: /proyectos-terminados/<slug>/ (misma URL que su subpágina del sitio de 2018),
 *  /proyectos-en-construccion/<slug>/ o /proyectos-futuros/<slug>/ */
export const rObra = (slug: string, estado: Estado = 'terminado') => r(paginaDe[estado], `${slug}/`);
