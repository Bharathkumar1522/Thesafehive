export const getEnvConfig = () => {
    const { VITE_SPACE_ID, VITE_ACCESS_TOKEN, VITE_CONTENT_TYPE } = import.meta.env;
    if (!VITE_SPACE_ID || !VITE_ACCESS_TOKEN || !VITE_CONTENT_TYPE) {
      throw new Error('Missing Contentful config in .env');
    }
    return { VITE_SPACE_ID, VITE_ACCESS_TOKEN, VITE_CONTENT_TYPE };
  };