
import { useContext, useState, createContext } from "react";

import { template } from "lodash";
import JsonRadio from "./component/Radio";
import JsonTextarea from "./component/Textarea";

export const DataContext = createContext([]);
export const JsonContext = createContext([]);

export default function JsonRenderer({ json, data }) {

    const [internalJson] = useContext(JsonContext);

    if (internalJson) {
        return renderContent(json, data);
    } else {
        const jsonState = useState(json);
        const dataState = useState(data);
        return (
            <JsonContext.Provider value={jsonState}>
                <DataContext.Provider value={dataState}>
                    <JsonRenderer json={jsonState[0]} data={dataState[0]} />
                </DataContext.Provider>
            </JsonContext.Provider>
        );
    }
}


function renderContent(json, data) {
    const { type, body, className, params } = json;

    switch (type) {
        case "radio":
            return <JsonRadio json={json} />;
        case "table":
            return <table className={className}><tbody>{renderBody(body, data)}</tbody></table>;
        case "tr":
            return <tr className={className}>{renderBody(body, data)}</tr>;
        case "th":
            return <th className={className} {...params}>{renderBody(body, data)}</th>;
        case "td":
            return <td className={className}>{renderBody(body, data)}</td>;
        case "textarea":
            return <JsonTextarea json={json} />;
        default:
            return <div className={className}>{renderBody(body, data)}</div>;
    }

}

function renderBody(body, data) {
    const bodyType = getTypeWithRegex(body);

    switch (bodyType) {
        case 'String':
            return renderText(body, data);
        case 'Object':
            return <JsonRenderer json={body} data={data} />;
        case 'Array':
            return body.map((item, index) => <JsonRenderer key={index} json={item} data={data} />);
        default:
            return `wtf:${bodyType}`;
    }
}


function getTypeWithRegex(obj) {
    let typeStr = Object.prototype.toString.call(obj);
    let match = typeStr.match(/\[object (\w+)\]/);
    return match ? match[1] : null;
}

function renderText(text, data) {
    try {
        return template(text)(data);
    } catch (e) {
        return `error: ${e}, text: ${text}`;
    }
}