export default defineAppConfig({
  pages: ["pages/index/index", "pages/test/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        selectedIconPath: "assets/images/home_selected.png",
        iconPath: "assets/images/home.png",
        text: "工作台"
      },
      {
        pagePath: "pages/test/index",
        selectedIconPath: "assets/images/data_selected.png",
        iconPath: "assets/images/data.png",
        text: "测试"
      }
    ]
  },
  lazyCodeLoading: "requiredComponents"
});
