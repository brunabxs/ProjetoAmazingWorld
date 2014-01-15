test( "Player.constructor", function() {
  var player = new Player('id1');
  equal(player.place, 'id1');
});

test( "Player.move between adjacent places", function() {
  var json = { places: [{id:'id1', name:'place1', connections:[{place:'id2'}]}, {id:'id2', name:'place2', connections:[{place:'id1'}]}] };

  var player = new Player('id1');
  
  player.move(json, 'id2');
  equal(player.place, 'id2');

  player.move(json, 'id1');
  equal(player.place, 'id1');

});

test( "Player.move between non-adjacent places throws exception 'Cannot move'", function() {
  var json = { places: [{id:'id1', name:'place1', connections:[]}, {id:'id2', name:'place2', connections:[]}] };

  var player = new Player('id2');

  try {
    player.move(json, 'id1');
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Cannot move');
  }
});
