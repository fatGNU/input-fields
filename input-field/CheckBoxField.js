import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class CheckBoxField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required} ref={this.internalFieldReference} name={this.name} type={"checkbox"} onFocus={this.highlightOnFocus}
                   onChange={(e) => {
                       this.changecallback(e);
                   }
                   } onBlur={() => {
                this.evaluateControlOnRequired()
                this.blurCallback();
            }}/>
        </fieldset>);
    }
}