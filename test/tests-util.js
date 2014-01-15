test( "Util.find no collection", function() {
  deepEqual(Util.find(undefined, {id:'id2'}), undefined);
});

test( "Util.find no attributes", function() {
  var collection = [{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}];
  deepEqual(Util.find(collection, undefined), undefined);
});

test( "Util.find place by id", function() {
  var collection = [{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}];
  deepEqual(Util.find(collection, {id:'id2'}), {name:'place2', id:'id2'});
});

test( "Util.find place by name", function() {
  var collection = [{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}];
  deepEqual(Util.find(collection, {name:'place3'}), {name:'place3', id:'id3'});
});
