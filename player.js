var Player = function(startPlace) {
  this.place = startPlace;
  this.objects = [];
  this.states = [];
};

Player.prototype.move = function(json, toPlace) {
  var playerPlace = Util.find(json.places, {id:this.place});

  if (Util.find(playerPlace.connections, {place:toPlace}) !== undefined)
    this.place = toPlace;
  else
    throw 'Cannot move';
};

Player.prototype.showScenario = function(json) {
  var playerPlace = Util.find(json.places, {id:this.place});
  
  var scenario = Util.findWithRequirements(playerPlace.scenarios, this);
  
  if (scenario === undefined)
    throw 'Cannot find scenario';
    
  return Util.showText(json, scenario.text);
};
