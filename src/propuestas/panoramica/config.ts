import { enlazador } from '../../data/rutas';
import { principal } from '../registro';

export const SLUG = 'panoramica';
/** prefijo de esta propuesta en el sitio: '' cuando es la principal (ver registro.ts) */
export const BASE = principal === SLUG ? '' : `/${SLUG}`;
export const r = enlazador(BASE);

/** ficha de una obra finalizada (misma URL que su subpágina del sitio de 2018) */
/** ficha de una obra: /proyectos-terminados/<slug>/ o /proyectos-en-construccion/<slug>/ */
export const rObra = (slug: string, estado: 'terminado' | 'en-construccion' = 'terminado') =>
  r(estado === 'terminado' ? 'terminados' : 'construccion', `${slug}/`);
