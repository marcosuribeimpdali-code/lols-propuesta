// Fotos aéreas (dron) de EJEMPLO: stock de Unsplash (licencia libre), marcadas "Imagen referencial"
// en el sitio. Las pidió Marcos (30-09-2026) para que el sitio muestre tomas con dron mientras no
// haya de las obras de LOLS. Para cambiar una: reemplazar el archivo en src/assets/dron/ (mismo
// nombre) y poner `credito: null` (si es de LOLS, la marca de referencial desaparece sola).
import type { ImageMetadata } from 'astro';
import obraGrua from '../assets/dron/obra-grua.jpg';
import obraCiudad from '../assets/dron/obra-ciudad.jpg';
import cenital from '../assets/dron/cenital-edificios.jpg';
import obraTrabajadores from '../assets/dron/obra-trabajadores.jpg';
import edificioGruaRoja from '../assets/dron/edificio-grua-roja.jpg';

export interface FotoDron {
  img: ImageMetadata;
  alt: string;
  /** autor si es de stock; null = foto de LOLS */
  credito: string | null;
}

export const dron = {
  /** Quiénes somos, vista previa al compartir y portada de la presentación */
  obraGrua: { img: obraGrua, alt: 'Vista aérea de una obra en construcción con grúa torre', credito: 'Centar MURID / Unsplash' },
  /** Proyectos en ejecución */
  obraCiudad: { img: obraCiudad, alt: 'Vista aérea de una obra en la ciudad con grúas torre', credito: 'CHUTTERSNAP / Unsplash' },
  /** fondo del llamado "Conversemos su próximo proyecto" */
  cenital: { img: cenital, alt: 'Vista cenital de edificios en construcción', credito: 'Ivan Bandura / Unsplash' },
  /** Trabaja con nosotros */
  obraTrabajadores: { img: obraTrabajadores, alt: 'Vista aérea de trabajadores en una obra con grúas', credito: 'Jamie Street / Unsplash' },
  /** Proyectos finalizados */
  edificioGruaRoja: { img: edificioGruaRoja, alt: 'Vista cenital de un edificio en obra con una grúa roja', credito: 'Eli Williams / Unsplash' },
} satisfies Record<string, FotoDron>;
