const nodeEnv = process.env.REACT_APP_NODE_ENV || 'development';
const primaryColor = process.env.REACT_APP_PRIMARY_COLOR || '#0062A9';
const secondaryColor = process.env.REACT_APP_SECONDARY_COLOR || '#4a148c';
const baseURL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:84';
const defaultPage = process.env.REACT_APP_DEFAULT_PAGE ? parseInt(process.env.REACT_APP_DEFAULT_PAGE) : 1;
const defaultLimit = process.env.REACT_APP_DEFAULT_LIMIT ? parseInt(process.env.REACT_APP_DEFAULT_LIMIT) : 20;

const envConfig = {
  nodeEnv,
  baseURL,
  primaryColor,
  secondaryColor,
  defaultPage,
  defaultLimit,
};

export { envConfig };
