/*
    Routes the incoming requests to the correct handlers
*/

import { Request, Response } from "express";
import { DEF_RES_OBJ_P } from "./types/res";
import SUPABASE from "./supabase";

const PostRequestHandler = async (req: Request, res: Express.Response): DEF_RES_OBJ_P => {
    
    const fn  = req.query.fn || req.params.fn;
    if(!fn) return {success: false, errors:["No function specified"]};

    
    return {success: true, data: {}}
}


const GetRequestHandler = async (req: Express.Request, res: Express.Response): DEF_RES_OBJ_P => {

    return {success: true, data: {}}
}

const FunctionHandler = async (req: Request, res: Response): DEF_RES_OBJ_P => {
    const fnid = req.params.fnid;
    if(!fnid) return {success: false, errors:["No function specified"]};
    const ctx = req.body || req.query;

    const r = await SUPABASE.fns(fnid, ctx);
    return r;
}

const ReqHandler = {
    Post    : PostRequestHandler,
    Get     : GetRequestHandler,
    Function: FunctionHandler
}

export default ReqHandler;