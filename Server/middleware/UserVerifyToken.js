
// import jwt from 'jsonwebtoken';

// function VerifyToken(req, res, next, requiredRole) {
//   console.log(req.headers)
//   const token = req.headers.authorization; 

//         let tokenRef = token.split(' ')[1];
//         const KEY = process.env.SECRECT_KEY;
//         if (!token) {
//           return res.status(401).json({ message: 'Token missing' });
//         }
      
//         jwt.verify(token, KEY, (err, decoded) => {
//           console.log(decoded,'decoded.......');
//           if (err) {
//             return res.status(403).json({ message: 'Invalid token' });
//           }
      
//           if (decoded.role !== requiredRole) {
//             return res.status(403).json({ message: 'Insufficient privileges' });
//           }
      
//           // req.user = decoded;
//           next();
//         });
//   }
  
  // export default VerifyToken;
  

import jwt from 'jsonwebtoken';

function VerifyToken(req, res, next) {
    const token = req.headers.authorization; 
    console.log(req.headers)
    if (!token) {
      return res.status(401).json({
        message: 'Token is missing',
      });
    } else {
        let tokenRef = token.split(' ')[1];
        const KEY = process.env.SECRECT_KEY;
        jwt.verify(tokenRef,KEY,(err, decoded)=>{
          console.log(decoded,' decoded')
            if (err){
                return res.json({message:"Authentication Failed"});
            }
            if(!decoded.role ==='user'){
              return res.json({message:"Insufficient privileges'"});
            }
            console.log('success for verification')
            next();
        })
    }
  }
  
  export default VerifyToken;
  