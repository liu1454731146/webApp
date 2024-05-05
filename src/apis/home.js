import httpInstance from "@/utils/http";

// 获取banner
export function getBannerApi() {
  return httpInstance({
    url: "/home/banner",
  });
}

// 获取new
export function getNewApi() {
  return httpInstance({
    url: "/home/new",
  });
}

// 获取hot
export function getHotApi() {
  return httpInstance({
    url: "/home/hot",
  });
}

// 获取product
export function getProductApi() {
  return httpInstance({
    url: "/home/goods",
  });
}
