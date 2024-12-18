import { useContext } from 'react';
import { Textarea } from "@nextui-org/input";
import { set } from 'lodash'

import { DataContext, JsonContext } from "../JsonRenderer";

export default function JsonTextarea({ json }) {

    const [data, setData] = useContext(DataContext);

    const { className, params, events } = json;

    function handleValueChange(v) {
        if (events.onChange) {
            events.onChange.forEach((event) => {
                if (event.action === "setData") {
                    setData(set({ ...data }, event.target, v));
                }
            });
        }
    }

    return <Textarea {...params} className={className} onValueChange={handleValueChange} />
}