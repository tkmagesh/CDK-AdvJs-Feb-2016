var products = [
    {id : 2, name : "Pen", cost : 5, units : 20, category : 1},
    {id : 6, name : "Hen", cost : 100, units : 10, category : 2},
    {id : 4, name : "Den", cost : 50, units : 10, category : 2},
    {id : 1, name : "Ten", cost : 10, units : 5, category : 1},
    {id : 5, name : "Zen", cost : 1000, units : 2, category : 1}
]
/*
- Sort - done
- Filter - done
- Min
- Max
- Sum
- Aggregate
- CountBy - done
- All - done
- Any - done
- GroupBy
*/

function print(msg, fn){
    console.group(msg);
    fn();
    console.groupEnd();
}

print("Defalut List", function(){
    console.table(products);
});

print("Sorting", function(){
    print("Default [products by id]", function(){
        function sort(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++){
                    var product1 = products[i],
                        product2 = products[j];
                    if (product1.id > product2.id){
                        products[i] = products[j];
                        products[j] = product1;
                    }
                }
        }
        sort();
        console.table(products);
    });
    print("Generic Sort [any list by any attribute]", function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++){
                    var product1 = list[i],
                        product2 = list[j];
                    if (product1[attrName] > product2[attrName]){
                        list[i] = list[j];
                        list[j] = product1;
                    }
                }
        }
        print("Products by cost", function(){
            sort(products, "cost");
            console.table(products);
        });
        print("Products by units", function(){
            sort(products, "units");
            console.table(products);
        });
    });
    print("Generic Sort [any list by any comparer]", function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++){
                    var item1 = list[i],
                        item2 = list[j];
                    if (comparerFn(item1, item2) > 0){
                        list[i] = list[j];
                        list[j] = item1;
                    }
                }
        }
        var productComparerByValue = function(p1, p2){
            var p1Value = p1.units * p1.cost,
                p2Value = p2.units * p2.cost;
            return p1Value - p2Value;
        }
        print("Products by value[units * cost]", function(){
            sort(products, productComparerByValue);
            console.table(products);
        });
    });
});

print("Filter", function(){
    print("Filter products by category = 1", function(){
        function filter(){
            var result = [];
            for(var i=0; i<products.length; i++)
                if (products[i].category === 1)
                    result.push(products[i]);
            return result;
        };
        var category1Products = filter();
        console.table(category1Products);
    });
    print("Generic filter (any list by any criteria)", function(){
        function filter(list, criteriaFn){
            var result = [];
            for(var i=0; i<list.length; i++)
                if (criteriaFn(list[i]))
                    result.push(list[i]);
            return result;
        }
        var category1Criteria = function(product){
            return product.category === 1;
        };
        var costlyProductCriteria = function(product){
            return product.cost > 50;
        };

        function negate(criteriaFn){
            return function(){
                return !criteriaFn.apply(this, arguments);
            }
        }
        var nonCategory1Criteria = negate(category1Criteria);

        var affordableProductCriteria = negate(costlyProductCriteria);

        print("All category-1 products", function(){
            var category1Products = filter(products, category1Criteria);
            console.table(category1Products);
        });
        print("All non catgegory-1 products", function(){
            var nonCategory1Products = filter(products, nonCategory1Criteria);
            console.table(nonCategory1Products);
        });

        print("All costly products [cost > 50]", function(){
            var costlyProducts = filter(products, costlyProductCriteria);
            console.table(costlyProducts);
        });

        print("All affordable products [cost <= 50]", function(){
            var affordableProducts = filter(products, affordableProductCriteria);
            console.table(affordableProducts);
        });
    });
});

print("All", function(){
    function all(list, predicate){
        for(var i=0; i<list.length; i++)
            if (!predicate(list[i]))
                return false;
        return true;
    }
    print("Are all products costly?", function(){
        console.log(all(products, function(product){ return product.cost > 50;}));
    });
})
print("Any", function(){
    function any(list, predicate){
        for(var i=0; i<list.length; i++)
            if (predicate(list[i]))
                return true;
        return false;
    }
    print("Are any products costly?", function(){
        console.log(any(products, function(product){ return product.cost > 50;}));
    });
});

print("Min", function(){
    function min(list, valueSelectorFn){
        var result = valueSelectorFn(list[0]);
        for(var i=1; i<list.length; i++){
            var value = valueSelectorFn(list[i]);
            if (value < result) result = value;
        }
        return result;
    }
    var minCost = min(products, function(product){ return product.cost});
    console.log("Min cost = ", minCost);
});
print("Max", function(){
    function max(list, valueSelectorFn){
        var result = valueSelectorFn(list[0]);
        for(var i=1; i<list.length; i++){
            var value = valueSelectorFn(list[i]);
            if (value > result) result = value;
        }
        return result;
    }
    var maxCost = max(products, function(product){ return product.cost});
    console.log("Max cost = ", maxCost);
});
print("Sum", function(){
    function sum(list, valueSelectorFn){
        var result = 0;
        for(var i=0; i<list.length; i++){
            result += valueSelectorFn(list[i]);
        }
        return result;
    }
    var sumOfUnits = sum(products, function(product){ return product.units});
    console.log("Sum of units = ", sumOfUnits);
});
print("Aggregate", function(){
    function aggregate(list, aggregator, seed){
        var start = 0,
            result = seed;
        if (seed === undefined){
            start = 2;
            result = aggregator(list[0], list[1]);
        }
        for(var i=start; i<list.length; i++){
            result = aggregator(result, list[i]);
        }
        return result;
    }

    var minCost = aggregate(products, function(result, product){
        return result < product.cost ? result : product.cost;
    }, Number.MAX_VALUE);
    console.log("min cost = ", minCost);

    var maxCost = aggregate(products, function(result, product){
        return result > product.cost ? result : product.cost;
    }, Number.MIN_VALUE);
    console.log("max cost = ", maxCost);

    var sumOfUnits = aggregate(products, function(result, product){
        return result += product.units;
    },0);
    console.log("sum of units = ", sumOfUnits);

    var cheapestProduct = aggregate(products, function(result, product){
        return result.cost < product.cost ? result : product;
    });
    console.log(cheapestProduct);

    var sumResult = aggregate(products, function(result, product){
        return {
            count : ++result.count,
            totalCost : result.totalCost + product.cost
        }
    }, {count : 0, totalCost : 0});
    var avgCost = sumResult.totalCost / sumResult.count;
    console.log("average cost = ", avgCost);
});
