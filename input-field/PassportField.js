import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "./base/ColFunction";

/**
 *
 * NumberField defines a type of input field specific to numbers ONLY
 *
 */
export default class PassportField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.callback = props.callback;
        // this.numberRegRxp = new RegExp(/^A[1-5]|B[1-5]|C[1-5]|P|P[A-C][A-Za-z0-9]{1,15}$/);
        this.numberRegRxp = new RegExp(/^A[A-Z]|B[A-Z]|C[A-Z][0-9]{6,8}$/);
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
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}</legend>
            <input ref = {this.internalFieldReference} name = {this.name} type={this.fieldType} onFocus={this.highlightOnFocus} onChange={(e) => {
                if (this.checkIfNumber(e.target.value)) {
                    this.callback(e);
                    this.removeContextMessageError();
                } else {
                    //pass the target input field to perform this act on.
                    this.stopTyping();
                    // this.stopTypingOn(e);
                    //show error message box with message there
                    this.showContextMessageError("Type only numbers!")
                }
            }
            } onBlur={this.removeHighlightOnBlur}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    };
}

