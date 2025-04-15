type DEF_RES_SUCCESS<T> = {
    success : true,
    data    : T
}


type DEF_RES_ERROR = {
    success : false,
    errors  : string[],
    code?   : number
}


type OBJECT_TYPE<T>     =   {[key: string]: T} 

export type DEF_RES<T>  =   DEF_RES_SUCCESS<T> | DEF_RES_ERROR

export type DEF_RES_P<T> = Promise<DEF_RES<T>>

export type DEF_RES_OBJ =   DEF_RES<OBJECT_TYPE<any>>

export type DEF_RES_OBJ_P = DEF_RES_P<OBJECT_TYPE<any>>

export const send_err = (params:{m?: string, errors?: string[], code?: number}):DEF_RES<any> => {
    
    const errors = params.errors || [];
    const m = params.m;
    if(m){
        console.warn(m);
        errors.push(m);
    }

    return {success: false, errors: errors, code: params.code}

}

export const send_success = (data: any):DEF_RES<any> => {
    
    return {success: true, data: data || {}, }
}