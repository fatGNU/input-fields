import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../MiscUtils";

// let textFieldReference = Object();
/**
 *
 * NumberField defines a type where the props
 *
 */
export default class TextField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    /**
     * registers a field reference to this instance of component
     */
    componentDidMount() {
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required} ref={this.internalFieldReference} name={this.name} type={this.fieldType}
                   onFocus={this.highlightOnFocus} onChange={(e) => {
                this.changecallback(e);
            }}
                   defaultValue={this.state.previousValue}
                   onBlur={() => {
                this.evaluateControlOnRequired()
                this.blurCallback();
            }}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    }
}