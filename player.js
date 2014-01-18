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
