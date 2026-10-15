# Sitio web · Miguel Ángel Castillo-Reina

Sitio académico estático hecho con [Astro](https://astro.build). Se publica gratis en GitHub Pages.

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, frase de portada, bio, intereses, formación, novedades, enlaces, email | `src/data/profile.yaml` |
| Publicaciones (y cuáles salen en portada) | `src/data/publications.yaml` |
| Trabajo en curso y líneas de investigación | `src/data/projects.yaml` |
| Ponencias, premios, afiliaciones | `src/data/activity.yaml` |
| CV en PDF | `public/cv/castillo-reina-cv-en.pdf` y `public/cv/castillo-reina-cv-es.pdf` (reemplaza el archivo con el mismo nombre) |
| Foto | `public/img/portrait.jpg` (cuadrada, 560 × 560 px o más) |
| Colores y tipografía | `src/styles/global.css`, al principio del archivo |

Casi todo el mantenimiento es editar los cuatro archivos `.yaml`. Reglas básicas de YAML:

- Respeta la sangría (dos espacios) y los guiones al inicio de cada entrada.
- Pon los textos entre comillas dobles. Si el texto lleva comillas dobles dentro, usa comillas tipográficas (“ ”).
- En los textos, `*así*` sale en cursiva y `**así**` sale resaltado.

### Añadir una publicación

Copia una entrada existente en `publications.yaml` y cambia los campos:

```yaml
- type: article          # article | working | chapter | book | policy
  year: 2027
  title: "Título del artículo"
  authors: ["Castillo-Reina, M.", "Brandano, M. G.", "Faggian, A."]
  venue: "*Tourism Economics*, 33(2), 100–120"
  doi: "10.xxxx/xxxxx"   # opcional
  status: "Forthcoming"  # opcional
  selected: true         # opcional: aparece en la portada
  line: visual           # opcional: la vincula a una línea de projects.yaml
```

### Añadir una ponencia

En `activity.yaml`, cambia `talks: []` por una lista. La sección aparece sola en la página Activity.

### Añadir el mapa de las Big Benches

Exporta el mapa desde QGIS como PNG o JPG (unos 1600 px de ancho), guárdalo en `public/img/` y escribe el nombre del archivo en `projects.yaml` → `current.image`, con una descripción breve en `image_alt`.

## Ver el sitio en tu Mac

Necesitas [Node.js](https://nodejs.org) 22 o superior. En la Terminal, dentro de esta carpeta:

```bash
npm install        # solo la primera vez
npm run dev        # abre http://localhost:4321 y se actualiza al guardar
```

## Publicar en GitHub Pages

1. En GitHub crea un repositorio público llamado **`the3boy.github.io`** (así la dirección será `https://the3boy.github.io`).
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
