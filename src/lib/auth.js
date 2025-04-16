import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '4d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createSellerToken = (seller) => {
  return jwt.sign({ id: seller._id, email: seller.email }, process.env.SELLER_JWT_SECRET, {
    expiresIn: '4d',
  });
};

export const verifySellerToken = (token) => {
  return jwt.verify(token, process.env.SELLER_JWT_SECRET);
};
