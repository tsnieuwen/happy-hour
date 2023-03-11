const validCreateBody = (body) => {
  try{

  }catch(err){

  }
  const validProperties = [
    "item",
    "price",
    "percent_off",
    "description",
    "start_time",
    "end_time",
    "weekday",
    "category",
    "restaurant_id"
  ];

  const bodyKeys = Object.keys(body);
  const missingProperties = [];

  validProperties.forEach((property) => {
    if (!bodyKeys.includes(property)) missingProperties.push(property);
  })

  return missingProperties;
}

module.exports = {
  validCreateBody
}