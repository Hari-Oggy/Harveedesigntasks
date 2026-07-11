-- AI SQL Assistant - Database Initialization
-- Run this on first startup to setup schemas and roles

-- Create schemas
CREATE SCHEMA IF NOT EXISTS metadata_schema;
CREATE SCHEMA IF NOT EXISTS user_data;

-- Create read-only role for query execution
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'aisql_query') THEN
        CREATE ROLE aisql_query WITH LOGIN PASSWORD 'query_password';
    END IF;
END $$;

-- Grant appropriate permissions to app role
GRANT ALL ON SCHEMA metadata_schema TO aisql_app;
GRANT ALL ON SCHEMA user_data TO aisql_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA metadata_schema TO aisql_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA metadata_schema TO aisql_app;

-- Allow query role to SELECT from user_data schema only
GRANT USAGE ON SCHEMA user_data TO aisql_query;
ALTER DEFAULT PRIVILEGES IN SCHEMA user_data GRANT SELECT ON TABLES TO aisql_query;

-- Revoke dangerous permissions from query role
REVOKE ALL ON SCHEMA metadata_schema FROM aisql_query;
REVOKE ALL ON SCHEMA pg_catalog FROM PUBLIC;

-- Set default search path
ALTER ROLE aisql_app SET search_path TO metadata_schema, user_data, public;
ALTER ROLE aisql_query SET search_path TO user_data;
