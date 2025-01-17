import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

const isAuthorized = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Please login to access this resource"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decodedToken.id);
        next();
    } catch (error) {
        console.log(`isAuthorized middleware Error: ${error}`);
        res.status(400).send({
            success: false,
            message: "Error in isAuthorized middleware",
            error,
        });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = req?.user;

        // Ensure the user is logged in and is an admin (role 1)
        if (!user || user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: "You are not authorized to access this resource"
            });
        }

        // Proceed if the user is an admin
        next();
    } catch (error) {
        console.log(`isAdmin middleware Error: ${error}`);
        res.status(400).send({
            success: false,
            message: "Error in isAdmin middleware",
            error,
        });
    }
};


const isMentor = (req, res, next) => {
    if (req.user.role !== "mentor") {
      return res.status(403).send({
        success: false,
        message: "Mentor access required.",
      });
    }
    next();
  };

  const isMentee = (req, res, next) => {
    if (req.user.role !== "mentee") {
      return res.status(403).send({
        success: false,
        message: "Participant access required.",
      });
    }
    next();
  };

export { isAuthorized, isAdmin, isMentor, isMentee };
