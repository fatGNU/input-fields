import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../../../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class RadioField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`form-group border`} >
            <legend className={`${this.state.selection} w-auto`}
                    style={{width: 'auto', fontSize: '90%'}}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required}
                   ref={this.internalFieldReference}
                   style={{width: 4, height: 4, fontSize: '70%', ...this.props.style}}
                   name={this.name}
                   className={"form-check-input"}
                   type={"radio"}
                   onFocus={this.highlightOnFocus}
                   onChange={(e) => {
                       this.changecallback(e);
                   }}
                   checked={this.state.previousValue}
                   onBlur={() => {
                       this.evaluateControlOnRequired()
                       this.blurCallback();
                   }}/>
        </fieldset>);
    }
}