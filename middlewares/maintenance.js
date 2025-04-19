function maintenance(req, res, next) {
  if (process.env.MAINTENANCE) {
    return res.status(503).send("Site under maintenance");
  }
  next();
}

export default maintenance;
