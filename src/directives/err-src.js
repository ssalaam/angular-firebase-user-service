/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('myApp')

.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
        
        
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
})

.directive('displayName', function() {
  return {
    link: function(scope, element, attrs) {
 
      element.bind('error', function() {
        if (attrs.displayName) {
            
            var letter = attrs.displayName.charAt(0);
            
            console.log(letter);
                                
            var photoURL = '';
                              switch(letter.toLowerCase().trim()) {
                                case "a":
                                     photoURL = "assets/media/A.svg"
                                    break;
                                case "b":
                                     photoURL = "assets/media/B.svg"
                                    break;
                                case "c":
                                     photoURL = "assets/media/C.svg"
                                    break;  
                                case "d":
                                     photoURL = "assets/media/D.svg"
                                    break;
                                case "e":
                                     photoURL = "assets/media/E.svg"
                                    break;
                                case "f":
                                     photoURL = "assets/media/F.svg"
                                    break;
                                case "g":
                                     photoURL = "assets/media/G.svg"
                                    break;
                                case "h":
                                     photoURL = "assets/media/H.svg"
                                    break;
                                case "i":
                                     photoURL = "assets/media/I.svg"
                                    break;
                                case "j":
                                     photoURL = "assets/media/J.svg"
                                    break;
                                case "k":
                                     photoURL = "assets/media/K.svg"
                                    break;
                                case "l":
                                     photoURL = "assets/media/L.svg"
                                    break;
                                case "m":
                                     photoURL = "assets/media/M.svg"
                                    break;
                                case "n":
                                     photoURL = "assets/media/N.svg"
                                    break;
                                case "o":
                                     photoURL = "assets/media/O.svg"
                                    break;
                                case "p":
                                     photoURL = "assets/media/P.svg"
                                    break;
                                case "q":
                                     photoURL = "assets/media/Q.svg"
                                    break;
                                case "r":
                                     photoURL = "assets/media/R.svg"
                                    break;
                                case "s":
                                     photoURL = "assets/media/S.svg"
                                    break;
                                case "t":
                                     photoURL = "assets/media/T.svg"
                                    break;
                                case "u":
                                     photoURL = "assets/media/U.svg"
                                    break;
                                case "v":
                                     photoURL = "assets/media/V.svg"
                                    break;
                                case "w":
                                     photoURL = "assets/media/W.svg"
                                    break;
                                case "x":
                                     photoURL = "assets/media/X.svg"
                                    break;
                                case "y":
                                     photoURL = "assets/media/Y.svg"
                                    break;
                                case "z":
                                     photoURL = "assets/media/Z.svg"
                                    break;
                                default:
                                    
                                }   
            
          attrs.$set('src', photoURL);
        }
      });
    }
  };
});



