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

test( "Player.showScenario", function() {
  var json = { places: [{id:'id1', name:'place1', scenarios:[{text:'scenario of @places.id1@'}]}] };

  var player = new Player('id1');
  equal(player.showScenario(json), 'scenario of [place1]');
});

test( "Player.showScenario without a scenario throws exception 'Cannot find scenario'", function() {
  var json = { places: [{id:'id1', name:'place1'}] };

  var player = new Player('id1');
  
  try {
    player.showScenario(json);
    ok(false, 'Expected exception');
  }
  catch(err) {
    ok(true);
    equal(err, 'Cannot find scenario');
  }
});

test( "Player.findAction with no actions for player", function() {
  var player = new Player();
  equal(player.__findAction__('go to place1'), false);
});

test( "Player.findAction with one action for player without match", function() {
  var player = new Player();
  player.actions.push('go to place1');
  equal(player.__findAction__('go to place2'), false);
});

test( "Player.findAction with one action for player with match", function() {
  var player = new Player();
  player.actions.push('go to place1');
  equal(player.__findAction__('go to place1'), true);
});

test( "Player.findAction with two equal actions for player with match", function() {
  var player = new Player();
  player.actions.push('go to place1');
  player.actions.push('go to place1');
  equal(player.__findAction__('go to place1'), true);
});

test( "Player.findAction with two different actions for player with match", function() {
  var player = new Player();
  player.actions.push('go to place1');
  player.actions.push('go to place2');
  equal(player.__findAction__('go to place2'), true);
});
