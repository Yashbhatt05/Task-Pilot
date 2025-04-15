import 'dotenv/config';

const env = {
    SUPABASE_HOST_URL   : process.env.SUPABASE_HOST_URL || '',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY   || '',
    SUPABASE_ANON_KEY : process.env.SUPABASE_ANON_KEY,
    PORT: process.env.PORT,
    DOMAIN: process.env.DOMAIN,
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
}

export default env;