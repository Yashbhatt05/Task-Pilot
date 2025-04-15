// If using node-fetch (Node < 18)
// import fetch from 'node-fetch';
// If using axios
// import axios from 'axios';

import { DEF_RES, DEF_RES_P, send_err, send_success } from "../types/res";
import * as fs from 'fs';
import path from 'path';
import env from '../env';

// Define interfaces for the extracted schema (similar to before)
interface ColumnSchema {
    column_name: string;
    openapi_type: string; // e.g., 'string', 'integer', 'boolean'
    openapi_format?: string; // e.g., 'timestamp with time zone', 'uuid', 'int8'
    is_nullable: boolean;
    // Note: Default values might not always be present or easily extractable from OpenAPI spec
    // depending on Supabase version and configuration.
    default_value?: any;
    description?: string;
    items?: any;
}

interface TableSchema {
    table_name: string;
    columns: ColumnSchema[];
}

type DatabaseSchema = TableSchema[];

/**
 * Fetches and parses the OpenAPI specification from Supabase to extract schema details.
 * Does NOT require custom RPC functions in the database.
 *
 * @param supabaseUrl - The base URL of your Supabase instance API gateway.
 * For local Docker (CLI): 'http://localhost:54321'.
 * Verify port from your setup.
 * @param supabaseServiceKey - Your Supabase Service Role Key. Keep this secure.
 * @returns A Promise resolving to the database schema structure or null if an error occurs.
 * @throws Throws an error if the HTTP request or parsing fails significantly.
 */
export async function getSupabaseSchemaFromOpenAPI(
    supabaseUrl: string,
    supabaseServiceKey: string
): DEF_RES_P<DatabaseSchema> {

    if (!supabaseUrl || !supabaseServiceKey) {
        const m = ('Supabase URL and Service Key are required.');
        return send_err({m});
    }

    // Construct the OpenAPI spec URL (usually /rest/v1/)
    const openApiUrl = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/`; // Ensure no double slash

    console.log(`Workspaceing OpenAPI spec from: ${openApiUrl}`);

    try {
        const response = await fetch(openApiUrl, {
            method: 'GET',
            headers: {

                'apikey': supabaseServiceKey, // Use service key for authentication
                // Optional: Specify you accept JSON, though usually default
                'Accept': 'application/openapi+json, application/json',
                // Add any other headers if necessary (e.g., specific auth like Bearer)
                // 'Authorization': `Bearer ${supabaseServiceKey}` // Alternative auth header
            },
        });

      

        if (!response.ok) {
            // Log more details for debugging
            const errorBody = await response.text().catch(() => 'Could not read error body');
            console.error(`Error fetching OpenAPI spec: ${response.status} ${response.statusText}`);
            const m = (`Error details: ${errorBody}`);
            if (response.status === 401 || response.status === 403) {
                const m = "Hint: Check if the Supabase URL is correct and the Service Key is valid and has permissions.";
                return send_err({m});
            }
            return send_err({m});
        }

        // Parse the JSON response
        const openApiSpec = await response.json();
        if(!openApiSpec.definitions) return send_err({m: "Definitions are missing in the OpenAPI spec"});
        const extractedSchema: DatabaseSchema = [];

        for(let key in openApiSpec.definitions){
            const required      =   openApiSpec.definitions[key].required;
            const properties    =   openApiSpec.definitions[key].properties;
            const type          =   openApiSpec.definitions[key].type;
            const columns: ColumnSchema[] = [];

            for(let prop in properties){
                const property = properties[prop];

                const type          =   property.type;
                const default_value =   property.default;
                const description   =   property.description;
                const format        =   property.format; // when no type, use format as type (json)
                const items         =   property.items; // when type is array, items :{type: string}, else undefined

                columns.push({
                    column_name: prop,
                    openapi_type: type,
                    openapi_format: format,
                    is_nullable: !required.includes(prop),
                    default_value: default_value,
                    description: description,
                    items
                })

            }

            extractedSchema.push({
                table_name: key,
                columns: columns,
            })
        }
        // Sort tables alphabetically for consistency (optional)
        extractedSchema.sort((a, b) => a.table_name.localeCompare(b.table_name));

        console.log(`Successfully parsed schema for ${extractedSchema.length} tables.`);
        return {success: true, data: extractedSchema};

    } catch (err) {
        const m = "An unexpected error occurred while fetching/parsing OpenAPI spec: "+ err.message;
        return send_err({m});
    }
}


let schema_last_updated_at: number|null = null;

// writes schema to src/db/schema.json
const updateSchema = async (params: {SUPABASE_HOST_URL: string, SERVICE_ROLE_KEY: string}) => {
    
    const {SUPABASE_HOST_URL, SERVICE_ROLE_KEY} = params;

    const s = await getSupabaseSchemaFromOpenAPI(SUPABASE_HOST_URL, SERVICE_ROLE_KEY);
    if(!s.success) return s;

    const schema = s.data;

    const writeToFile = async (filePath: string, data: any) => {
        try {
            // Convert the JSON object to a string
            const jsonString = JSON.stringify(data, null, 2);   // indentation level
            // Get the directory from the file path
            const dir = path.dirname(filePath);

            // Check if the directory exists, if not create it (recursively)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            // Write the string to the file
            fs.writeFileSync(filePath, jsonString, 'utf-8');
            console.log(`JSON file written to: ${filePath}`);
            return send_success(data);
        } catch (error) {
            const m = `Error writing to file: ${error.message}`;
            return send_err({m})
        }

    }

    const r  = await writeToFile(path.join(__dirname, "../../src/db/schema.json"), schema);
    if(!r.success) return r;
    schema_last_updated_at = Date.now();
    return r;
}


const readSchema = async () => {
    const schema = await fs.promises.readFile(path.join(__dirname, "../../src/db/schema.json"), 'utf-8');
    if(schema){
        try {
            const parsed = JSON.parse(schema);
            return send_success(parsed);
        } catch (error) {
            return send_err({m: "Error parsing schema file"});
        }
    }
    return send_err({m: "Schema file not found"});
}



const getSchema  = async () => {

    const SUPABASE_HOST_URL     =   env.SUPABASE_HOST_URL;
    const SERVICE_ROLE_KEY      =   env.SUPABASE_SERVICE_KEY;
    // const r = await readSchema();
    // if(r.success) return r;
    return await updateSchema({SUPABASE_HOST_URL, SERVICE_ROLE_KEY});
}

const Schema  = {
    getSchema
}

export default Schema;