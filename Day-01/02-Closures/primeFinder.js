/*
Create a function that checks if the given number is a prime number or not.
The algorithm should not be executed for a given number more than once


isPrime(101) - run
isPrime(102) - run
isPrime(100) - run

isPrime(102) - no run
*/

var isPrime = (function(){
    var cache = {};
    function checkPrime(n){
        console.log('processing ', n);
        if (n <= 3) return true;
        for(var i=2; i<= (n/2); i++)
            if (n % i === 0) return false;
        return true;
    }
    return function(n){
        if (cache[n] === undefined)
            cache[n] = checkPrime(n);
        return cache[n];
    }
})();

var oddOrEven = (function(){
    var cache = {};
    function checkOddOrEven(n){
        console.log('processing ', n);
        return n % 2 === 0 ? "even" : "odd";
    }
    return function(n){
        if (cache[n] === undefined)
            cache[n] = checkOddOrEven(n);
        return cache[n];
    }
})();

function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (cache[key] === undefined)
            cache[key] = fn.apply(this,arguments);
        return cache[key];
    }
}

var oddOrEven = memoize(function checkOddOrEven(n){
    console.log('processing ', n);
    return n % 2 === 0 ? "even" : "odd";
});

var isPrime = memoize(function checkPrime(n){
    console.log('processing ', n);
    if (n <= 3) return true;
    for(var i=2; i<= (n/2); i++)
        if (n % i === 0) return false;
    return true;
});
