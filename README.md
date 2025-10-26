# 🎨 Frontend_SIRHA_Romanos_2025-2

En este repositorio se maneja todo el **Frontend** del proyecto **SIRHA (Sistema de Reasignación de Horarios Académicos)**, desarrollado para la materia **DOSW**.  
Su propósito es ofrecer una interfaz moderna, intuitiva y eficiente que permita a estudiantes, administrativos y decanaturas interactuar con el sistema de manera fluida y confiable.

---

### 👤 Integrantes:
- Elizabeth Correa  
- Sebastian Ortega  
- Belén Quintero  
- Nikolas Martinez  
- Juan Pablo Contreras  

---

## 🎯 Objetivo del Proyecto

El proyecto **SIRHA** busca facilitar la **gestión y reasignación de horarios académicos** dentro de la Escuela Colombiana de Ingeniería, ofreciendo una plataforma para:

- Realizar solicitudes de cambio de grupo o materia.  
- Evaluar, aprobar o rechazar solicitudes por parte de decanatura.  
- Visualizar el estado académico de los estudiantes mediante indicadores de color.  

El frontend sirve como **puente visual** entre los usuarios finales y la lógica de negocio implementada en el backend.

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **React** | Framework base para la construcción de interfaces. |
| **Vite** | Herramienta de empaquetado y servidor de desarrollo. |
| **TailwindCSS** | Framework CSS para estilos utilitarios y diseño responsivo. |
| **React Router** | Manejo de rutas y navegación entre vistas. |
| **ESLint** | Análisis estático de código para mantener consistencia y buenas prácticas. |

---

## 🧩 Arquitectura y estructura del proyecto

El proyecto sigue una estructura modular basada en **feature-based folders**, que separa la lógica por contexto funcional (estudiante, decanatura, administrador, etc.) y promueve la escalabilidad.

```plaintext
📁 src/
│
├── 📁 api/                # Conexión futura con el backend (servicios REST)
├── 📁 assets/             # Recursos estáticos (íconos, imágenes, logos)
│   ├── 📁 icons/
│   ├── 📁 images/
│   └── 📁 logos/
│
├── 📁 components/         # Componentes reutilizables de UI
│   ├── 📁 common/         # Botones, inputs, modales, headers, etc.
│   ├── 📁 admin/           # Componentes específicos de administración
│   ├── 📁 dean/           # Componentes específicos de decanatura
│   └── 📁 student/        # Componentes específicos de estudiantes
│
├── 📁 configs/            # Configuración general (rutas, estilos globales, etc.)
├── 📁 hooks/              # Hooks personalizados (useAuth, useFetch, etc.)
├── 📁 lib/                # Funciones auxiliares y utilidades
├── 📁 routes/             # Definición de rutas y vistas principales
│   ├── 📁 admin/
│   ├── 📁 dean/
│   └── 📁 student/
│
├── 📁 services/           # Lógica de comunicación con APIs
├── 📁 states/             # Manejo de estado global o contexto compartido
├── 📁 utils/              # Funciones y helpers reutilizables
│
├── App.jsx                # Componente raíz
├── main.jsx               # Punto de entrada de la aplicación
└── index.html             # Plantilla base del proyecto
```

---

## 🌈 Funcionalidades principales

- **Autenticación y acceso por rol** (Estudiante, Decanatura, Admin).  
- **Visualización de horarios y materias inscritas.**  
- **Creación y seguimiento de solicitudes de cambio.**  
- **Panel de decanatura con solicitudes pendientes y estadísticas.**  
- **Interfaz responsive** y moderna gracias a **TailwindCSS**.  
- **Ruteo dinámico** con React Router y navegación basada en contexto.  

> 🧱 Algunas funcionalidades están en desarrollo o pendientes de integración con el backend.

---

## 🧠 Estructura de navegación

Las vistas se agrupan por tipo de usuario:

| Rol | Descripción |
|------|--------------|
| **Estudiante** | Formularios para crear solicitudes, ver historial y estado. |
| **Decanatura** | Panel de control para revisar, aprobar o rechazar solicitudes. |
| **Administrador** | (Futuro) Gestión de usuarios, facultades y configuración del sistema. |

---

## ⚙️ Configuración y ejecución del proyecto

### 🔧 Instalación de dependencias
```bash
npm install
```

### 🚀 Modo desarrollo
```bash
npm run dev
```
> El servidor local se ejecutará normalmente en: 
http://localhost:5173/

### 🔧 Instalación de dependencias
```bash
npm install
```