# Skate Park

## Rutas
### Frontend Públicas
- `/` Vista Home
- `/login` Vista login
- `/register` Vista Registro
### Fronend Restringidas
- `/admin/skaters` Listado todos los registros
- `/admin/skater/edit` ruta `post` para editar o eliminar un registro.

## Rutas API
- `/api/v1/skaters`
- `/api/v1/skater`
- `/api/v1/skater\status` `put` actualiza el estado.
- `/login/out` `post` para desloguearse.

## Configuración
- Script base de datos en `\db\schema.sql`.