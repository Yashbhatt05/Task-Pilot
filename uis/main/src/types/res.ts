export type OBJ_WITH_ID = {
    id: string|number,
    [k:string]: any
}

export type OBJECT_TYPE<T>     =   {[key: string]: T}

export type DEF_RES_SUCCESS<T> = {
    success : true,
    data    : T
}

export type DEF_RES_ERROR = {
    success : false,
    errors  : string[],
    code?   : number
}

export type DEF_RES<T>  = DEF_RES_SUCCESS<T> | DEF_RES_ERROR

export type DEF_RES_P<T> = Promise<DEF_RES<T>>

