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

test( "Util.__findActionParamsTypes__ action with no paremeter", function() {
  deepEqual(Util.__findActionParamsTypes__('show'), []);
});

test( "Util.__findActionParamsTypes__ action with one paremeter", function() {
  deepEqual(Util.__findActionParamsTypes__('go to @places@'), ['places']);
});

test( "Util.__findActionParamsTypes__ action with more than one paremeter", function() {
  deepEqual(Util.__findActionParamsTypes__('go to @places@ and exchange @objects@'), ['places', 'objects']);
});

test( "Util.__findActionParams__ same actions with no parameter", function() {
  deepEqual(Util.__findActionParams__('show', 'show'), []);
});

test( "Util.__findActionParams__ same actions with one parameter", function() {
  deepEqual(Util.__findActionParams__('show @places@', 'show place1'), [{type:'places', name:'place1'}]);
});

test( "Util.__findActionParams__ same actions with more than one parameter", function() {
  deepEqual(Util.__findActionParams__('show @places@ and @objects@', 'show place1 and object1'), [{type:'places', name:'place1'}, {type:'objects', name:'object1'}]);
});

test( "Util.__findActionParams__ different actions", function() {
  try {
    Util.__findActionParams__('show', 'move');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match');
  }
});

test( "Util.__findActionParams__ same actions with one parameter required and no parameter is passed", function() {
  try {
    Util.__findActionParams__('show @places@', 'show');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match');
  }
});

test( "Util.__findActionParams__ same actions with no parameter required and one parameter is passed", function() {
  try {
    Util.__findActionParams__('show', 'show place1');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match');
  }
});

test( "Util.__findActionParams__ same actions with two parameters required and one parameter is passed", function() {
  try {
    Util.__findActionParams__('show @places@ and @objects@', 'show place1');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match');
  }
});

test( "Util.retrieveActionParams same actions with no parameter", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}, {id:'idobj2', name:'obj2'}], places:[{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}]};
  deepEqual(Util.retrieveActionParams(json, 'show', 'show'), []);
});

test( "Util.retrieveActionParams same actions with one parameter same type", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}, {id:'idobj2', name:'obj2'}], places:[{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}]};
  deepEqual(Util.retrieveActionParams(json, 'show @places@', 'show place1'), [{type:'places', name:'place1', item:{id:'id1', name:'place1'}}]);
});

test( "Util.retrieveActionParams same actions with one parameter different type", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}, {id:'idobj2', name:'obj2'}], places:[{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}]};
  
  try {
    Util.retrieveActionParams(json, 'show @objects@', 'show place1');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match :: place1 does not belong to objects');
  }
});

test( "Util.retrieveActionParams same actions with two parameters same type", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}, {id:'idobj2', name:'obj2'}], places:[{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}]};
  deepEqual(Util.retrieveActionParams(json, 'show @places@ and @objects@', 'show place1 and obj2'), [{type:'places', name:'place1', item:{id:'id1', name:'place1'}}, {type:'objects', name:'obj2', item:{id:'idobj2', name:'obj2'}}]);
});

test( "Util.retrieveActionParams same actions with two parameter and second one with different type", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}, {id:'idobj2', name:'obj2'}], places:[{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}]};
  
  try {
    Util.retrieveActionParams(json, 'show @objects@ and @places@', 'show obj2 and obj1');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match :: obj1 does not belong to places');
  }
});

test( "Util.retrieveActionParams same actions with two parameter and both with different types", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}, {id:'idobj2', name:'obj2'}], places:[{id:'id1', name:'place1'}, {id:'id2', name:'place2'}, {id:'id3', name:'place3'}]};
  
  try {
    Util.retrieveActionParams(json, 'show @objects@ and @places@', 'show place3 and obj1');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Actions did not match :: place3 does not belong to objects');
  }
});

test( "Util.showText without reference", function() {
  equal(Util.showText({}, 'a description'), 'a description');
});

test( "Util.showText with place reference", function() {
  var json = {places:[{id:'id1', name:'place1'}]};
  equal(Util.showText(json, 'a description of @places.id1@'), 'a description of [place1]');
});

test( "Util.showText with object reference", function() {
  var json = {objects:[{id:'id1', name:'obj1'}]};
  equal(Util.showText(json, 'a description of @objects.id1@'), 'a description of [obj1]');
});

test( "Util.showText with multiple references", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}], places:[{id:'id1', name:'place1'}]};
  equal(Util.showText(json, 'a description of @objects.idobj1@ and @places.id1@'), 'a description of [obj1] and [place1]');
});

test( "Util.showText with unknown reference type", function() {
  try {
    Util.showText({}, 'a description of @states.id1@');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Element could not be found :: states with id id1');
  }
});

test( "Util.showText with unknown reference id", function() {
  var json = {objects:[{id:'idobj1', name:'obj1'}]};
  
  try {
    Util.showText(json, 'a description of @objects.idobj2@');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Element could not be found :: objects with id idobj2');
  }
});