import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../../../MiscUtils";

/**
 *
 * NumberField defines a type of input field specific to numbers ONLY
 *
 */
export default class NumberField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.numberRegRxp = new RegExp(/^[0-9]{1,18}$/);//this takes care of bank account numbers as well...
    }

    /**
     *
     * @param argument1
     * @param argument2
     * @returns {any[]}
     */
    exampleMethod = (argument1 = Array(), argument2 = Number) => {
        return argument1;

    }
    /**
     * Check if typed letter is a number and that it's 18 digits long!
     * @param e the value to test out.
     * @returns {boolean} the status of the test. true if it's a number within desired range else false.
     */
    checkIfNumber = (e) => {
        return this.numberRegRxp.test(e);
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
                if (this.checkIfNumber(e.target.value)) {
                    this.changecallback(e);
                    this.removeContextMessageWarning();
                } else {
                    //pass the target input field to perform this act on.
                    // this.stopTypingOn(e);
                    this.stopTyping();
                    //show error message box with message there
                    this.showContextMessageWarning("Type only numbers!")
                }
            }
            } defaultValue={this.state.previousValue}
                   onBlur={() => {
                       this.evaluateControlOnRequired()
                       this.blurCallback();
                   }}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    };
}

