
function VerifyToken(req, res, next){
    let authHeader = req.headers.authorization;
    console.log(authHeader,'header da');
    if (!authHeader){
        return res.json({message:"no token provided"});
    }
        let token = authHeader.split(' ')[1];
        console.log(token,'verify the token');
        const KEY = process.env.SECRECT_KEY;
        jwt.verify(token,KEY,(err, decoded)=>{
            if (err){
                return res.json({message:"Authentication Failed"});
            }
            next()
        });
    }

export default VerifyToken;