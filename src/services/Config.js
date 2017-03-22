angular.module('myApp')
.service('Config', function() {

    
    var user = null;
    var init = false;

    
    this.getInit = function(){return init;};
    
    this.setInit = function(_init){init = _init;};
    
    
    this.setUser = function(_user)
    {
        user = _user;
    };
    
    
   this.getUser = function()
    {
        return user;
    }
 
});