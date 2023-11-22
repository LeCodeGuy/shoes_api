export default function productService(db){
    async function showAll(){
        let results = await db.manyOrNone("SELECT * FROM Products");

        return results;
        
    }

    async function filterByBrand(brand){
        let results = await db.manyOrNone("SELECT * FROM products WHERE brand=$1",[brand]);

        return results;
    }
    
    async function filterBySize(size){
        let results = await db.manyOrNone("SELECT * FROM products WHERE size=$1",[size]);

        return results;
    }

    async function filterByColor(color){
        let results = await db.manyOrNone("SELECT * FROM products WHERE color=$1",[color]);

        return results;
    }
    
    async function filterByBrandSize(brand,size){
        let results = await db.manyOrNone("SELECT * FROM products WHERE brand=$1 AND size=$2",[brand,size]);

        return results;
    }

    async function saleMade(productID){
        let record = await db.oneOrNone("SELECT * FROM products WHERE id=$1",productID)
        let newQty = record.in_stock -1;
        let data = [
            newQty,
            productID
        ];

        if(newQty >= 0){
            return await db.none("UPDATE products SET in_stock=$1 WHERE id=$2",data);
        }
        else{
            return "out of stock";
        }
        
    }

    async function addStock(stockData){
        const color = stockData.color
        const brand = stockData.brand
        const price = stockData.price
        const size = stockData.size
        const in_stock = stockData.in_stock
        
        return await db.none("INSERT INTO products (id,color,brand,price,size,in_stock) VALUES (DEFAULT,$1,$2,$3,$4,$5)",[color,brand,price,size,in_stock]);
    }

    return{
        showAll,
        filterByBrand,
        filterBySize,
        filterByColor,
        filterByBrandSize,
        saleMade,
        addStock
    }
}