import {tags} from 'ziko/dom'
const { script } = tags;

export function CommentsSection(){
    const sc = script({
        src : "https://giscus.app/client.js",
        crossorigin : 'anonymous',
        async : true,
        'data-engine' : 'zikojs'
    });
return sc
    console.log(sc)

}