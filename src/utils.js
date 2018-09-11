//import jref from 'json-ref-lite'


const jsonSchema = {
    getNotNull: function (schema) {
        if (schema.oneOf) {
            var list = schema.oneOf.filter(s => s.type != "null");
            if(list.length > 0) return list[0];
        }
        return schema;
    }
}

const isMobile = () => window.matchMedia("only screen and (max-width: 760px)").matches;

const resolve = (json) => json;


 export default {
     jsonSchema,
     isMobile,
     resolve
 };