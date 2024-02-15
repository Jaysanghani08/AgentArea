const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header("cookie");
        const data = await jwt.verify(token, process.env.ADMIN_JWT_KEY);
        req.user_id = data.phone;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};


module.exports = auth;