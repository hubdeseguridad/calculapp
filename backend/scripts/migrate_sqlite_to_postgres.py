# This script migrates data from a SQLite database to a PostgreSQL database.
import os
import sqlite3
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Conexión a PostgreSQL (usando la URL de .env)
POSTGRES_URL = os.getenv("DATABASE_URL_POSTGRES")
if not POSTGRES_URL:
    raise ValueError("DATABASE_URL_POSTGRES no está definido en el .env")

# Ruta de la base de datos SQLite
SQLITE_PATH = os.getenv("SQLITE_PATH", "app/db.sqlite3")

# Tablas que deseas migrar
TABLES = ["courses"]

def migrate_table(sqlite_cursor, pg_cursor, table):
    sqlite_cursor.execute(f"SELECT * FROM {table}")
    rows = sqlite_cursor.fetchall()

    if not rows:
        print(f"No hay datos en {table}")
        return

    columns = [desc[0] for desc in sqlite_cursor.description]
    placeholders = ", ".join(["%s"] * len(columns))
    insert_query = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})"

    for row in rows:
        pg_cursor.execute(insert_query, row)

    print(f"Migrados {len(rows)} registros de {table}")

def main():
    # Conexiones
    sqlite_conn = sqlite3.connect(SQLITE_PATH)
    sqlite_cursor = sqlite_conn.cursor()

    pg_conn = psycopg2.connect(POSTGRES_URL)
    pg_cursor = pg_conn.cursor()

    for table in TABLES:
        migrate_table(sqlite_cursor, pg_cursor, table)

    pg_conn.commit()
    pg_cursor.close()
    pg_conn.close()
    sqlite_conn.close()
    print("Migración completada con éxito.")

if __name__ == "__main__":
    main()
