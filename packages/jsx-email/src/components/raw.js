import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { escapeForRawComponent } from '../renderer/raw.js';
export const Raw = (props) => (_jsx(_Fragment, { children: _jsx("jsx-email-raw", { "data-skip": props.disablePlainTextOutput ? 'true' : void 0, dangerouslySetInnerHTML: { __html: `<!--${escapeForRawComponent(props.content)}-->` } }) }));
Raw.displayName = 'Raw';
//# sourceMappingURL=raw.js.map