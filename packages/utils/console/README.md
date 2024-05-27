## console.log

控制台 log 信息，仅在开发和测试环境中有效

### 使用方式

```js
import { logInfo, logDebug, logWarn, logError } from "@limuen/mogo-common";

logInfo("@信息", "内容");
logDebug("@信息", "内容");
logWarn("@信息", "内容");
logError("@信息", "内容");
```

**`@`可使用一次，高亮“[信息]”，可传入无限参数**
