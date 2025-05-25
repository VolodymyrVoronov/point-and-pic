const checkURLParams = (params: string[]): boolean => {
  return params.every((param) => window.location.hash.includes(param));
};

export default checkURLParams;
