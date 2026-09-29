// Límites de los archivos que se pueden adjuntar en los formularios.
// Pensados para que quepan en un correo si las solicitudes llegan con adjuntos (Gmail y Outlook
// aceptan 20 a 25 MB por mensaje). Si los archivos se guardan en el servidor y el correo solo
// avisa, se pueden subir. El hosting también tiene su tope: cPanel → MultiPHP INI Editor →
// upload_max_filesize y post_max_size deben ser al menos maxTotal.

const MB = 1024 * 1024;

export interface LimitesAdjuntos {
  /** tamaño máximo de cada archivo, en bytes */
  maxArchivo: number;
  maxArchivos: number;
  /** suma máxima de todos los archivos, en bytes */
  maxTotal: number;
  /** extensiones aceptadas (atributo accept del input) */
  tipos: string;
  /** achicar las fotos JPEG en el navegador antes de enviarlas */
  achicarFotos: boolean;
  /** volver a guardar TODA foto JPEG, aunque sea chica: así pierde sus metadatos (ubicación GPS,
   *  modelo del teléfono, fecha), que podrían delatar a quien denuncia de forma anónima */
  limpiarFotos?: boolean;
}

/** planos y fotos en "Cuéntenos su proyecto" */
export const adjuntosProyecto: LimitesAdjuntos = {
  maxArchivo: 10 * MB,
  maxArchivos: 5,
  maxTotal: 20 * MB,
  tipos: '.pdf,.jpg,.jpeg,.png,.heic,.dwg,.zip',
  achicarFotos: true,
};

/** CV en "Trabaja con nosotros" */
export const adjuntoCv: LimitesAdjuntos = {
  maxArchivo: 5 * MB,
  maxArchivos: 1,
  maxTotal: 5 * MB,
  tipos: '.pdf,.doc,.docx',
  achicarFotos: false,
};

/** evidencia en el canal de denuncias */
export const adjuntosDenuncia: LimitesAdjuntos = {
  maxArchivo: 10 * MB,
  maxArchivos: 5,
  maxTotal: 20 * MB,
  tipos: '.pdf,.jpg,.jpeg,.png,.heic,.doc,.docx,.mp3,.m4a,.mp4',
  achicarFotos: true,
  limpiarFotos: true,
};

/** "10 MB" */
export const mb = (bytes: number) => `${Math.round(bytes / MB)} MB`;
