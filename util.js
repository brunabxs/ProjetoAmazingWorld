var Util = Util || {};

Util.typeRegExp = '@([^@]*)@';
Util.refRegExp = '@([^\.]*)\.([^@]*)@';

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

Util.findWithRequirements = function(collection, player) {
  if (collection === undefined || player.place === undefined || player.objects === undefined || player.states === undefined) return;
  
  var meetRequirements = function(playerItems, gameItems) {
    if (typeof playerItems === 'string' && typeof gameItems === 'string')
      return playerItems === gameItems;
      
    if (gameItems === undefined)
      return true;
      
    return (gameItems !== undefined && gameItems.filter(function(x) { return playerItems.indexOf(x) < 0 }).length === 0);
  };
  
  for (var i = 0; i < collection.length; i++) {
    var item = collection[i];
    
    if (item.requirements === undefined) return item;
    
    if (meetRequirements(player.place, item.requirements.place) && meetRequirements(player.objects, item.requirements.objects) && meetRequirements(player.states, item.requirements.states)) return item;
  }
};

Util.showText = function(json, text) {
    var refRegExp = new RegExp(Util.refRegExp, 'g');
    var refRegExp_nonGreedy = new RegExp(Util.refRegExp);
    
    var names = [];
    
    var match = refRegExp.exec(text);
    while (match !== null) {
        var item = Util.find(json[match[1]], {id:match[2]});
        if (item === undefined) {
            throw 'Element could not be found :: ' + match[1] + ' with id ' + match[2];
        }
        
        names.push('[' + item.name + ']');
        match = refRegExp.exec(text);
    }
    
    for (var i = 0; i < names.length; i++) {
        text = text.replace(refRegExp_nonGreedy, names[i]);
    }
    
    Util.emote(text);
    return text;
};

Util.emote = function(text) {
    console.log(text);
};

Util.retrieveActionParams = function(json, gameAction, playerAction) {
    var actionParams = Util.__findActionParams__(gameAction, playerAction);
    
    for (var i = 0; i < actionParams.length; i++) {
        var item = Util.find(json[actionParams[i].type], {name : actionParams[i].name});
        if (item === undefined) {
            throw 'Actions did not match :: ' + actionParams[i].name + ' does not belong to ' + actionParams[i].type;
        }
        
        actionParams[i].item = item;
    }
    
    return actionParams;
};

Util.__findActionParams__ = function(gameAction, playerAction) {
    var typeRegExp = new RegExp(Util.typeRegExp, 'g');
    
    var gameAction = gameAction.replace(/[ ]*/g, '');
    var playerAction = playerAction.replace(/[ ]*/g, '');
    
    var actions = [];
    var types = Util.__findActionParamsTypes__(gameAction);
    
    if (types.length === 0 && gameAction !== playerAction)
        throw 'Actions did not match';
    
    var regexp = new RegExp(gameAction.replace(typeRegExp, '([_a-zA-z0-9]+)'), 'g');
    
    var match = regexp.exec(playerAction);
    if (match !== null) {
        for (var i = 0; i < types.length; i++) {
            actions.push({type:types[i], name:match[i+1]});
        }
    }
    else {
        throw 'Actions did not match';
    }
    
    return actions;
};

Util.__findActionParamsTypes__ = function(gameAction) {
    var typeRegExp = new RegExp(Util.typeRegExp, 'g');
    
    var types = [];

    var match = typeRegExp.exec(gameAction);
    while (match !== null) {
        types.push(match[1]);
        match = typeRegExp.exec(gameAction);
    }
    
    return types;
};
