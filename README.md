# Tp_Integrador_Web
Sistema de Gestión Hospitalaria — Proyecto Integrador Web
Este es un sistema de gestión hospitalaria desarrollado como proyecto integrador para la materia Desarrollo de Software.

 Demo online
Aplicación desplegada en Railway

Repositorio GitHub
 https://github.com/Zapallozucchini/Tp_Integrador_Web.git

 Tecnologías utilizadas
Backend: Node.js, Express.js

Base de Datos: MySQL (gestionada con DBeaver)

Vista: Pug + Bootstrap 5

Despliegue: Railway

Autenticación: express-session + bcryptjs

ORM: mysql2 (promesas)

Usuarios para probar
Rol	Email	Contraseña
Administrador	admin@hospital.com	admin123
Recepcionista	recepcionista@hospital.com	recep123
Médico	medico@hospital.com	med123
Enfermero	enfermero@hospital.com	enf123

Roles y Permisos
Rol	Permisos principales
Administrador	Gestión total de usuarios (crear, editar, eliminar). Acceso a todo.
Recepcionista	Registro, edición y alta de pacientes y admisiones.
Médico	Registrar y ver evoluciones médicas de pacientes internados.
Enfermero	Registrar y ver signos vitales de pacientes internados.
Invitado	Solo puede ver la página de inicio. Sin acceso a módulos internos.

 Módulos implementados
    Autenticación y Roles
    Login con control de sesión (express-session)

Protección de rutas por middleware (estaAutenticado, esAdmin)

 Pacientes
ABM de pacientes (crear, editar, eliminar, listar)

 Admisiones
Alta de pacientes internados

Asignación de cama

Cambio de estado de admisión (activa / alta)

 Enfermería
Registro y listado de signos vitales (temperatura, presión, pulso, anotaciones)

Asociado a cada admisión activa

 Médico
Registro de evoluciones médicas (diagnóstico, tratamiento, observaciones)

Listado histórico de evoluciones por paciente internado

Base de Datos (MySQL)
Gestionada con DBeaver.
Tablas principales:

usuarios (con roles y contraseñas hasheadas)

pacientes

camas

admisiones

signos_vitales

evoluciones

 Cómo correr localmente
Clonar el repo:

bash
Copiar
Editar
git clone https://github.com/Zapallozucchini/Tp_Integrador_Web.git
cd Tp_Integrador_Web
Instalar dependencias:

bash
Copiar
Editar
npm install
Crear un archivo .env (opcional si usás Railway):

ini
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=hospital
Correr:

bash
Copiar
Editar
npm run dev
Estado actual
 Módulo de Pacientes completo
Módulo de Admisiones completo
Módulo de Enfermería funcional
 Módulo Médico implementado
 Autenticación y roles funcionando
 Despliegue en Railway

📝 Autor
Proyecto desarrollado por Juan Clavero como práctica integradora de desarrollo full stack.