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
    
    async function filterByBrandSize(brand,size){
        let results = await db.manyOrNone("SELECT * FROM products WHERE brand=$1 AND size=$2",[brand,size]);

        return results;
    }

    async function saleMade(productID){
        let record = await db.oneOrNone("SELECT * FROM products WHERE id=$1",productID)
        console.log(record.in_stock);
        let newQty = record.in_stock -1;
        console.log(newQty);
        let data = [
            newQty,
            productID
        ];
        return await db.none("UPDATE products SET in_stock=$1 WHERE id=$2",data);
    }

    return{
        showAll,
        filterByBrand,
        filterBySize,
        filterByBrandSize,
        saleMade
    }
}