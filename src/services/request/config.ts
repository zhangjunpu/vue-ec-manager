const baseUrlDev = "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api";
const baseUrlProduct = "http://cloud-music.pl-fe.cn/";

export const baseURL = process.env.NODE_ENV === "development" ? baseUrlDev : baseUrlProduct;
export const timeout = 5000;
