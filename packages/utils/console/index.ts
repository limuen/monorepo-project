import { isString } from "../is";

interface LogConfigIF {
  name: string;
  theme: logConfigThemeIF;
}

interface logConfigThemeIF {
  color: string;
  backgroundColor?: string;
}

const logTypes = {
  DEBUG: {
    name: "DEBUG",
    theme: {
      color: "#ff976a"
    }
  },
  INFO: {
    name: "INFO",
    theme: {
      color: "#1989fa"
    }
  },
  WARN: {
    name: "WARN",
    theme: {
      color: "#ff976a",
      backgroundColor: "#ffeae1"
    }
  },
  ERROR: {
    name: "ERROR",
    theme: {
      color: "#ee0a24",
      backgroundColor: "#fcced3"
    }
  }
};

// 开发工具中使用 css 来区分不同日志的样式
const createLogStyle = (theme: logConfigThemeIF) => {
  let style = `padding: 5px 0;border-radius: 5px;color: ${theme.color};`;
  if (theme.backgroundColor) {
    style += `padding: 5px;background-color: ${theme.backgroundColor};`;
  }
  return style;
};

// 添加一段信息用于标记是应用输出的日志
const createLogPrefix = (type: LogConfigIF, moduleName: string) => {
  let message = `[${import.meta.env.VITE_APP_PROJECT_NAME}][${type.name}]`;
  if (moduleName) {
    message += `[${moduleName}]`;
  }
  return message;
};

// 在开发工具中输出日志
const _printLogInDevTools = (messages: any, theme: logConfigThemeIF) => {
  const title = messages[0];
  messages[0] = `%c${title}`;
  messages.splice(1, 0, createLogStyle(theme));
  console.log(...messages);
};
// 打印日志
const _printLog = (type: LogConfigIF, messages: any) => {
  // 生产环境下不执行
  if (!import.meta.env.VITE_USER_NODE_ENV) {
    return;
  }
  const title = isString(messages[0]) ? messages[0] : "";
  let moduleName = "";
  if (title && title.match(/^@/)) {
    moduleName = messages.shift().replace("@", "");
  }
  messages.unshift(createLogPrefix(type, moduleName));
  _printLogInDevTools(messages, type.theme);
};

export const logInfo = (...rest: any) => _printLog(logTypes.INFO, rest);
export const logDebug = (...rest: any) => _printLog(logTypes.DEBUG, rest);
export const logWarn = (...rest: any) => _printLog(logTypes.WARN, rest);
export const logError = (...rest: any) => _printLog(logTypes.ERROR, rest);
