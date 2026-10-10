import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';

// GitHub Pages devuelve 404.html en rutas directas. Al duplicar el documento
// principal, Angular puede recuperar la URL y resolverla mediante su router.
const output = join('dist', 'cancha-central-angular', 'browser');
await copyFile(join(output, 'index.html'), join(output, '404.html'));
