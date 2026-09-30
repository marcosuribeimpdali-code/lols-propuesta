// Páginas del sitio. Son las mismas URLs que Google tiene indexadas de lols.cl, así que la
// propuesta elegida se podrá publicar en la raíz sin redirecciones.
//
// Cada propuesta vive bajo su propio prefijo (/plano/, /panoramica/…). Todos los enlaces
// internos se arman con `enlazador(BASE)`: para pasar una propuesta a la raíz basta con dejar
// su BASE en '' y mover sus páginas a src/pages/.

export const paginas = {
  inicio: '',
  quienes: 'quienes-somos/',
  servicios: 'nuestros-servicios/',
  maquinaria: 'capacidad-tecnica/',
  terminados: 'proyectos-terminados/',
  construccion: 'proyectos-en-construccion/',
  contacto: 'contacto/',
  privacidad: 'politica-de-privacidad/',
  trabaja: 'trabaja-con-nosotros/',
} as const;

export type Pagina = keyof typeof paginas;

export const enlazador =
  (base: string) =>
  (pagina: Pagina, ancla = '') =>
    `${base}/${paginas[pagina]}${ancla}`;
