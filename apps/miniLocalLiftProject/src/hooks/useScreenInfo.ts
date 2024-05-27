import Taro from "@tarojs/taro";

interface Dimensions {
  statusBarHeight: number;
  windowHeight: number;
  HeaderHeight: number;
}

const useScreenInfo = (): Dimensions => {
  const systemInfo = Taro.getSystemInfoSync();
  // 状态栏高度
  const statusBarHeight = systemInfo.statusBarHeight || 0;

  // 可使用高度 screen - originTab - orginHeader - originStatus
  const windowHeight = systemInfo.windowHeight || 0;

  // Header高度 自定义的话就是46，不自定义的话不需要引用HeaderHeight
  const HeaderHeight = 46;

  return {
    statusBarHeight,
    windowHeight,
    HeaderHeight
  };
};

export default useScreenInfo;
