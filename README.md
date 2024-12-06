# Proyecto: PokeAPI.WebApp

Este proyecto utiliza Node.js v20.6.1 y PNPM como gestor de paquetes para su ejecución y administración. Sigue los pasos descritos a continuación para configurarlo y ejecutarlo correctamente.

## Requisitos previos

Asegúrate de tener las siguientes herramientas instaladas en tu entorno:

1. Node.js v20.6.1
   Descárgalo desde el sitio oficial de Node.js (https://nodejs.org/en) o utiliza un administrador de versiones como nvm (https://github.com/coreybutler/nvm-windows?tab=readme-ov-file).

2. PNPM
   Instálalo globalmente con el siguiente comando con permisos de administrador:

```
npm install -g pnpm
```

Para verificar las versiones instaladas:

```
node -v  # Debe mostrar v20.6.1
pnpm -v  # Debe mostrar la versión instalada

```

## Instalación

1. Clona este repositorio en tu máquina local:

```
git clone https://github.com/MegaGone/PokeAPI.WebApp.git
cd PokeAPI.WebApp
```

2. Instala las dependencias utilizando PNPM:

```
pnpm install
```

## Configuración

Crea un archivo .env en la raíz del proyecto y configura las variables necesarias. Puedes usar el archivo .env.example como plantilla:

```
cp .env.example .env
```

El proyecto corre por defecto en el puerto `3000` pero si necesitas correrlo en otro puerto debes indicarlo en la variable llamada `PORT` Ejemplo:

```
PORT=4200
```

## Comandos disponibles

### Desarrollo

Para iniciar el proyecto en modo desarrollo:

```
pnpm run dev
```

### Producción

Para compilar y ejecutar el proyecto en modo producción:

```
pnpm run build
pnpm run start
```

## Estructura del proyecto

```
├── src/                # Código fuente
├─── components/        # Componentes reutilizables de la aplicación
├─── contexts/          # UseContext y Provider para consumo de PokeAPI
├─── helpers/           # Funciones de ayuda reutilizables
├─── hooks/             # Hook para manejo de formulario de filtro de búsqueda.
├─── pages/             # Paginas utilizadas en la applicación
├─── AppRouter.jsx      # Archivo para manejar rutas de la aplicación
├─── index.css          # Archivo de estilos de la aplicación
├── public/             # Archivos públicos
├── .env.example        # Ejemplo de variables de entorno
├── package.json        # Configuración del proyecto
├── pnpm-lock.yaml      # Bloqueo de dependencias para reproducibilidad
└── README.md           # Documentación del proyecto
└── vite.config.js      # Archivo de configuración de vite
```
