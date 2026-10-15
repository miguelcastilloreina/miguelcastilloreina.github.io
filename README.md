# Sitio web · Miguel Ángel Castillo-Reina

Sitio académico estático y bilingüe hecho con [Astro](https://astro.build). Se publica gratis en GitHub Pages.

- Inglés: `https://miguelcastilloreina.github.io/`
- Español: `https://miguelcastilloreina.github.io/es/`

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, frase de portada, bio, intereses, fecha y archivos del CV, novedades, enlaces, email | `src/data/profile.yaml` |
| Página About / Sobre mí (formación, experiencia, premios, afiliaciones, herramientas) | `src/data/about.yaml` |
| Publicaciones (y cuáles salen en portada) | `src/data/publications.yaml` |
| Trabajo en curso y líneas de investigación | `src/data/projects.yaml` |
| Galería de Actividad (talleres, congresos, fotos y presentaciones en PDF) | `src/data/activity.yaml`, fotos en `public/img/activity/`, PDF en `public/activity/slides/` |
| CV en PDF | `public/cv/castillo-reina-cv-en.pdf` y `public/cv/castillo-reina-cv-es.pdf` (reemplaza el archivo con el mismo nombre) |
| Foto | `public/img/portrait.jpg` (cuadrada, 560 × 560 px o más) |
| Miniaturas de publicaciones | imagen en `public/img/pubs/` + campo `image` en `publications.yaml` |
| Fotos de proyectos y líneas | imagen en `public/img/projects/` + campo `image` en `projects.yaml` |
| Textos fijos de la interfaz (menús, títulos de sección) | `src/lib/i18n.ts` |
| Colores y tipografía | `src/styles/global.css`, al principio del archivo |

Casi todo el mantenimiento es editar los cuatro archivos `.yaml`. Reglas básicas de YAML:

- Respeta la sangría (dos espacios) y los guiones al inicio de cada entrada.
- Pon los textos entre comillas dobles. Si el texto lleva comillas dobles dentro, usa comillas tipográficas (“ ”).
- En los textos, `*así*` sale en cursiva, `**así**` sale resaltado y `[texto](https://...)` crea un enlace.
- Los textos que cambian según el idioma llevan dos versiones:

```yaml
title:
  en: "Text in English"
  es: "Texto en español"
```

Si un texto es igual en ambos idiomas (un nombre, un año), basta con escribirlo una vez. Si falta la versión en español, se muestra la inglesa.

### Añadir una publicación

Copia una entrada existente en `publications.yaml` y cambia los campos:

```yaml
- type: article          # article | working | chapter | book | policy
  year: 2027
  title: "Título del artículo"
  authors: ["Castillo-Reina, M.", "Brandano, M. G.", "Faggian, A."]
  outlet: "Tourism Economics"  # nombre corto para la miniatura
  venue: "*Tourism Economics*, 33(2), 100–120"
  doi: "10.xxxx/xxxxx"   # opcional
  status: { en: "Forthcoming", es: "En prensa" }  # opcional
  image: "tourism-economics.jpg"  # opcional, en public/img/pubs/
  selected: true         # opcional: aparece en la portada
  line: visual           # opcional: la vincula a una línea de projects.yaml
```

### Añadir una actividad a la galería

En `activity.yaml`, cambia `events: []` por una lista (el archivo trae un ejemplo comentado). Guarda las fotos en `public/img/activity/` y el PDF de la presentación en `public/activity/slides/`. La página **Activity / Actividad** aparece en el menú en cuanto existe la primera entrada.

### Actualizar el CV

Reemplaza los PDF en `public/cv/` (mismo nombre) y cambia la fecha en `profile.yaml` → `cv.updated`. El botón de la portada y de la página About muestra esa fecha.

### Añadir fotos y miniaturas

- **Proyectos:** guarda la foto o el mapa (JPG o PNG, unos 1200 px de ancho, horizontal 4:3) en `public/img/projects/` y escribe el nombre del archivo en el campo `image` de la línea correspondiente de `projects.yaml`. Para el mapa de las Big Benches, usa `current.image` y añade una descripción en `image_alt`.
- **Publicaciones:** guarda la portada (vertical 3:4, unos 240 × 320 px) en `public/img/pubs/` y escribe el nombre en el campo `image` de la publicación. Si el campo está vacío, el sitio genera una miniatura con el nombre corto de `outlet`.
- Usa imágenes propias o con permiso; para portadas de revistas, revisa las condiciones de cada editorial.

## Ver el sitio en tu Mac

Necesitas [Node.js](https://nodejs.org) 22 o superior. En la Terminal, dentro de esta carpeta:

```bash
npm install        # solo la primera vez
npm run dev        # abre http://localhost:4321 y se actualiza al guardar
```

## Publicar en GitHub Pages

1. En GitHub crea un repositorio público llamado **`miguelcastilloreina.github.io`** dentro de la organización `miguelcastilloreina` (así la dirección será `https://miguelcastilloreina.github.io`).
2. Sube esta carpeta al repositorio (con GitHub Desktop o con `git push`). La carpeta `node_modules` no se sube.
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Cada vez que hagas un cambio y lo subas a la rama `main`, el sitio se reconstruye y publica solo en uno o dos minutos. El progreso se ve en la pestaña **Actions**.

### Dominio propio (opcional)

1. Compra el dominio (por ejemplo en Cloudflare, Namecheap o Porkbun).
2. En GitHub: **Settings → Pages → Custom domain**, escribe el dominio y activa **Enforce HTTPS** cuando esté disponible.
3. En tu proveedor de dominio, crea los registros DNS que GitHub indica en esa misma página.
4. Cambia `site` en `astro.config.mjs` por la nueva dirección.

## Notas

- Las fuentes (Bricolage Grotesque, Nunito Sans, IBM Plex Mono) se sirven desde el propio sitio, no desde Google Fonts. Así ningún dato de los visitantes pasa a terceros, algo relevante con el RGPD en Italia.
- El texto usa Avenir Next en equipos Apple, donde ya está instalada, y Nunito Sans en el resto.
- Modo oscuro automático según la configuración del dispositivo del visitante.
