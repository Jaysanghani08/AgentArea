const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const token = req.headers.authorization;
        const data = await jwt.verify(token, process.env.JWT_KEY);
        // console.log(data);
        req.user = data;
        next();
    } catch (error) {
        console.log("This is error from ./middleware/auth.js");
        console.log(error);
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};


module.exports = auth;