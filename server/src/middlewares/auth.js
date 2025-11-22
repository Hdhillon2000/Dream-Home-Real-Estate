
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { join } from 'path';

/**
 * Middleware function to authorize incoming requests using JWT tokens.
 * Validates JWT token from either Authorization header (Bearer token) or cookies.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.headers - Request headers
 * @param {string} [req.headers.authorization] - Authorization header containing Bearer token
 * @param {Object} req.cookies - Request cookies
 * @param {string} [req.cookies.token] - JWT token from cookies
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void|Object} Returns 401 response with error message if unauthorized, otherwise calls next()
 * @throws {Error} Returns 401 status with "Internal Server Error (auth)" message on JWT verification failure
 * 
 * @description
 * This middleware performs the following steps:
 * 1. Extracts JWT token from Authorization header (Bearer scheme) or cookies
 * 2. Returns 401 if no token is found
 * 3. Verifies token using ES512 algorithm with public key from 'ec-public-key.pem'
 * 4. Attaches decoded user data to req.user
 * 5. Calls next() to proceed to next middleware
 */
async function isAuthorized(req, res, next) {
  /**@type {string} */let token;
  /**@type {string} */const authheader = req.headers.authorization;

  if (authheader && authheader.startsWith('Bearer ')) token = authheader.split(" ")[1];
  else if (req.cookies.token) token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized: missing token" });

  try {
    const
      publicKey = fs.readFileSync(process.env.NODE_ENV === 'production'
        ? '/etc/secrets/ec-public-key.pem'
        : join(process.cwd(), '../etc/secrets/ec-public-key.pem')),

      decoded = jwt.verify(token, publicKey, { algorithms: ['ES512'] });

    req.user = decoded;
    next();
  }
  catch (e) {
    // console.log("Error in Auth Middleware: ", e);
    return res.status(401).json({ message: "Internal Server Error (auth)" });
  };

};
export default isAuthorized;
