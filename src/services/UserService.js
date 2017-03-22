angular.module('myApp')
.service('UserService', ['Config', function(Config) {

     
    var google_auth_provider = new firebase.auth.GoogleAuthProvider();
    var facebook_auth_provider = new firebase.auth.FacebookAuthProvider();
    var twitter_auth_provider = new firebase.auth.TwitterAuthProvider();
    var github_auth_provider = new firebase.auth.GithubAuthProvider();
         
    var auth = firebase.auth();
    var database = firebase.database();
    firebaseRef = database.ref();


this.LogInWithEmail = function(email, password, callback){

        auth.signInWithEmailAndPassword(email, password).then(function(user) {

            console.log(user);

            firebaseRef.child("users").child(user.uid).once("value", function(data) {
                var user_snapshot = data.val();
                Config.setUser(user_snapshot);
                response = { success: true };
                callback(response);
            });

          }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        response = { success: false, message: errorMessage, code: errorCode, email: email };
        callback(response);
        // ...
      });
      };

this.SignUpWithEmail = function(email, password, photoURL, name, callback){

        auth.createUserWithEmailAndPassword(email, password).then(function(user) {

            console.log(user);
   
            firebaseRef.child("users").child(user.uid).set({
                                  email: email,
                                  displayName: name,
                                  photoURL: photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                    var __user = Config.auth().currentUser;

                                        __user.delete().then(function() {
                                            
                                                response = { success: false, message: 'errorMessage', code: 'errorCode' };
                                                callback(response);
                                                
                                        }, function(error) {
                                            
                                                response = { success: false, message: 'errorMessage', code: 'errorCode' };
                                                callback(response);
                                            
                                        });

                                } else {

                                    response = { success: true };
                                    callback(response);
      
                                }
                          });
                            
            // ...
          }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                // ...
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
        });
                

      };


          
this.LogInWithGithub = function(callback){

        auth.signInWithPopup(github_auth_provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER****************");
            console.log(user);
            
           firebaseRef.child("users").child(user.uid).once("value", function(data) {

                        if(data.val()){
                            
                            response = { success: true };
                            callback(response);
                            
                        }else{
                              firebaseRef.child("users").child(user.uid).update({
                                  email: user.email,
                                  displayName: "displayName" in user ? user.displayName : user.email.split("@")[0],
                                  photoURL: user.photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                                auth.signOut().then(function() {
                                                    Config.setUser(null);
                                                  }, function(error) {});
                                    
                                                response = { success: false, message: errorMessage, code: errorCode };
                                                callback(response);

                                } else {
                                    
                                                
                                    response = { success: true };
                                    callback(response);
      
                                    
                                }
                          });
                      }
  
                });
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
            // ...
            });
        };

this.LogInWithFacebook = function(callback){

        auth.signInWithPopup(facebook_auth_provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER****************");
            console.log(user);
            
             firebaseRef.child("users").child(user.uid).once("value", function(data) {

                        if(data.val()){
                            
                            response = { success: true };
                            callback(response);
                            
                        }else{
                              firebaseRef.child("users").child(user.uid).update({
                                  email: user.email,
                                  displayName: "displayName" in user ? user.displayName : user.email.split("@")[0],
                                  photoURL: user.photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                               auth.signOut().then(function() {
                                                    Config.setUser(null);
                                                  }, function(error) {});
                                    
                                                response = { success: false, message: errorMessage, code: errorCode };
                                                callback(response);

                                } else {
                                    
                                                
                                    response = { success: true };
                                    callback(response);
      
                                    
                                }
                          });
                      }
  
                });
                          
                          
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
            // ...
            });
        };
        
this.LogInWithTwitter = function(callback){

        auth.signInWithPopup(twitter_auth_provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER****************");
            console.log(user);
            
             firebaseRef.child("users").child(user.uid).once("value", function(data) {

                        if(data.val()){
                            
                            response = { success: true };
                            callback(response);
                            
                        }else{
                              firebaseRef.child("users").child(user.uid).update({
                                  email: user.email,
                                  displayName: "displayName" in user ? user.displayName : user.email.split("@")[0],
                                  photoURL: user.photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                               auth.signOut().then(function() {
                                                    Config.setUser(null);
                                                  }, function(error) {});
                                    
                                                response = { success: false, message: errorMessage, code: errorCode };
                                                callback(response);

                                } else {
                                    
                                                
                                    response = { success: true };
                                    callback(response);
      
                                    
                                }
                          });
                      }
  
                });
                          
                          
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
            // ...
            });
        };

this.LogInWithGoogle = function(callback){

        auth.signInWithPopup(google_auth_provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER****************");
            console.log(user);
            
             firebaseRef.child("users").child(user.uid).once("value", function(data) {

                        if(data.val()){
                            
                            response = { success: true };
                            callback(response);
                            
                        }else{
                              firebaseRef.child("users").child(user.uid).update({
                                  email: user.email,
                                  displayName: "displayName" in user ? user.displayName : user.email.split("@")[0],
                                  photoURL: user.photoURL,
                                  uid: user.uid
                                } , function(error) {
                                    
                                if (error) {
                                    
                                               auth.signOut().then(function() {
                                                    Config.setUser(null);
                                                  }, function(error) {});
                                    
                                                response = { success: false, message: errorMessage, code: errorCode };
                                                callback(response);

                                } else {
                                    
                                                
                                    response = { success: true };
                                    callback(response);
      
                                    
                                }
                          });
                      }
  
                });
                          
                          
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            
            response = { success: false, message: errorMessage, code: errorCode, email: email };
            callback(response);
            // ...
            });
        };
     
   
    
}]);


