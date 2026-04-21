# Toolbox Code Challenge

Aplicación móvil desarrollada con **React Native + Expo** que permite explorar colecciones de videos organizadas en carousels interactivos.

---

## ¿Qué hace la app?

Al abrir la app, el usuario pasa por un flujo simple de autenticación y luego accede a una galería de videos agrupados por categorías.

### Flujo principal

```
Inicio → Login → Galería de videos (carousel)
```

1. **Login** — El usuario presiona "Ingresar" para autenticarse. La app obtiene un JWT desde la API y lo guarda de forma segura en el dispositivo.

2. **Galería** — Una vez autenticado, se muestran secciones de videos en formato carousel horizontal. Cada sección puede tener videos en formato **thumbnail** (16:9) o **poster** (3:2).

3. **Reproducción** — Al tocar un video, se reproduce directamente en la misma pantalla. Si el video no está disponible, se muestra un estado de error.

4. **Sesión protegida** — El token JWT se valida automáticamente. Si expira, el usuario es redirigido al login sin necesidad de acción manual.

---

## Stack tecnológico

| Capa                  | Tecnología                                       |
| --------------------- | ------------------------------------------------ |
| Framework             | Expo (SDK 54) + React Native                     |
| Navegación            | Expo Router (file-based routing)                 |
| Estado global         | Redux Toolkit                                    |
| Reproductor           | react-native-video                               |
| Almacenamiento seguro | expo-secure-store                                |
| Testing               | Jest + jest-expo + @testing-library/react-native |

---

## Arquitectura

El proyecto sigue principios **SOLID** y está organizado por features **SCREAMING ARCHITECTURE**:

```
app/                    # Rutas (Expo Router)
  (auth)/               # Pantallas públicas
  (private)/            # Pantallas protegidas (requieren token)
features/
  auth/                 # Lógica de autenticación
  carousel/
    components/         # VideoCarousel, CarouselSection, VideoItem, VideoPlayer
    hooks/              # useVideos, useVideoPlayer
    store/              # videosSlice (Redux)
lib/                    # Utilidades compartidas (apiClient, tokenManager)
providers/              # ReduxProvider
store/                  # Configuración del store global
```

---

## Requisitos previos

Antes de correr la app en un dispositivo o simulador, asegurate de tener configurado el entorno correspondiente:

### Android

- Instalar [Android Studio](https://developer.android.com/studio)
- Configurar un **AVD** (Android Virtual Device) desde el AVD Manager
- Asegurarse de que `ANDROID_HOME` esté en las variables de entorno

### iOS _(solo macOS)_

- Instalar [Xcode](https://developer.apple.com/xcode/) desde la App Store
- Instalar las herramientas de línea de comandos: `xcode-select --install`
- Tener al menos un simulador descargado desde Xcode → Settings → Platforms

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Correr en Android (requiere Android Studio)
npx expo run:android

# Correr en iOS (requiere Xcode, solo macOS)
npx expo run:ios

# Ejecutar tests
npm test
```

---

## Tests

La suite cubre los módulos principales del carousel:

```bash
npm test
```

| Suite            | Descripción                                        |
| ---------------- | -------------------------------------------------- |
| `useVideoPlayer` | Estado de reproducción, toggle, manejo de errores  |
| `videosSlice`    | Reducer, thunk fetch, estados loading/error        |
| `VideoPlayer`    | Renderizado condicional: imagen, video, error      |
| `VideoItem`      | Interacción, dimensiones por tipo, estado de error |
| `VideoCarousel`  | Secciones, items, casos borde                      |
