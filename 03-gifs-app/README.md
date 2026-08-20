# Gifs App

Aplicación web de Angular para explorar GIFs. Cuenta con un panel principal, navegación lateral, una vista de tendencias y una vista de búsqueda en preparación.

## Tecnologías

- Angular 22 con componentes *standalone* y carga diferida de páginas.
- TypeScript 6.
- Tailwind CSS 4 mediante PostCSS.
- Angular Router.
- Vitest y JSDOM para pruebas unitarias.
- API de Giphy: el proyecto incluye sus tipos y la base de un servicio HTTP.

## Requisitos

- Node.js compatible con Angular 22.
- npm 10 (el proyecto declara `npm@10.9.8`).

## Instalación y ejecución

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. La ruta inicial redirige automáticamente a `/dashboard/trending`.

En PowerShell, si la política de ejecución bloquea `npm`, utiliza `npm.cmd` en lugar de `npm`.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la compilación de producción en `dist/gifs-app/`. |
| `npm run watch` | Compila en modo desarrollo y observa cambios. |
| `npm test` | Ejecuta las pruebas unitarias con Vitest. |
| `npm run ng -- <comando>` | Ejecuta un comando de Angular CLI. |

## Rutas

| Ruta | Página | Descripción |
| --- | --- | --- |
| `/dashboard/trending` | `TrendingPage` | Muestra una cuadrícula de GIFs de ejemplo. |
| `/dashboard/search` | `SearchPage` | Vista reservada para el buscador. |
| `/dashboard` y cualquier ruta hija desconocida | Redirección | Redirige a `trending`. |
| Cualquier ruta desconocida | Redirección | Redirige a `/dashboard/trending`. |

Las tres páginas se cargan de forma diferida (*lazy loading*).

## Estructura del proyecto

```text
src/
├── app/
│   ├── app.ts, app.html, app.config.ts, app.routes.ts
│   └── gifs/
│       ├── components/
│       │   ├── gifs-list/              # Cuadrícula y tarjeta individual de GIF
│       │   └── side-menu/              # Menú, cabecera y enlaces de navegación
│       ├── interfaces/
│       │   └── giphy.interfaces.ts     # Contrato tipado de la respuesta de Giphy
│       ├── pages/
│       │   ├── dashboard-page/         # Contenedor con menú lateral y router-outlet
│       │   ├── trending-page/          # Tendencias
│       │   └── search-page/            # Búsqueda
│       └── services/
│           └── gifs.services.ts        # Base del servicio para Giphy
├── environments/                        # Configuración de entorno
├── main.ts                              # Arranque de la aplicación
└── styles.css                           # Entrada global de Tailwind CSS
```

## Componentes

- `App`: componente raíz que contiene el `router-outlet`.
- `DashboardPage`: diseño principal; muestra el menú lateral y la página hija activa.
- `SideMenuHeader`: presenta el nombre y eslogan definidos en el entorno.
- `SideMenuOpctions`: enlaces a Tendencias y Buscador con estado activo.
- `GifListComponent`: recibe un arreglo obligatorio de URLs mediante el input `gifs` y lo recorre.
- `GifsListItem`: recibe una URL obligatoria mediante `imageUrl` y muestra la imagen.
- `TrendingPage`: actualmente suministra una colección estática de imágenes de demostración a `GifListComponent`.
- `SearchPage`: marcador de posición de la funcionalidad de búsqueda.

## Integración con Giphy

El archivo `src/app/gifs/interfaces/giphy.interfaces.ts` declara el contrato de la respuesta de Giphy, incluidos `GiphyResponse`, `GiphyItem`, `Images`, `Meta`, `Pagination`, `User`, las clasificaciones de contenido y los formatos de imagen disponibles.

`GifService` contiene la base de una solicitud a `GET /gifs/trending`, con `api_key` y límite de 20 resultados. La página de tendencias aún utiliza imágenes estáticas; conectar la respuesta del servicio a la interfaz es trabajo pendiente.

La configuración de Giphy se encuentra en:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Ambos archivos contienen `giphyUrl` y `giphyApiKey`. No incluyas claves privadas en repositorios públicos: para un proyecto desplegable, usa un mecanismo de configuración seguro para las credenciales.

## Estilos y recursos

- Tailwind se importa desde `src/styles.css`.
- La configuración de PostCSS está en `.postcssrc.json`.
- El menú utiliza iconos de Font Awesome cargados desde el documento principal (`src/index.html`).
- Los recursos estáticos se sirven desde `public/`.

## Pruebas

La configuración de pruebas usa el constructor `@angular/build:unit-test`, Vitest y JSDOM. Las pruebas actuales verifican que el componente raíz se cree y contenga el `router-outlet`.

```bash
npm test
```

## Configuración de compilación

`angular.json` define las configuraciones `production` y `development`. Producción activa el hash de archivos y límites de tamaño de 500 kB (advertencia) y 1 MB (error) para el paquete inicial. Desarrollo desactiva la optimización y genera mapas de origen.
