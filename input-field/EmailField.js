import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "./base/ColFunction";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class EmailField extends BaseField{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.callback = props.callback;
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
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}</legend>
            <input ref = {this.internalFieldReference} name = {this.name} type={this.fieldType} onFocus={this.highlightOnFocus} onKeyUp={(e) => {
                if(this.checkIfEmailAddress(e.target.value)){
                    this.callback(e);
                    this.removeContextMessageError();
                }
                else{
                    //do not withold typing!
                    //pass the target input field to perform this act on.
                    //this does not need on e to quit typing
                    // this.stopTyping();  //do not stop typing because email addresses are required, regardless of their format!
                    // this.stopTypingOn(e);
                    //show error message box with message there
                    this.showContextMessageError("email format is closer to a@b.c")
                }
            }
            } onBlur={this.removeHighlightOnBlur}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    }
}
