
angular.module('myApp')
 .controller('homeCtrl', function($scope, $timeout, $rootScope,$mdToast,UserService, Config) {
     
     
     

    var auth = firebase.auth();
    var database = firebase.database();
    
    
$scope.init = false;
    
$scope.$on('$locationChangeSuccess', function() {
    
    
    console.log("!!!");
            
            new Promise(function(resolve, reject) {
                                
                        if(!Config.getInit() || true){

                            
                                    auth.onAuthStateChanged(function(user) {
                                        
                                        Config.setInit(true);

                                       if (user) {
                                           
                                           database.ref().child("users").child(user.uid).once("value", function(data) {
                                               
                                             var user_snapshot = data.val();
                                             
                                             Config.setUser(user_snapshot);
                                             
                                             console.log(Config.getUser());
                                             
                                             resolve('Success!');   

                                          });   

                                       } else {

                                         // No user is signed in.
                                         console.log('user not signed in');
                                         
                                         resolve('success');

                                       }
                                   });
                        }else{

                            resolve('success');

                        }
                }).then(function(){
                    
                    console.log('RESOLVED!!!');
                    
                    
                    $scope.init = true;
                    

                    if(Config.getUser()){
                        $scope.signedIn = true;
                        $scope.displayName = Config.getUser().displayName;
                        $scope.email = Config.getUser().email;
                        $scope.uid 
                                = Config.getUser().uid;
                        $scope.photoURL = Config.getUser().photoURL;
      
                    }else{
                           $scope.signedIn = false;  
                            console.log($scope.signedIn);

                    }
                    
   
             
    
           });
           
               
        });


$rootScope.$broadcast('$locationChangeSuccess', 'Data to send');


  $scope.toast = function (message){
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .hideDelay(1500)
    );
   };

    $scope.data = {
        login:{
            email:'', 
            password:''
        },
        signup:{
            email:'',
            displayName:'',
            password:'',
            profileImg: ''
        },
        users:{}
    };
    
       database.ref().on('value', function(data) { 

                     $timeout(function(){
                         $scope.data.users = data.val();
                     }, 10);        

                     console.log(data.val());

                 });



    $scope.authEmail = function(){
       
           UserService.LogInWithEmail($scope.data.login.email, $scope.data.login.password, function (response) {
               
                  if (response.success) {
                      $timeout(function() {
                            $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
                            $scope.toast('Logged In');
                      });  

                                  
                  } else {
                      console.log(response);
                      
                      switch(response.code) {
                                case 'auth/invalid-email':
                                    $timeout(function() {
                                    $scope.alert_string =  "Please enter a valid email";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000)); 
                                    });
                                    break;
                                case 'auth/user-disabled':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks looks like your account has been temporarily disabled";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000)); 
                                    });                                   
                                    break;
                                case 'auth/user-not-found':
                                    $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like there is no account with this email";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000)); 
                                    });                                    
                                    break;
                                case 'auth/wrong-password':
                                    $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like your password is incorrect";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000)); 
                                    });                                    
                                    break;                                
                                default:
                                    $timeout(function() {
                                    $scope.alert_string = "Looks like an error has occured :(";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000)); 
                                    });
                            }

                  }
            });

            };
    
    
    $scope.authGoogle = function(){
        
        UserService.LogInWithGoogle(function (response) {
                  if (response.success) {
                      $timeout(function() {
                            $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
                            $scope.toast('Logged In');
                      });                
                  } else {
                      
                      
                      $mdToast.show(
                                        $mdToast.simple()
                                          .textContent("Logging in...")
                                          .hideDelay(3000)); 
                      
                      switch(response.code) {
                                case 'auth/account-exists-with-different-credential':
                                    $timeout(function() {
                                    $scope.alert_string = "An exisiting account is already authenticated using " + response.email + " but with a different provider. (This usssually happens is your have signed in with a different service that uses the same email address.";
                                    
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));    
                                    
                                    
                                    });
                                    break;
                                case 'auth/popup-blocked':
                                     $timeout(function() {
                                         
                                    $scope.alert_string =  "Whoops looks like your browser has blocked pop ups! Enabled pop ups to sign in with google";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;
                                case 'auth/popup-closed-by-user':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like you didn't complete the authentication process";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;  
                                default:
                                    $timeout(function() {
                                    $scope.alert_string = "Looks like an error has occured :(";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });
                            }
 
                  }
            });
    };
    
    $scope.authGithub = function(){
        
        UserService.LogInWithGithub(function (response) {
                  if (response.success) {
                      $timeout(function() {
                            //$location.path('/app');
                            $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
                            $scope.toast('Logged In');
                      });                
                  } else {
                      
                                            
                      switch(response.code) {
                                case 'auth/account-exists-with-different-credential':
                                    $timeout(function() {
                                    $scope.alert_string = "An exisiting account is already authenticated using " + response.email + " but with a different provider. (This usssually happens is your have signed in with a different service that uses the same email address.";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));    
                                    
                                    
                                    });
                                    break;
                                case 'auth/popup-blocked':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like your browser has blocked pop ups! Enabled pop ups to sign in with google";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;
                                case 'auth/popup-closed-by-user':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like you didn't complete the authentication process";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;  
                                default:
                                    $timeout(function() {
                                    $scope.alert_string = "Looks like an error has occured :(";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });
                            }
 
                  }
            });
    };
    
    $scope.authFacebook = function(){
        
        UserService.LogInWithFacebook(function (response) {
                  if (response.success) {
                      $timeout(function() {
                            //$location.path('/app');
                            $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
                            $scope.toast('Logged In');
                      });                
                  } else {
                      
                                            
                      switch(response.code) {
                                case 'auth/account-exists-with-different-credential':
                                    $timeout(function() {
                                    $scope.alert_string = "An exisiting account is already authenticated using " + response.email + " but with a different provider. (This usssually happens is your have signed in with a different service that uses the same email address.";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));    
                                    
                                    
                                    });
                                    break;
                                case 'auth/popup-blocked':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like your browser has blocked pop ups! Enabled pop ups to sign in with google";
                                     alert($scope.alert_string);
                                         $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;
                                case 'auth/popup-closed-by-user':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like you didn't complete the authentication process";
                                     alert($scope.alert_string);
                                         $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;  
                                default:
                                    $timeout(function() {
                                    $scope.alert_string = "Looks like an error has occured :(";
                                     alert($scope.alert_string);
                                        $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });
                            }
 
                  }
            });
    };
    
    $scope.authTwitter = function(){
        
        UserService.LogInWithTwitter(function (response) {
                  if (response.success) {
                      $timeout(function() {
                            $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
                            $scope.toast('Logged In');
                      });                
                  } else {
                      
                                            
                      switch(response.code) {
                                case 'auth/account-exists-with-different-credential':
                                    $timeout(function() {
                                    $scope.alert_string = "An exisiting account is already authenticated using " + response.email + " but with a different provider. (This usssually happens is your have signed in with a different service that uses the same email address.";
                                    alert($scope.alert_string);
                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));    
                                    
                                    
                                    });
                                    break;
                                case 'auth/popup-blocked':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like your browser has blocked pop ups! Enabled pop ups to sign in with google";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;
                                case 'auth/popup-closed-by-user':
                                     $timeout(function() {
                                    $scope.alert_string =  "Whoops looks like you didn't complete the authentication process";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });                                   
                                    break;  
                                default:
                                    $timeout(function() {
                                    $scope.alert_string = "Looks like an error has occured :(";
                                    alert($scope.alert_string);
                                     $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));   
                                    });
                            }
 
                  }
            });
    };
    
   $scope.signupEmail= function(isValid){

        if( isValid ){
            
         UserService.SignUpWithEmail($scope.data.signup.email, $scope.data.signup.password, $scope.data.signup.profileImg, $scope.data.signup.name, function (response) {

                  if (response.success) {
                      $timeout(function() {
                                                    $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');

                      });                
                  } else {
                      
                      console.log(response);
                      switch(response.code) {
                                case 'auth/email-already-in-use':
                                    $timeout(function() {
                                    $scope.alert_string = "This account is already registered";
                                                                        alert($scope.alert_string);

                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));
                                    });
                                    break;
                                case 'auth/invalid-email':
                                     $timeout(function() {
                                    $scope.alert_string =  "Please use a valid email";
                                                                        alert($scope.alert_string);

                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));
                                    });                                   
                                    break;
                                case 'weak-password':
                                     $timeout(function() {
                                    $scope.alert_string =  "Please choose a stronger password";
                                                                        alert($scope.alert_string);

                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));
                                    });                                   
                                    break;  
                                default:
                                    $timeout(function() {
                                    $scope.alert_string = "Looks like an error has occured :(";
                                                                        alert($scope.alert_string);

                                    $mdToast.show(
                                        $mdToast.simple()
                                          .textContent($scope.alert_string)
                                          .hideDelay(3000));
                                    });
                            }
                  }
            });
            
         }else{
             
             
             $mdToast.show(
                                        $mdToast.simple()
                                          .textContent("Please fill out all forms!!")
                                          .hideDelay(3000));
         }

    };

        
       $scope.signOut = function () {    
            auth.signOut().then(function() {
                
                $timeout(function(){
                     Config.setUser(null);
                $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
                },100);
               
                // Sign-out successful.
              }, function(error) {
                  $rootScope.$broadcast('$locationChangeSuccess', 'Data to send');
              });

    };   



  });
