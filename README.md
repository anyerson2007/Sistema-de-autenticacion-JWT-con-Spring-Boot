# Sistema de autenticacion JWT con Spring Boot

Proyecto full-stack de demostracion que permite registrar usuarios, iniciar sesion y proteger un panel administrativo mediante JWT y Spring Security.

## Tecnologias

- Java 21
- Spring Boot 3.5.8
- Spring Security
- JWT con JJWT 0.11.5
- Spring Data JPA
- PostgreSQL
- HTML, CSS y JavaScript
- Maven Wrapper

## Funcionalidad

- Registro de usuarios con rol `USER` o `ADMIN`.
- Contraseñas cifradas con BCrypt.
- Inicio de sesion mediante usuario y contraseña.
- Generacion de un JWT con vigencia de una hora.
- Validacion del JWT en las solicitudes protegidas.
- Acceso al panel administrativo solamente para usuarios con rol `ADMIN`.
- Manejo basico de CORS para el frontend local.

## Estructura

```text
Sprinboook/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── panel.html
│   ├── panel.js
│   └── styles.css
├── src/main/java/com/example/jwtcors/
│   ├── config/       # Seguridad y filtro JWT
│   ├── controller/   # Registro, login y panel administrativo
│   ├── dto/          # Respuesta del panel
│   ├── entity/       # Usuario, rol y permisos
│   ├── repository/   # Acceso a usuarios
│   └── service/      # JWT y logica de usuarios
└── src/main/resources/application.properties
```

## Requisitos

- Java 21
- PostgreSQL
- Navegador web
- Opcional: Live Server u otro servidor HTTP para el frontend

## Configuracion

Por defecto, la aplicacion intenta conectarse a una base de datos PostgreSQL llamada `demo_db` en `localhost:5432`, con el usuario `postgres`.

Configura la contraseña mediante una variable de entorno:

```powershell
$env:DB_PASSWORD="tu_contrasena"
```

Tambien puedes configurar otros valores:

```text
DB_URL=jdbc:postgresql://localhost:5432/demo_db
DB_USERNAME=postgres
DB_PASSWORD=tu_contrasena
```

La tabla `users` es creada o actualizada automaticamente por JPA.

## Ejecucion

Desde la carpeta del proyecto, inicia el backend:

```powershell
.\mvnw.cmd spring-boot:run
```

El backend quedara disponible en `http://localhost:8080`.

Sirve el contenido de `frontend/` con Live Server o cualquier servidor HTTP local. El CORS acepta estas direcciones:

- `http://localhost:5501`
- `http://127.0.0.1:5500`
- `http://127.0.0.1:5501`
- `http://127.0.0.1:5502`

Abre `index.html` desde uno de esos orígenes y utiliza el formulario de registro.

## Endpoints

| Metodo | Ruta | Acceso | Descripcion |
|---|---|---|---|
| `POST` | `/auth/register?username=...&password=...&role=USER` | Publico | Registra un usuario |
| `POST` | `/auth/login?username=...&password=...` | Publico | Devuelve el JWT |
| `GET` | `/admin/panel` | Requiere `ROLE_ADMIN` | Devuelve datos del usuario administrador |

Las solicitudes protegidas deben incluir el token:

```http
Authorization: Bearer <token>
```

## Pruebas

Ejecuta las pruebas con:

```powershell
.\mvnw.cmd test
```

## Nota de uso

Este proyecto es una demostracion educativa. Antes de llevarlo a produccion se deben mejorar aspectos como la clave de firma JWT, el uso de refresh tokens, la validacion de entradas, la respuesta de errores y el almacenamiento seguro de configuraciones.
