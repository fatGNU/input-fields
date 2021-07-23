import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../ColFunction";

/**
 *
 * RangeField defines a type where the props
 *
 */
export default class RangeField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.minimumValue = props.minimumValue === undefined ? 1 : props.minimumValue;
        this.maximumValue = props.maximumValue === undefined ? 60 : props.maximumValue;
        this.smoothnessIndex = props.smoothnessIndex === undefined ? 1/7 : props.smoothnessIndex/7;
        this.defaultValue = props.defaultValue === undefined ? (this.maximumValue - this.minimumValue) / 3 : props.defaultValue;
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         * step={this.smoothnessIndex} should be applied when step is part of the input attributes
         * definition
         *
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}</legend>
            <input style={{border: '1px solid'}} min={this.minimumValue} max={this.maximumValue}
                   ref={this.internalFieldReference} name={this.name} className={"form-check-input"} type={"range"}
                   defaultValue={this.defaultValue}
                   onFocus={this.highlightOnFocus} onChange={(e) => {
                this.callback(e);
            }
            } onBlur={this.removeHighlightOnBlur}/>
        </fieldset>);
    }
}