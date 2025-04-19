import slugify from "slugify";

function productSlagify(req, res, next) {
  const { name } = req.body;
  req.body.slug = slugify(name, { lower: true });
  next();
}

export default productSlagify;
