const validateDomain = (name) => {
  const expression =
    /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!name) {
    return "Please provide domain name";
  } else {
    if (regex.test(name)) {
      if (name.match(!regex)) {
        return "Use accepted formats for example google.com, domain.ug";
      }
    } else {
      return "Domain name should start with a letter";
    }
  }
};

export default validateDomain;
