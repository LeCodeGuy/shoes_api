export default function ProductsAPI(productService){
    
    // List all shoes in stock
    async function showAll(req, res, next){
        try {
            let results = await productService.showAll();

            res.json({
                status: 'success',
                data: results
            });
        }
        catch (err) {
            next(err);
        }
    }
    // List all shoes for a given brand
    async function filterByBrand(req, res, next){
        let brand = req.params.brandname;

        try{
            let results = await productService.filterByBrand(brand);

            res.json({
                status: 'success',
                data: results
            });
        }
        catch (err) {
            next(err.stack);
        }
    }

    // List all shoes for a given size
    async function filterBySize(req, res, next){
        let size = req.params.size;

        try{
            let results = await productService.filterBySize(size);

            res.json({
                status: 'success',
                data: results
            });
        }
        catch (err) {
            next(err.stack);
        }
    }
    
    // List all shoes for a given brand and size
    async function filterByBrandSize(req, res, next){
        let brand = req.params.brandname;
        let size = req.params.size;

        try{
            let results = await productService.filterByBrandSize(brand,size);

            res.json({
                status: 'success',
                data: results
            });
        }
        catch (err) {
            next(err.stack);
        }
    }

    async function saleMade(req, res){
        const id = req.body.id;

        try{

            let result = await productService.saleMade(id);
            
            res.json({
                status: 'success'
            });
        }
        catch(err){
            res.json({
				status: "error",
				error: err.stack
			});
        }
    }

    async function addStock (req,res,next){
        const data = req.body
        try{

            await productService.addStock(data);
            
            res.json({
                status: 'success',
            });
        }
        catch(err){
            res.json({
				status: "error",
				error: err.stack
			});
        }
    }

    return{
        showAll,
        filterByBrand,
        filterBySize,
        filterByBrandSize,
        saleMade,
        addStock
    }
}