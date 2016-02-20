//Revealing Module Pattern
var patterns = (function(){

    /* Sync */
    function addSync(x,y){
        console.log("[Provider] processing ", x , " and ", y);
        var result = x + y;
        console.log("[Provider] returning the result");
        return result;
    }

    function addSyncClient(x,y){
        console.log("[Consumer] trigger addSync");
        var result = addSync(x,y);
        console.log("[Consumer] result = ", result);
    }

    /* Async - callbacks */
    function addAsyncUsingCallback(x,y, onResult){
        console.log("[Provider] processing ", x , " and ", y);
        setTimeout(function(){
            var result = x + y;
            console.log("[Provider] returning the result");
            if (typeof onResult === 'function')
                onResult(result);
        },5000);
    }

    function addAsyncUsingCallbackClient(x,y){
        console.log("[Consumer] trigger addAsyncUsingCallback");
        addAsyncUsingCallback(x,y, function(result){
            console.log("[Consumer] result = ", result);
        });
    }

    /* Async - Events */
    var addAsyncUsingEvents = (function(){
        var onResultCallbacks = [];
        function add(x,y){
            console.log("[Provider] processing ", x , " and ", y);
            setTimeout(function(){
                var result = x + y;
                console.log("[Provider] returning the result");
                onResultCallbacks.forEach(function(callback){
                    if (typeof callback === 'function')
                        callback(result);
                });
            },5000);
        }
        function onResult(callback){
            onResultCallbacks.push(callback);
        }
        return {
            add : add,
            onResult : onResult
        };
    })();

    /*var addAsyncUsingPromise = function(x, y){

        var promise = new Promise(function(resolve, reject){
            console.log("[Provider] processing ", x , " and ", y);
            setTimeout(function(){
                var result = x + y;
                console.log("[Provider] returning the result");
                resolve(result);
            },5000);
        });

        return promise;
    };*/

    var addAsyncUsingPromise = function(x, y){

        var deferred = Promise.defer();
        console.log("[Provider] processing ", x , " and ", y);
        setTimeout(function(){
            var result = x + y;
            console.log("[Provider] returning the result");
            deferred.resolve(result);
        },5000);
        return deferred.promise;
    };

    var addAsyncUsingCancellable = function(x, y){

        var deferred = Promise.defer();
        var cancelled = false;
        console.log("[Provider] processing ", x , " and ", y);
        var timer = setTimeout(function(){
            var result = x + y;
            console.log("[Provider] returning the result");
            if (!cancelled)
                deferred.resolve(result);
        },5000);
        var cancellablePromise = {
           cancel : function(){
               clearTimeout(timer);
               cancelled = true;
           },
           promise : deferred.promise
        };
        return cancellablePromise;
    };


    return {
        addSyncClient : addSyncClient,
        addAsyncUsingCallbackClient : addAsyncUsingCallbackClient,
        addAsyncUsingEvents : addAsyncUsingEvents,
        addAsyncUsingPromise : addAsyncUsingPromise,
        addAsyncUsingCancellable : addAsyncUsingCancellable
    };
})();

/*function getBugs(){
   var deferred = Promise.defer();
   var myPromise = deferred.promise;

   var fetchPromise = fetch("http://localhost:3000/bugs");
   fetchPromise.then(function(response){
     var p = response.json();
     p.then(function(data){
        deferred.resolve(data);
     });
   });
   return myPromise;
}*/

/*
function getBugs(){
   var fetchPromise = fetch("http://localhost:3000/bugs")
   var myPromise = fetchPromise.then(function(response){
       var jsonPromise = response.json();
       var dataPromise = jsonPromise.then(function(data){
          return data;
       });
       return dataPromise;
   });
   return myPromise;
 }
*/

function getBugs(){
   return fetch("http://localhost:3000/bugs")
    .then(function(response){
       return response.json().then(function(data){
          return data;
       });
   });
 }

 function getProject(){
     return fetch("http://localhost:3000/projects/1")
        .then(function(response){
         return response.json().then(function(data){
             return data;
         });
     });
 }


function printBugs(){
   var getBugsPromise = getBugs();
   getBugsPromise.then(function(bugs){
     console.table(bugs);
   });
}

//Promise chaining
getProject().then(function(project){
  console.log("project = ", project);
  return getBugs().then(function(bugs){
      return bugs;
  });
}).then(function(bugs){
    console.table(bugs);
});

//Joining promises
Promise
  .all([getProject(), getBugs()])
  .then(function(result){
      console.log(result[0]);
      console.table(result[1]);
   });
