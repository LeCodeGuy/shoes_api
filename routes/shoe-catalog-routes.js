export default function routes(query){
    async function home(req,res){
        res.render('home',{
            tabTitle:'Home - Shoe Catalogue',
            pageTitle:'Welcome to Lubabalo\'s Shoes',
        });
    }

    return{
        home,
    }
}