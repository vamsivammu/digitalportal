var registered= false;
var y = angular.module("registration",['ngRoute','ngTouch','ngAnimate','ui.bootstrap']);

y.config(function($routeProvider,$locationProvider){

$routeProvider.when('/',{
        templateUrl:'registration_cc.html',
        controller:'regvalidation'

}).when('/loginafterreg',{
    templateUrl:'login_beforereg.html',
    controller:'loginvalidation'
}).when('/vendor',{
    templateUrl:'foodvendor.html',
    controller:'vendor'
}).when('/student',{
    templateUrl: 'student.html',
    controller:'student'
}).when('/finteam',{
    templateUrl:'finteam.html',
    controller:'finteam'
}).when('/studtransactions',{
    templateUrl:'studenttransactions.html',
    controller:'stutransactions'
}).when('/vendortransactions',{
    templateUrl:'vendortransactions.html',
    controller:'vendortransactions'
}).when('/studentslist',{
    templateUrl:'studentslist.html',
    controller:'listcontroller'
}).when('/fintransactions',{
    templateUrl:'fintransactions.html',
    controller:'fintransactions'
}).when('/carouselvendors',{
    templateUrl:'vendors-carousel.html',
    controller:'carouseloffers'
}).when('/offerlist',{
    templateUrl:'offers_specific_vendor.html',
    controller:'offercontroller'
}).when('/specificvendoroffers',{
    templateUrl:'specific_vendor_for_student.html',
    controller:'payment'
}).when('/offerfin',{
    templateUrl:'finoffers.html',
    controller:'offercontrollerfin'
}).when('/pendingstu',{
    templateUrl:'pendingstutransac.html',
    controller:'pendingstutransac'
}).when('/pendingvend',{
        templateUrl:'pendingvendortransac.html',
        controller:'pendingvendtransac'
}).when('/groupview',{
    templateUrl:"groupofstuds.html",
    controller:'groups'
}).otherwise({redirectTo:'/portal'})

$locationProvider.html5Mode({enabled:true,requireBase:true})

})



y.controller('regvalidation',function($scope,$window,$http,$location){

$scope.vis=false;    
    $scope.electronicmail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    $scope.namepattern=/^[a-zA-Z ]{1,}$/;
    $scope.password=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
    
$scope.submit=function(){

    $http({
        method:'post',
        url:'registrationcc.php',
        data:{
            person:$scope.human,
            name:$scope.name,
            email:$scope.email,
            pass:$scope.pass,
            username:$scope.username
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).then(function(response){

        // $scope.resp=angular.toJson(response);
        // $data = $scope.resp;
        $scope.message = response.data.message;
        $scope.status=response.data.status;

        if($scope.status==1){
            // $window.location.href=response.data.user;

            registered= true;
            window.location.pathname="/portal/loginafterreg"
            $scope.vis=false;
        }else{
          
            $scope.vis=true;
        }        

    })

}
$scope.signinpage=function(){
  $window.location.href="/portal/loginafterreg"
}

})

y.controller("loginvalidation",function($scope,$window,$http){
    
    $scope.reg= registered;
    $scope.login=function(){
        
        $http({
            method:'post',
            url:'login.php',
            data:{
                person:$scope.human,
                username:$scope.username,
                password:$scope.password
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response){      
                $scope.messages=response.data.messages;
                $scope.status = response.data.status;
                console.log(response);
                if($scope.status){
                    $window.location.href=response.data.user;
                }else{
                    console.log(1+2);
                }
        })
    }
})
var amt;
y.controller("student",function($scope,$window,$http,$uibModal){
    $http({
        method:'get',
        url:'getstudent.php'
    }).then(function(resp){
        if(resp.data.email==null){
            $window.location.href="/portal/loginafterreg"
        }else{
        $scope.data={
            name:resp.data.name,
            username:resp.data.username,
            email:resp.data.email,
            balance:resp.data.balance
        }
    }
    })  
    setInterval(function(){
        $http({
            method:'get',
            url:'getstudent.php'
        }).then(function(resp){
            $scope.data={
                name:resp.data.name,
            username:resp.data.username,
            email:resp.data.email,
            balance:resp.data.balance
            }
        })  
      
    },1000)
    $scope.home=function(){
      
        $window.location.href="/portal/student";
    
    }
        $scope.logout = function(){
                $http({
                    method:'get',
                    url:'stulogout.php'
                }).then(function(resp){
                    registered=false
                    $window.location.href='/portal/loginafterreg'
                })
        }
$scope.offers=function(){
    $window.location.href="/portal/carouselvendors"
}
$scope.listoftransactions=function(){
    $window.location.href="/portal/studtransactions"
}
$scope.pending=function(){
    $window.location.href="/portal/pendingstu"
  } 
        
        
    $scope.close=function(){
        $scope.$dismiss('cancel')
      
    
    }
    $scope.paypop=function(){
     
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',                      
            ariaDescribedBy: 'modal-body',                      
            templateUrl:'stu2stu.html',                      
            controller:'stu2stu',                
            size: 'md'
        })
    
    }
})
y.controller('carouseloffers',function($scope,$http,$window,$uibModal){
    $http({
        method:'get',
        url:'getvendorlist.php'
    }).then(function(r){
        $scope.vendors=r.data;
     
    })
    // setInterval(function(){
    //     $http({
    //         method:'get',
    //         url:'getvendorlist.php'
    //     }).then(function(r){
    //         $scope.vendors=r.data;
    //         console.log($scope.vendors)
    //     })  
    // },2000)
    $scope.do=function(x){
        x.preventDefault();
    }
    $scope.offers=function(){
        location.reload(true)
    }
    $scope.home=function(){
        $window.location.href="/portal/student"
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/studtransactions"
    }
    $scope.pending=function(){
        $window.location.href="/portal/pendingstu"
      }
    $scope.logout = function(){
        $http({
            method:'get',
            url:'stulogout.php'
        }).then(function(resp){
            registered=false
            $window.location.href='/portal/loginafterreg'
        })
}

$scope.selectvendor=function(q){

    $http({
        method:'post',
        url:'getspecificoffers.php',
        data:{
            vendorid:q
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

    }).then(function(response){
        
            if(response.data.status==1){
                $window.location.href="/portal/specificvendoroffers"
            }
        
    })

}

$scope.paypop=function(){
     
    $scope.modalInstance=$uibModal.open({
        ariaLabelledBy: 'modal-title',                      
        ariaDescribedBy: 'modal-body',                      
        templateUrl:'stu2stu.html',                      
        controller:'stu2stu',                
        size: 'md'
    })

}

    
})
y.controller("stu2stu",function($scope,$http,$uibModal){

    $scope.pay=function(l,m){
        
        $http({
                method:'post',
                url:'stu2stutransaction.php',
                data:{
                    benef:l,
                    am:m
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        
                
            }).then(function(r){
                $scope.status=r.data.status;
                if(r.data.status==1){
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'success.html',
                        controller:'payment',
                        size: 'sm'
                            })
                }else if(r.data.status==0){
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'insufficient.html',
                        controller:'payment',
                        size: 'sm'
                            })
                }
            })
    }

    
    $scope.close=function(){
        $scope.$dismiss('cancel')
      
    
    }
    

})
var otp=0;
var selectedprice=0;

y.controller("payment",function($scope,$window,$http,$uibModal){
    $scope.otp=otp
    $scope.pr=selectedprice
    $scope.paypop=function(){
     
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',                      
            ariaDescribedBy: 'modal-body',                      
            templateUrl:'stu2stu.html',                      
            controller:'stu2stu',                
            size: 'md'
        })
    
    }

    $http({
        method:'get',
        url:'getspecificoffers.php'
    }).then(function(r){
        
        $scope.a=r.data;
    })
    setInterval(function(){
        $http({
            method:'get',
            url:'getspecificoffers.php'
        }).then(function(r){
            $scope.a=r.data;
        })    
    },3000)
  
$scope.home=function(){
    $window.location.href="/portal/student";
}
$scope.offers=function(){
    $window.location.href="/portal/carouselvendors"
}


$scope.listoftransactions=function(){
    $window.location.href="/portal/studtransactions"
}
$scope.pending=function(){
  $window.location.href="/portal/pendingstu"
}
$scope.logout=function(){

    $http({
        method:'get',
        url:'stulogout.php'
    }).then(function(){
        registered=false
        $window.location.href="/portal/loginafterreg"

    })

}


$scope.pay=function(l,m){
    console.log(l)
    $http({
        method:'post',
        url:'priceselection.php',
        data:{
            price:l,
            description:m
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(r){
        if(r.data.status==1){
            selectedprice=l
            $scope.pr=l
            console.log($scope.pr)
            $scope.modalInstance=$uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl:'payment.html',
                controller:'payment',
                size: 'sm'
                    })
        }
    })
    
}


$scope.confirm=function(){

        $http({
            method:'post',
            url:'stu2vendortransaction.php'
        }).then(function(r){
                $scope.msg=r.data.message
                if(r.data.status==1){
                    otp=r.data.otp
                    $scope.otp=r.data.otp
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'success.html',
                        controller:'payment',
                        size: 'sm'
                            })
                }else{
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'insufficient.html',
                        controller:'payment',
                        size: 'sm'
                            })
                }

        })

}

$scope.close=function(){
    $scope.$dismiss('close')
}



})

y.controller("stutransactions",function($scope,$http,$window,$uibModal){

    $http({
        method:'get',
        url:'getstudenttransactions.php'
    }).then(function(response){
        $scope.transactions=response.data
        // $scope.transactions=[{"paymentby":"vamsi12","paymentto":"vamsi","time":"2018-08-10 00:27:31","credit":0,"debit":30,"transactionid":"vamsi1220180810122731"},
        // {"paymentby":"vamsi12","paymentto":"vamsi","time":"2018-08-10 00:31:11","credit":0,"debit":1,"transactionid":"vamsi1220180810123111"}]
    })
    
    // setInterval(function(){
    //     $http({
    //         method:'get',
    //         url:'getstudenttransactions.php'
    //     }).then(function(response){
    //         $scope.transactions=new Array()
    //         for(i in response.data){
    //     $scope.transactions.push(JSON.stringify(response.data[i]))
    // }  
    //     })
    // },1000)
$scope.home=function(){
    $window.location.href="/portal/student";
}
$scope.offers=function(){
    $window.location.href="/portal/carouselvendors"
}
$scope.pending=function(){
  $window.location.href="/portal/pendingstu"
}
$scope.paypop=function(){
     
    $scope.modalInstance=$uibModal.open({
        ariaLabelledBy: 'modal-title',                      
        ariaDescribedBy: 'modal-body',                      
        templateUrl:'stu2stu.html',                      
        controller:'stu2stu',                
        size: 'md'
    })

}
$scope.listoftransactions=function(){
    location.reload(true);
}

$scope.logout=function(){

    $http({
        method:'get',
        url:'stulogout.php'
    }).then(function(r){
        registered=false
        $window.location.href="/portal/loginafterreg"

    })

}

})

y.controller("pendingstutransac",function($scope,$http,$window,$uibModal){

    $http({
        method:'get',
        url:'getstupending.php'
    }).then(function(response){
        $scope.transactions=response.data
        // $scope.transactions=[{"paymentby":"vamsi12","paymentto":"vamsi","time":"2018-08-10 00:27:31","credit":0,"debit":30,"transactionid":"vamsi1220180810122731"},
        // {"paymentby":"vamsi12","paymentto":"vamsi","time":"2018-08-10 00:31:11","credit":0,"debit":1,"transactionid":"vamsi1220180810123111"}]
    })
    
    // setInterval(function(){
    //     $http({
    //         method:'get',
    //         url:'getstudenttransactions.php'
    //     }).then(function(response){
    //         $scope.transactions=new Array()
    //         for(i in response.data){
    //     $scope.transactions.push(JSON.stringify(response.data[i]))
    // }  
    //     })
    // },1000)
$scope.home=function(){
    $window.location.href="/portal/student";
}
$scope.offers=function(){
    $window.location.href="/portal/carouselvendors"
}

$scope.paypop=function(){
     
    $scope.modalInstance=$uibModal.open({
        ariaLabelledBy: 'modal-title',                      
        ariaDescribedBy: 'modal-body',                      
        templateUrl:'stu2stu.html',                      
        controller:'stu2stu',                
        size: 'md'
    })

}
$scope.listoftransactions=function(){
    $window.location.href="/portal/studtransactions"
}
$scope.pending=function(){
    location.reload(true)
}
$scope.logout=function(){

    $http({
        method:'get',
        url:'stulogout.php'
    }).then(function(r){
        registered=false
        $window.location.href="/portal/loginafterreg"

    })

}

})



y.controller("vendor",function($scope,$http,$window,$uibModal){
    $http({
        method:'get',
        url:'getvendor.php'
    }).then(function(resp){

        $scope.data={
            name: resp.data.name,
            username : resp.data.username,
            email: resp.data.email,
            balance : resp.data.balance
         }
    })
    $scope.listoffers=function(){
     $window.location.href="/portal/offerlist"   
    }
    $scope.home=function(){
        
        $window.location.href="/portal/vendor";
    
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/vendortransactions"
       
    }
    $scope.pending=function(){
        $window.location.href="/portal/pendingvend"
       
    }
    
    $scope.logout = function(){  
            $http({
                method:'get',
                url:'vendorlogout.php'
            }).then(function(resp){
                registered=false
                $window.location.href='/portal/loginafterreg'
            })
}
$scope.addoffers=function(){
    $scope.modalInstance=$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl:'addoffer.html',
        controller:'addingoffer',
        size: 'md'
            })
}
// $scope.addoffer=function(){

//     $http({
//         method:'post',
//         url:'addoffer.php',
//         data:{
//             price:$scope.price,
//             description:$scope.description
//         },
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//     }).then(function(r){
//         console.log(r);
//     })

// }
})
y.controller("vendortransactions",function($scope,$http,$window,$uibModal){

    $http({
        method:'get',
        url:'getvendortransactions.php'
    }).then(function(response){
        $scope.transactions=response.data;
    })
    setInterval(function(){
        $http({
            method:'get',
            url:'getvendortransactions.php'
        }).then(function(response){
            $scope.transactions=response.data;
        }) 
    },1000)

$scope.home=function(){
    $window.location.href="/portal/vendor";
}

$scope.listoffers=function(){
    $window.location.href="/portal/offerlist"   
   }

$scope.listoftransactions=function(){
    location.reload(true);
}
$scope.pending=function(){
    $window.location.href="/portal/pendingvend"
   
}

$scope.logout=function(){

    $http({
        method:'get',
        url:'vendorlogout.php'
    }).then(function(){
        registered=false
        $window.location.href="/portal/loginafterreg"
    })

}
})

y.controller("pendingvendtransac",function($scope,$http,$window,$uibModal){

    $http({
        method:'get',
        url:'getvendpending.php'
    }).then(function(response){
        $scope.transactions=response.data;
    })
    setInterval(function(){
        $http({
            method:'get',
            url:'getvendpending.php'
        }).then(function(response){
            $scope.transactions=response.data;
           
        }) 
    },4000)

$scope.home=function(){
    $window.location.href="/portal/vendor";
}

$scope.listoffers=function(){
    $window.location.href="/portal/offerlist"   
   }

$scope.listoftransactions=function(){
$window.location.href="/portal/vendortransactions"
}

$scope.pending=function(){
    location.reload(true);
   
}

$scope.otpwindow=function(otp,tid){

    $http({
        method:'post',
        url:'otpready.php',
        data:{
            otp:otp,
            tid:tid
        },
        headers:{'Content-Type': 'application/x-www-form-urlencoded'}
    
    }).then(function(r){
        if(r.data.status==1){
            
            $scope.con=$uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl:'otp.html',
                controller:'pendingvendtransac',
                size: 'sm'         
            })
        }
    })

        
}
$scope.approve=function(){
    $http({
        method:'post',
        url:'otpverify.php',
        data:{
            otp:$scope.userotp
        },
        headers:{'Content-Type':'application/x-www-form-urlencoded'}     
    }).then(function(r){
        $scope.status=r.data.status
        if(r.data.status==1){
            console.log('success')
            $scope.$dismiss('close')
            
            $scope.con=$uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl:'otpsuccess.html',
                controller:'pendingvendtransac',
                size: 'sm'         
            })
            
        }else{
            $scope.status=r.data.status
        }
    })
}
$scope.close=function(){
    $scope.$dismiss('close');
}
$scope.logout=function(){

    $http({
        method:'get',
        url:'vendorlogout.php'
    }).then(function(){
        registered=false
        $window.location.href="/portal/loginafterreg"
    })

}

})

y.controller("offercontroller",function($window,$scope,$http,$uibModal){
    $http({
        method:'get',
        url:'offerslist.php'
    }).then(function(r){
        $scope.o=r.data
        console.log($scope.o)
    })
    setInterval(function(){
        $http({
            method:'get',
            url:'offerslist.php'
        }).then(function(r){
            $scope.o=r.data
            
        })
    },1000)
    $scope.groupview=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'selectgroup.html',
            controller:'groupofstuds',
            size: 'md'
                })
    }
    $scope.close=function(){
        $scope.$dismiss('close');
    }
    

    $scope.addoffers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addoffer.html',
            controller:'addingoffer',
            size: 'md'
                })
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/vendortransactions"
       
    }
    $scope.pending=function(){
        $window.location.href="/portal/pendingvend"
       
    }
    
    $scope.listoffers=function(){
        location.reload(true);   
       }
    $scope.home=function(){
        $window.location.href="/portal/vendor";
    }
    $scope.logout = function(){  
        $http({
            method:'get',
            url:'vendorlogout.php'
        }).then(function(resp){
            registered=false
            $window.location.href='/portal/loginafterreg'
        })
}

})


y.controller("finteam",function($scope,$http,$window,$uibModal){
    $http({
        method:'get',
        url:'getfinteam.php'
    }).then(function(resp){
        $scope.data={
        name:resp.data.name,
        username : resp.data.username,
        email: resp.data.email,
        balance : resp.data.balance
     } })
     $scope.home=function(){
        if($window.location.href=="/portal/finteam"){
            location.reload(true);
        }
        $window.location.href="/portal/finteam";
    
    }
    $scope.offers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'select.html',
            controller:'sv',
            size: 'md'
                })
    }
    $scope.addoffers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addoffer.html',
            controller:'addingoffer',
            size: 'md'
                })
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/fintransactions";
    }
    $scope.pg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'paytogroup.html',
            controller:'pg',
            size: 'md'
                })
    }
    $scope.cg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'creategroup.html',
            controller:'creategroup',
            size: 'md'
                })
        
    }
    $scope.am=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addmember.html',
            controller:'addmember',
            size: 'md'
                })
        
    }
    $scope.listofstudents=function(){
        $window.location.href="/portal/studentslist";
    }
    $scope.groupview=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'selectgroup.html',
            controller:'groupofstuds',
            size: 'md'
                })
    }
    $scope.close=function(){
        $scope.$dismiss('close');
    }
    $scope.logout = function(){  
            $http({
                method:'get',
                url:'finlogout.php'
            }).then(function(resp){
                registered=false
                $window.location.href='/portal/loginafterreg'
            })

            $scope.pg=function(){
                $scope.modalInstance=$uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl:'paytogroup.html',
                    controller:'pg',
                    size: 'md'
                        })
            }
}})
var username;
var selectedusername=[];
y.controller("listcontroller",function($scope,$http,$window,$uibModal){
    $scope.distribute=function(){
     
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',                      
            ariaDescribedBy: 'modal-body',                      
            templateUrl:'paymentfin.html',                      
            controller:'listcontroller',                
            size: 'md'
        })
    
    }

    // console.log(selectedusername)
    $scope.pay=function(){
        // console.log(selectedusername)
        $http({
            method:'post',
            url:'fin2stutransaction.php',
            data:{
                amount:$scope.amount,
                students:selectedusername
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response){

            $scope.status=response.data.status;
            $scope.msg=response.data.message;
            console.log(response.data)
            if(response.data.status==1){
            $scope.$dismiss('close')         
            }else{
                // console.log($scope.msg)
                // console.log($scope.status)
                console.log(response.data)
            }

        })

    }
    $http({
        method:'get',
        url:'getallstudents.php'
    }).then(function(response){
        $scope.students = response.data;
   

    })
    setInterval(function(){
        $http({
            method:'get',
            url:'getallstudents.php'
        }).then(function(response){
            $scope.students = response.data;
            
        })
    
    },2000)
    
   

    $scope.select=function(b){
        console.log(b)
        if(selectedusername.indexOf(b)>=0){
            selectedusername.splice(selectedusername.indexOf(b),1);
            document.getElementById(b).className="btn btn-danger";
            document.getElementById(b).innerHTML="Not Selected";
        }else{
        selectedusername.push(b);
        document.getElementById(b.toString()).className="btn btn-success";
            document.getElementById(b).innerHTML="Selected";
        }
        console.log(selectedusername)
    }
    $scope.listofstudents=function(){
       location.reload(true);
    }
    $scope.home=function(){      
        $window.location.href="/portal/finteam";
    }
    $scope.addoffers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addoffer.html',
            controller:'addingoffer',
            size: 'md'
                })
    }
    $scope.offers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'select.html',
            controller:'sv',
            size: 'md'
                })
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/fintransactions";
    }
    $scope.cg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'creategroup.html',
            controller:'creategroup',
            size: 'md'
                })
        
    }
    $scope.am=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addmember.html',
            controller:'addmember',
            size: 'md'
                })
        
    }
    $scope.groupview=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'selectgroup.html',
            controller:'groupofstuds',
            size: 'md'
                })
    }
$scope.close=function(){
    $scope.$dismiss('close');
}
$scope.pg=function(){
    $scope.modalInstance=$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl:'paytogroup.html',
        controller:'pg',
        size: 'md'
            })
}
    $scope.logout=function(){

        $http({
            method:'get',
            url:'finlogout.php'
        }).then(function(resp){
            registered=false
            $window.location.href='/portal/loginafterreg'
        })

    }


})
y.controller("sv",function($scope,$http,$window){
$scope.go=function(){
    $http({
        method:'post',
        url:'selectvendor.php',
        data:{
            sv:$scope.vend
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(function(r){
            if(r.data.status==1){
                $scope.$dismiss('close')
                $window.location.href="/portal/offerfin"
            }
    })
}
$scope.close=function(){
    $scope.$dismiss('close')
}
})
y.controller("addingoffer",function($scope,$http,$window){
    $scope.add=function(){
        $http({
            method:'post',
            url:'addoffer.php',
            data:{
                vend:$scope.vend,
                price:$scope.price,
                description:$scope.description
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(r){
            console.log(r.data)
            if(r.data.status==1){
                $scope.$dismiss('close')
                $window.location.href="/portal/offerfin"
            }
        })
    }
    
    $scope.close=function(){
        $scope.$dismiss('close')
    }
        
    })
    
y.controller("offercontrollerfin",function($scope,$http,$window,$uibModal){
    $http({
        method:'get',
        url:'finoffers.php'
    }).then(function(r){
        $scope.o=r.data
    })
    setInterval(function(){
        $http({
            method:'get',
            url:'finoffers.php'
        }).then(function(r){
            $scope.o=r.data
        })
    },3000)
    $scope.home=function(){
        $window.location.href="/portal/finteam";
    }

    $scope.listofstudents=function(){
        $window.location.href="/portal/studentslist"
    }
    $scope.addoffers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addoffer.html',
            controller:'addingoffer',
            size: 'md'
                })
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/fintransactions"
    }
    $scope.cg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'creategroup.html',
            controller:'creategroup',
            size: 'md'
                })
        
    }
    $scope.am=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addmember.html',
            controller:'addmember',
            size: 'md'
                })
        
    }
    $scope.pg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'paytogroup.html',
            controller:'pg',
            size: 'md'
                })
    }
    $scope.close=function(){
        $scope.$dismiss('close');
    }
    $scope.remove=function(m,n){

        $http({
            method:'post',
            url:'selectremoved.php',
            data:{
                price:m,
                description:n
            },
            headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(r){
            console.log(r.data)
            if(r.data.status==1){
                $scope.con=$uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl:'removeoffer.html',
                    controller:'offercontrollerfin',
                    size: 'sm'         
                })
            }
        })

    }
    
    $scope.confirm=function(){
        
        $http({
            method:'get',
            url:'removeoffer.php'
        }).then(function(r){

            console.log(r.data)
            
            if(r.data.status==1){
                $scope.$dismiss('close')
                $scope.modalInstance=$uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl:'removed.html',
                    controller:'offercontrollerfin',
                    size: 'sm'
                        })
            }


        })
    }
    $scope.offers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'select.html',
            controller:'sv',
            size: 'md'
                })
    }
    $scope.groupview=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'selectgroup.html',
            controller:'groupofstuds',
            size: 'md'
                })
    }
    $scope.logout = function(){  
        $http({
            method:'get',
            url:'finlogout.php'
        }).then(function(resp){
            registered=false
            $window.location.href='/portal/loginafterreg'
        })
}
})
y.controller("pg",function($scope,$http,$window,$uibModal){
    $http({
        method:'post',
        url:'listgroups.php'
    }).then(function(r){
        $scope.groups=r.data.names
        
    })
    $scope.submit=function(){
        $http({
            method:'post',
            url:'paytogroup.php',
            data:{
                groupname:$scope.groupname,
                amount:$scope.amount
            },
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).then(function(resp){
            console.log(resp)
                if(resp.data.status==1){
                   
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'grouppaysuccess.html',
                        controller:'pg',
                        size: 'md'
                            })
                }
                else{
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'grouppayfail.html',
                        controller:'pg',
                        size: 'md'
                            })
                }
        })
    }
    $scope.close=function(){
        $scope.$dismiss('close')
    }
    
})
y.controller("creategroup",function($scope,$http,$window,$uibModal){

    $scope.submit=function(){
            $http({
                method:'post',
                url:'creategroup.php',
                data:{
                    groupname:$scope.groupname
                },
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }).then(function(r){
               
                $scope.status=r.data.status                
                if(r.data.status==1){
                    $scope.$dismiss('close')
                    $scope.modalInstance=$uibModal.open({
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl:'groupsuccess.html',
                        controller:'creategroup',
                        size: 'md'
                            })  
                }
            })
    }

$scope.close=function(){
    $scope.$dismiss('close')
}
})
y.controller("groups",function($scope,$http,$window,$uibModal){

    $http({
        method:'get',
        url:'groupview.php'
    }).then(function(r){
        console.log(r)
        $scope.userdata=r.data.details
        $scope.groupname=r.data.groupname
    })
    $scope.home=function(){
        $window.location.href="/portal/finteam";
    }

    $scope.listofstudents=function(){
        $window.location.href="/portal/studentslist"
    }
    $scope.addoffers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addoffer.html',
            controller:'addingoffer',
            size: 'md'
                })
    }
    $scope.listoftransactions=function(){
        $window.location.href="/portal/fintransactions"
    }
    $scope.cg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'creategroup.html',
            controller:'creategroup',
            size: 'md'
                })
        
    }
    $scope.am=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addmember.html',
            controller:'addmember',
            size: 'md'
                })
        
    }
    $scope.pg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'paytogroup.html',
            controller:'pg',
            size: 'md'
                })
    }
    $scope.close=function(){
        $scope.$dismiss('close');
    }
    $scope.offers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'select.html',
            controller:'sv',
            size: 'md'
                })
    }
    $scope.groupview=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'selectgroup.html',
            controller:'groupofstuds',
            size: 'md'
                })
    }
    $scope.logout = function(){  
        $http({
            method:'get',
            url:'finlogout.php'
        }).then(function(resp){
            registered=false
            $window.location.href='/portal/loginafterreg'
        })
}
})
y.controller("groupofstuds",function($scope,$http,$window){


    $http({
        method:'post',
        url:'listgroups.php'
    }).then(function(r){
        $scope.groups=r.data.names
        
    })

    $scope.submit=function(){

        $http({
            method:"post",
            url:"groupview.php",
            data:{
                groupname:$scope.groupname
            },
            headers:{"Content-Type":"application/x-www-form-urlencoded"}
        }).then(function(r){

            if(r.data.status==1){
                $scope.$dismiss('close')
                $window.location.href="/portal/groupview"
            }


        })
    }
    

})
y.controller("addmember",function($scope,$http,$window,$uibModal){
    $http({
        method:'post',
        url:'listgroups.php'
    }).then(function(r){
        $scope.groups=r.data.names
        
    })
    $scope.close=function(){
        $scope.$dismiss('close')
    }
    $scope.submit=function(){
        $http({
            method:'post',
            url:'addmember.php',
            data:{
                groupname:$scope.groupname,
                membername:$scope.membername
            },
            headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).then(function(r){
            $scope.status=r.data.status
            console.log(r)
            if(r.data.status==1){
                $scope.$dismiss('close')
                // $window.location.href="/portal/specificgroup"
            }
            if($scope.status==-1){
                $scope.resp="Error adding the member"
            }
            if($scope.status==0){
                $scope.resp="This member already exists in that group"
            }
            if($scope.status==2){
                $scope.resp="This member hasn't registered yet"
            }
        })
    }


})
y.controller("fintransactions",function($scope,$http,$window,$uibModal){

    $http({
        method:'get',
        url:'getfintransactions.php'
    }).then(function(response){
       $scope.details=response.data;
       console.log(response.data)
    })
setInterval(function(){
    $http({
        method:'get',
        url:'getfintransactions.php'
    }).then(function(response){
       $scope.details=response.data;
    })
},2000)
    $scope.home=function(){
        $window.location.href="/portal/finteam";
    }

    $scope.listofstudents=function(){
        $window.location.href="/portal/studentslist"
    }
    $scope.addoffers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addoffer.html',
            controller:'addingoffer',
            size: 'md'
                })
    }
    $scope.cg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'creategroup.html',
            controller:'creategroup',
            size: 'md'
                })
        
    }
    $scope.pg=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'paytogroup.html',
            controller:'pg',
            size: 'md'
                })
    }
    $scope.am=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'addmember.html',
            controller:'addmember',
            size: 'md'
                })
        
    }
    $scope.listoftransactions=function(){
        location.reload(true);
    }
    $scope.close=function(){
        $scope.$dismiss('close');
    }
    $scope.offers=function(){
        $scope.modalInstance=$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl:'select.html',
            controller:'sv',
            size: 'md'
                })
    }
    $scope.logout = function(){  
        $http({
            method:'get',
            url:'finlogout.php'
        }).then(function(resp){
            registered=false
            $window.location.href='/portal/loginafterreg'
        })
}





})