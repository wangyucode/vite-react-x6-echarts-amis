import { useContext } from 'react';
import { RadioGroup, Radio } from "@nextui-org/radio";
import { set, template } from 'lodash'

import { DataContext, JsonContext } from "../JsonRenderer";

export default function JsonRadio({ json }) {

    const [ui, setUi] = useContext(JsonContext);
    const [data, setData] = useContext(DataContext);
    const { body, className, params, events } = json;

    function handleValueChange(v) {
        if (events.onChange) {
            events.onChange.forEach((event) => {
                if (event.action === "setData") {
                    setData(set({ ...data }, event.target, v));
                }
                if (event.action === "setUi") {
                    setUi(set({ ...ui }, event.target, template(event.expression)({ value: v })));
                }
            });
        }
    }

    return (
        <RadioGroup {...params} className={className} onValueChange={handleValueChange}>
            {body.map((item) => <Radio key={item.value} value={item.value}>{item.label || item.value}</Radio>)}
        </RadioGroup>
    )
}