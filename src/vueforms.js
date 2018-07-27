import jref from 'json-ref-lite'

const VueForms = {}
VueForms.jsonSchema = {};
VueForms.jsonSchema.getNotNull = function (schema) {
  if (schema.oneOf) {
      var lst = schema.oneOf.filter(function (s) { s.type != "null" });
      if (lst.length > 0) {
          return lst[0];
      } else {
          return schema;
      }
  } else {
      return schema;
  }
};
VueForms.isMobile = function () {
  return window.matchMedia("only screen and (max-width: 760px)").matches;
};

 
 // override .resolve function to prevent stack-overflow issue
//  var _originalResolvefn = jref.resolve;
//  VueForms.jsonSchema.resolve = function (json) {
//      var clone = JSON.parse(JSON.stringify(json)); // create clone because jref.resolve changes the input value; which results (sometimes) in an stack-overflow error if presented a second time 
//      return _originalResolvefn(clone);
//  };

VueForms.jsonSchema.resolve = function (json) {return json};

 export default VueForms;