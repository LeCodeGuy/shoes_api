export default function productRoutes(productService){
    async function showAll(req, res, next){
        try {
            let results = await productService.all();

            res.render('', {
                results,
            })

        }
        catch (err) {
            next(err);
        }
    }
    
    return{
        showAll,
    }
}