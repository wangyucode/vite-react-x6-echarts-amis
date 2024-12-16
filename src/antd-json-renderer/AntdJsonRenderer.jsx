import { RadioGroup, Radio } from "@nextui-org/radio";

import * as lodash from "lodash";

export default function AntdJsonRenderer({ json, data }) {

    const { type, body, className, params } = json;

    const bodyType = getTypeWithRegex(body);

    switch (type) {
        case "radio":
            return (
                <RadioGroup {...params}>
                    {body.map((item) => <Radio key={item.value} value={item.value}>{item.label || item.value}</Radio>)}
                </RadioGroup>
            );
        default:
            switch (bodyType) {
                case 'String':
                    return <div className={className}>{renderText(body, data)}</div>
                case 'Object':
                    return (
                        <div className={className}>
                            <AntdJsonRenderer json={body} />
                        </div>
                    );

                case 'Array':
                    return (
                        <div className={className}>
                            {body.map((item, index) => <AntdJsonRenderer key={index} json={item} />)}
                        </div>
                    );
                default:
                    return <div className={className}>{bodyType}</div>
            }
    }
}


function getTypeWithRegex(obj) {
    let typeStr = Object.prototype.toString.call(obj);
    let match = typeStr.match(/\[object (\w+)\]/);
    return match ? match[1] : null;
}

function renderText(text, data) {
    return lodash.template(text)(data);
}