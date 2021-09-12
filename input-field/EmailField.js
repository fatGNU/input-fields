import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class EmailField extends BaseField{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.emailRegExp = new RegExp(/^[0-9A-Za-z.\-_]{2,20}@[0-9A-Za-z]{2,18}.com|co|[a-zA-Z]{3,5}$/);
    }

    /**
     * Check if typed letter is a number and that it's 18 digits long!
     * @param e the value to test out.
     * @returns {boolean} the status of the test. true if it's a number within desired range else false.
     */
    checkIfEmailAddress = (e) => {
        return this.emailRegExp.test(e);
    }
    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required} ref = {this.internalFieldReference} name = {this.name} type={this.fieldType} onFocus={this.highlightOnFocus} onKeyUp={(e) => {
                if(this.checkIfEmailAddress(e.target.value)){
                    this.changecallback(e);
                    this.removeContextMessageWarning();
                }
                else{
                    //do not withold typing!
                    //pass the target input field to perform this act on.
                    //this does not need on e to quit typing
                    // this.stopTyping();  //do not stop typing because email addresses are required, regardless of their format!
                    // this.stopTypingOn(e);
                    //show error message box with message there
                    this.showContextMessageWarning("email format: identifier@domain_name.domain")
                }
            }
            } defaultValue={this.state.previousValue}
                   onBlur={() => {
                this.evaluateControlOnRequired()
                this.blurCallback();
            }}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    }
}