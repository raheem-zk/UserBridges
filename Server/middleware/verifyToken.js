

function VerifyToken(req, res, next){
    let authHeader = req.headers.authorization;
    if (!authHeader){
        return res.jsom({message:"no token provided"});
    }
        let token = authHeader.split(' ')[1];
        const KEY = process.env.SECRECT_KEY;
        jwt.verify(token,KEY,(err, decoded)=>{
            if (err){
                return res.jsom({message:"Authentication Failed"});
            }
            next()
        });
    }

export default VerifyToken;