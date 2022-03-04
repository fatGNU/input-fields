import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../../../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class WebAddressField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.webAddressRegExp = new RegExp(/^[http[s]?]?:\/\/[a-zA-Z0-9]{2,20}.[a-zA-Z0-9.]$/);
        //this should be checked against a country-code if desired.
    }

    /**
     * Check if typed letter is a number and that it's 18 digits long!
     * @param e the value to test out.
     * @returns {boolean} the status of the test. true if it's a number within desired range else false.
     */
    checkIfAddress = (e) => {
        return true;
        // return this.webAddressRegExp.test(e);
    }
    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}
                    style={{width: 'auto', fontSize: '60%'}}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required} ref={this.internalFieldReference} style={{width: '100%', fontSize: '70%'}}
                   name={this.name} type={this.fieldType}
                   onFocus={this.highlightOnFocus} onChange={(e) => {
                if (this.checkIfAddress(e.target.value)) {
                    this.changecallback(e);
                    this.removeContextMessageWarning();
                } else {
                    //pass the target input field to perform this act on.
                    // this.stopTyping();
                    // this.stopTypingOn(e);
                    //show error message box with message there
                    this.showContextMessageWarning("type complete url address!")
                }
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