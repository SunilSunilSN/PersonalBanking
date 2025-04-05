const RolesHandler = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if(!roles.includes(userRole)) {
            return res.status(440).json({
                success: false,
                message: "Access Denied: You do not have permission to access this resource",
              });
        };
        next();
    };
};

module.exports = RolesHandler;