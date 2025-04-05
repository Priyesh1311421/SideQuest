const { verifyToken } = require('@clerk/backend');
const User = require('../models/User');

const authenticateClerkUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const payload = await vverifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });

    // Find user or create if doesn't exist
    let user = await User.findOne({ clerkId: payload.sub });

    if (!user) {
      user = await User.create({
        clerkId: payload.sub,
        name: payload.firstName + ' ' + payload.lastName,
        email: payload.emailAddresses[0].emailAddress,
        avatar: payload.imageUrl, // Clerk gives image URL
      });
      console.log('👤 New user created:', user.name);
    }

    req.user = user;
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateClerkUser;
