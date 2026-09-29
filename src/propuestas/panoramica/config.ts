import { enlazador } from '../../data/rutas';
import { principal } from '../registro';

export const SLUG = 'panoramica';
/** prefijo de esta propuesta en el sitio: '' cuando es la principal (ver registro.ts) */
export const BASE = principal === SLUG ? '' : `/${SLUG}`;
export const r = enlazador(BASE);
