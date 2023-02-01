import {createProxyMiddleware} from "http-proxy-middleware"
export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: import.meta.env.REACT_APP_BACKEND_SERVER,
      changeOrigin: true,
    })
  );
};