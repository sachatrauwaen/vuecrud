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

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const groupBy = (arr) => (keyFunction) => {
  let groups = {};
  arr.forEach(el => {
      const key = keyFunction(el);
      if (key in groups === false) {
          groups[key] = [];
      }
      groups[key].push(el);
  });
  return Object
    .keys(groups)
    .map(key => ({
      key: key,
      values: groups[key]
    }));
};


 export default {
     jsonSchema,
     isMobile,
     capitalize,
     groupBy
 };