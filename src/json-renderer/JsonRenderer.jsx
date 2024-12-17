
import { useContext, useState, createContext } from "react";
import { Textarea } from "@nextui-org/input";
import { template } from "lodash";
import JsonRadio from "./component/Radio";

export const DataContext = createContext(null);

export default function JsonRenderer({ json, data }) {

    const dataContext = useContext(DataContext);

    if (dataContext) {
        return renderContent(json, dataContext);
    } else {
        const [internalData, setInternalData] = useState(data);
        return (
            <DataContext.Provider value={{ internalData, setInternalData }}>
                <JsonRenderer json={json} data={internalData} />
            </DataContext.Provider>
        );
    }
}


function renderContent(json, dataContext) {
    const { type, body, className, params } = json;

    switch (type) {
        case "radio":
            return <JsonRadio json={json} />;
        case "table":
            return <table className={className}><tbody>{renderBody(body, dataContext.internalData)}</tbody></table>;
        case "tr":
            return <tr className={className}>{renderBody(body, dataContext.internalData)}</tr>;
        case "th":
            return <th className={className} {...params}>{renderBody(body, dataContext.internalData)}</th>;
        case "td":
            return <td className={className}>{renderBody(body, dataContext.internalData)}</td>;
        case "textarea":
            return <Textarea className={className}  {...params} />;
        default:
            return <div className={className}>{renderBody(body, dataContext.internalData)}</div>;
    }

}

function renderBody(body, internalData) {
    const bodyType = getTypeWithRegex(body);

    switch (bodyType) {
        case 'String':
            return renderText(body, internalData);
        case 'Object':
            return <JsonRenderer json={body} data={internalData} />;
        case 'Array':
            return body.map((item, index) => <JsonRenderer key={index} json={item} data={internalData} />);
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