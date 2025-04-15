import { DEF_RES_P } from "@/types/res";

const API_URL = import.meta.env.VITE_BACKEND_URL;


const parseApiRes = async (res: Response): DEF_RES_P<any> => {
    
    //parse the response and check for json 
    const json = await res.json().catch((e) => {
        // its not json
        return null;
    });

    if(!json){
        // check if it is text;
        const text = await res.text().catch((e) => {
            // its not text
            return null;
        });
        if(!text){
            // its not json or text
            return {success: false, errors: ["Invalid response found, not json or text"]};
        }
        return {success: true, data: text};
    }

    if(Object.keys(json).includes("success") && typeof json.success === "boolean"){
        if(json.success){
            const data = json.data;
            if(data !== undefined){
                return {success: true, data: data};
            }
            return {success: true, data: json};
        }
        else{
            const errors = json.errors;
            if(errors !== undefined){
                return {success: false, errors: errors};
            }
            return {success: false, errors: ["Invalid response found, no errors or data"]};
        }
    }
    return {success: true, data: json};
}

const PostFetch = async (fn: string, params: {[key:string]: any} ):DEF_RES_P<any> => {
    
    const errors: string[] = [];


    // fn id is passed as param to the api
    const url = new URL(API_URL + "/v1/fn/"+fn);


    const res = await fetch(url.href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    }).catch((e) => {
        const m = "Error occured while fetching data from the server";
        console.warn(m);
        errors.push(m);
        return null;
    });

    if(!res){
        return {success: false, errors: errors};
    }


    // always return {success: true|false, data: }

    const r = await parseApiRes(res);
    return r
}


const ENTITY  = {
    fn : PostFetch
}

export default ENTITY