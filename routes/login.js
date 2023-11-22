export default function login(){
    // login page load functionality
    async function getLogin(req,res){
        res.render('login');
    }
    // function called once login form is submitted
    async function postLogin(req,res){
        try {
            const {username,password} = req.body;
            const validatedAccount = await userService.accountValidation({username,password});

            if(validatedAccount){
                req.session.username = username;
                req.session.userType = validatedAccount.role;
                req.session.userID = validatedAccount.userId;

                if(validatedAccount.role === 'Admin'){
                    // Redirect to the addShoes.handlebars
                    res.redirect('/shoes/add'); 
                }
                else{
                    res.redirect('/')
                }
            }
            else{
                throw new Error("Invalid credentials");
            }

        } catch (error) {
            console.error("Login error:", error);
            res.status(400).send(error.message);
        }
    }

    return{
        getLogin,
        postLogin
    }
}