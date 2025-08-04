# CalculApp

**CalculApp** es una **PWA** (Progressive Web App) que permite calcular precios de cursos con soporte **offline-first** y sincronización automática al recuperar conexión.  
Funciona tanto en navegadores modernos (Chrome, Edge, Safari) como en dispositivos móviles (iOS, Android) y desktop (Windows, macOS).

---

## Características principales

- **Cálculo de precios y descuentos** con base en número de cursos y plazas.
- **Soporte offline completo**:  
  - Carga la aplicación sin conexión (PWA con Service Worker).  
  - Calcula precios sin depender del servidor.
- **Sincronización automática**:  
  - Los cambios realizados offline se sincronizan automáticamente cuando vuelve la conexión.
- **Gestión de cursos**:  
  - CRUD completo desde el panel de administrador.

---

## Requisitos

### Entorno de desarrollo
- Node.js >= 18
- npm >= 9
- Python >= 3.10
- SQLite (para entorno local)
- PostgreSQL (para producción)

### Dependencias principales
- **Frontend**:  
  - React + Vite + TypeScript  
  - React Router DOM  
  - idb (IndexedDB)  
  - vite-plugin-pwa
- **Backend**:  
  - FastAPI  
  - SQLAlchemy  
  - Uvicorn  
  - Pydantic

---

## Instalación

### Clonar el repositorio
```bash
git clone https://github.com/usuario/calculapp.git
cd calculapp
````

### Instalar dependencias del backend

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate       # Windows
pip install -r requirements.txt
```

### Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

---

## Ejecución en desarrollo

### Backend

```bash
cd backend
uvicorn app.main:app --reload
```

Por defecto disponible en: `http://127.0.0.1:8000`

### Frontend

```bash
cd frontend
npm run dev
```

Por defecto disponible en: `http://127.0.0.1:5173`

---

## Generar build de producción

```bash
npm run build
npm run preview
```

---

## Estructura de carpetas

```bash
.
├── backend/
│   ├── app/
│   │   ├── api/                # Endpoints
│   │   ├── models/             # Modelos SQLAlchemy
│   │   ├── schemas/            # Esquemas Pydantic
│   │   ├── services/           # Lógica de negocio
│   │   ├── tests/              # Pruebas unitarias
│   │   └── main.py             # Punto de entrada FastAPI
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes UI
│   │   ├── hooks/              # Hooks personalizados
│   │   ├── pages/              # Vistas principales
│   │   ├── services/           # Lógica de sincronización y API
│   │   ├── utils/              # IndexedDB, Sync Manager
│   │   └── main.tsx            # Entrada principal
│   └── vite.config.ts
└── README.md
```

---

## Endpoints principales

### **Autenticación**

* **POST** `/api/v1/auth/` → Valida contraseña de administrador.

### **Cursos**

* **GET** `/api/v1/courses/` → Lista de cursos.
* **POST** `/api/v1/courses/` → Crear curso.
* **PUT** `/api/v1/courses/{id}` → Editar curso.
* **DELETE** `/api/v1/courses/{id}` → Eliminar curso.

### **Cotizaciones**

* **POST** `/api/v1/pricing/` → Calcula precio total, descuentos y precio unitario.
* **POST** `/api/v1/quotations/` → Guarda cotización en backend (incluye datos pendientes sincronizados).

---

## Esquema base de datos (simplificado)

### Tabla `courses`

| Campo | Tipo       | Descripción         |
| ----- | ---------- | ------------------- |
| id    | INTEGER PK | Identificador único |
| name  | TEXT       | Nombre del curso    |
| price | REAL       | Precio unitario     |

### Tabla `quotations`

| Campo        | Tipo       | Descripción             |
| ------------ | ---------- | ----------------------- |
| id           | INTEGER PK | Identificador único     |
| created\_at  | DATETIME   | Fecha de creación       |
| total        | REAL       | Total calculado         |
| discount     | REAL       | Porcentaje de descuento |
| total\_items | INTEGER    | Número de licencias     |

---

## Pruebas

### Frontend

```bash
cd frontend
npm run test
```

### Backend

```bash
cd backend
pytest
```

---

## Despliegue

* **Producción backend**: Uvicorn + Gunicorn detrás de Nginx (PostgreSQL).
* **Producción frontend**: Archivos estáticos servidos desde Nginx.
* **CDN**: Bunny.net (configurado en tu infraestructura).

---
