
## Configuración del Entorno con Docker Compose

Este proyecto utiliza **Docker** y **Docker Compose** para levantar rápidamente un entorno de desarrollo completo con servicios esenciales, incluyendo bases de datos, servidores de caché, gestión de colas y herramientas de monitoreo.

### Requisitos Previos

- **Docker**: Asegúrate de tener Docker instalado y en funcionamiento. Puedes descargarlo e instalarlo desde [Docker Desktop](https://www.docker.com/products/docker-desktop).
- **Docker Compose**: Incluido con Docker Desktop o instalable por separado en sistemas Linux.

### Servicios Incluidos

El archivo `docker-compose.yml` proporciona una configuración para los siguientes servicios:

- **Redis**: Servicio de caché en memoria.
- **Redis Commander**: Interfaz de usuario para administrar y monitorear Redis.
- **PostgreSQL**: Base de datos relacional para el almacenamiento persistente.
- **Elasticsearch**: Motor de búsqueda para indexación y búsqueda avanzada.
- **Kibana**: Interfaz para visualizar los datos de Elasticsearch y realizar análisis.

### Iniciar el Entorno

Para levantar todos los servicios especificados en el archivo `docker-compose.yml`, ejecuta el siguiente comando desde la raíz del proyecto:

```bash
docker-compose up -d redis-commander mongodb redis postgres rabbitmq elasticsearch kibana
```

Este comando inicia los servicios en modo **detached** (`-d`), lo cual significa que los contenedores se ejecutarán en segundo plano. 

### Configuración de Servicios y Puertos

A continuación se describen los servicios y los puertos configurados en `docker-compose.yml`:

1. **Redis**
   - **Puerto**: `6379`
   - **Volumen**: `./docker-volumes/cache:/data` (persistencia de datos)

2. **Redis Commander**
   - **Puerto**: `8081`
   - **Descripción**: Interfaz para administrar Redis, accesible en `http://localhost:8081`

3. **PostgreSQL**
   - **Puerto**: `5432`
   - **Volumen**: `./docker-volumes/postgres:/var/lib/postgresql`
   - **Credenciales**:
     - Usuario: `user`
     - Contraseña: `api`
     - Base de datos: `name_db`

4. **Elasticsearch**
   - **Puertos**: `9200` (API HTTP), `9300` (puerto de transporte)
   - **Volumen**: `./docker-volumes/elasticsearch-data:/usr/share/elasticsearch/data`
   - **Descripción**: Motor de búsqueda avanzada y análisis de datos.

5. **Kibana**
   - **Puerto**: `5601`
   - **Volumen**: `./kibana.yml:/usr/share/kibana/config/kibana.yml:ro`
   - **Descripción**: Herramienta de visualización para Elasticsearch, accesible en `http://localhost:5601`

### Apagar los Servicios

Para detener y eliminar los contenedores sin perder los datos en los volúmenes:

```bash
docker-compose down
```

### Limpieza de Volúmenes y Caché

Si deseas eliminar también los volúmenes para una limpieza completa:

```bash
docker-compose down -v
```

Este comando elimina los contenedores y los volúmenes asociados, lo cual borrará los datos persistentes de la configuración actual.

