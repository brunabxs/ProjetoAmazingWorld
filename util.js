var Util = Util || {};

Util.find = function(collection, attributes) {
  if (collection === undefined || attributes === undefined) return;
 
  var found;

  for (var i = 0; i < collection.length; i++) {
    found = true;
    for (var attribute in attributes) {
      if (collection[i][attribute] !== attributes[attribute]) {
        found = false;
        break;
      }
    }

    if (found) return collection[i];
  }
};
