function requestInfo(req, res, next) {
  console.log("midlware");
  console.log(req.method, req.url, new Date().toISOString());
  next();
}
export default requestInfo;

// მაგალითად GET /products 2025-03-30T08:39:40.776Z
