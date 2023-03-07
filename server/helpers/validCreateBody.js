const validCreateBody = (body) => {
  const validProperties = [
    "name", 
    "has_patio", 
    "cuisine", 
    "neighborhood",
    "lat", 
    "long"
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