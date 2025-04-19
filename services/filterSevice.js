const filterService = (query, reqQuery) => {
  let filterdQuerry = query;
  const productQueryFilters = [
    "name",
    "price",
    "description",
    "stocki",
    "slug",
  ];
  const filters = {};

  productQueryFilters.forEach((el) => {
    if (reqQuery[el]) filters[el] = reqQuery[el];
  });

  filterdQuerry = query.find(filters);

  if (reqQuery.sort) {
    filterdQuerry = filterdQuerry.sort(reqQuery.sort);
  }

  if (reqQuery.fields) {
    filterdQuerry = filterdQuerry.select(reqQuery.fields.split(",").join(" "));
  }

  const page = reqQuery.page * 1 || 1;
  const limit = reqQuery.limit * 1 || 100;
  const skip = (page - 1) * limit;
  filterdQuerry = filterdQuerry.skip(skip).limit(limit);
  return filterdQuerry;
};

export default filterService;
