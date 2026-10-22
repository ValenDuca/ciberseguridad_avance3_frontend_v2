# Santa Fe Capacita – Avance 3 / Frontend v2

Segundo incremento funcional construido a partir de los exports de Google Stitch.

## Qué incluye

- Presentación, registro, login y panel de módulos del incremento v1.
- Módulo 1 integrado con el diseño general de Stitch.
- Cuatro recursos navegables: material teórico, video, actividad y evaluación.
- Progreso del Módulo 1 persistido temporalmente en `localStorage`.
- Cada recurso tiene una ruta funcional preparada para reemplazarla por la interfaz definitiva exportada desde Stitch.
- Se eliminaron afirmaciones institucionales no respaldadas por el proyecto (leyes, acreditaciones, validez oficial, internos, etc.).
- El progreso inicia en `0 de 4`, no con contenido completado ficticiamente.
- No se agregó porcentaje mínimo de aprobación a la evaluación porque todavía no está formalmente definido.

## Importante

`localStorage` se utiliza únicamente para el prototipo incremental del frontend. La arquitectura aprobada contempla posteriormente backend Go + API REST + PostgreSQL.

## Ejecutar

```bash
npm install
npm run dev
```

Luego abrir la URL indicada por Vite.
