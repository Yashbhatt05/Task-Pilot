import { createClient } from '@supabase/supabase-js';
import { send_err, send_success } from '../types/res';
import env from '../env';
import Schema from './schema';


const SERVICE_ROLE_KEY      =   env.SUPABASE_SERVICE_KEY || '';  
const SUPABASE_HOST         =   env.SUPABASE_HOST_URL    || '';

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_HOST, SERVICE_ROLE_KEY);

const FNS: {[id: string]: Function} = {}


const getUsers = async (ctx: any) => {
    const { data, error } = await supabase
    .from('user')
    .select('*');

    if(error){
        return send_err({m: error.message})
    }
    return send_success(data);
}

const createUser = async (ctx: any) => {
    // safe parse the user 

    const { data, error } = await supabase
        .from('user')
        .insert([
            {
                name: ctx.name,
                age: ctx.age,
                characteristics: ctx.characteristics,
                extra: ctx.extra,
            }
        ]).select();
    
    if(error){
        return send_err({m: error.message})
    }

    return send_success(data);
}

const getUserFromId = async (ctx: any) => {
    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', ctx.id);
    
    if(error){
        return send_err({m: error.message})
    }
    return send_success(data);
}

const init = () => {

    FNS['get-users']        =   getUsers;
    FNS['create-user']      =   createUser;
    FNS['get-user-from-id'] =   getUserFromId;
    FNS['get-schema']       =   Schema.getSchema;
};

// initialize supabase module
init();

const fns = async (id:string, ctx: any) => {
    if(!FNS[id]) return send_err({m: "No function found with id : " + id});

    const fn = FNS[id];
    const r = await fn(ctx);
    return r;
}


const SUPABASE = {
    fns,
    
}

export default SUPABASE