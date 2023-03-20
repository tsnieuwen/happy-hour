const validDealBody = (body) => {

  const validProperties = [
    "item",
    "price",
    "percent_off",
    "description",
    "start_time",
    "end_time",
    "weekday",
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
  validDealBody
}