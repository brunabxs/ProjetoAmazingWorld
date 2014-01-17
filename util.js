var Util = Util || {};

Util.typeRegExp = new RegExp('@([^@]*)@', 'g');

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
    var gameAction = gameAction.replace(/[ ]*/g, '');
    var playerAction = playerAction.replace(/[ ]*/g, '');
    
    var actions = [];
    var types = Util.__findActionParamsTypes__(gameAction);
    
    if (types.length === 0 && gameAction !== playerAction)
        throw 'Actions did not match';
    
    var regexp = new RegExp(gameAction.replace(Util.typeRegExp, '([_a-zA-z0-9]+)'), 'g');
    
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
    var types = [];
    
    var match = Util.typeRegExp.exec(gameAction);
    while (match !== null) {
        types.push(match[1]);
        match = Util.typeRegExp.exec(gameAction);
    }
    
    return types;
};
