var products = [
    {id : 2, name : "Pen", cost : 5, units : 20, category : 1},
    {id : 6, name : "Hen", cost : 100, units : 10, category : 2},
    {id : 4, name : "Den", cost : 50, units : 10, category : 2},
    {id : 1, name : "Ten", cost : 10, units : 5, category : 1},
    {id : 5, name : "Zen", cost : 1000, units : 2, category : 1}
]
/*
- Sort
- Filter
- Min
- Max
- Sum
- Aggregate
- CountBy
- All
- Any
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
        print("All category-1 products", function(){
            var category1Products = filter(products, category1Criteria);
            console.table(category1Products);
        });
        var costlyProductCriteria = function(product){
            return product.cost > 50;
        };

        print("All costly products [cost > 50]", function(){
            var costlyProducts = filter(products, costlyProductCriteria);
            console.table(costlyProducts);
        })
    })
});
