exports.custom = function(objValue, srcValue){
  if(Array.isArray(objValue)){
    if(objValue.length > srcValue.length){
      return objValue = srcValue
    }
  }
}


