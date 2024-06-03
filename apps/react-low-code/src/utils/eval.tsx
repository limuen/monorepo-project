import React from "react";
import { Tooltip } from "antd";
import dayjs from "dayjs";

// 不在此调用一下会被Tree-Shaking，在下面eval使用到的模块比如dayjs会报不存在错误
dayjs();
<Tooltip />;
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
React;

export const $eval = (string: string) => {
  return eval(string);
};
