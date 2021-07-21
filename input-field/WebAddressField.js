import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "./base/ColFunction";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class WebAddressField extends BaseField{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
        this.callback = props.callback;
        // this.numberRegRxp = new RegExp(/^\+?[0-9]{0,12}$/);
        this.webAddressRegExp = new RegExp(/^http[s]?:\/\/[a-zA-Z0-9]{2,20}.[a-zA-Z0-9.]$/);
        //this should be checked against a country-code if desired.
    }

    /**
     * Check if typed letter is a number and that it's 18 digits long!
     * @param e the value to test out.
     * @returns {boolean} the status of the test. true if it's a number within desired range else false.
     */
    checkIfAddress = (e) => {
        return this.webAddressRegExp.test(e);
    }
    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}</legend>
            <input ref = {this.internalFieldReference} name = {this.name} type={this.fieldType} onFocus={this.highlightOnFocus} onChange={(e) => {
                if(this.checkIfAddress(e.target.value)){
                    this.callback(e);
                    this.removeContextMessageError();
                }
                else{
                    //pass the target input field to perform this act on.
                    this.stopTyping();
                    // this.stopTypingOn(e);
                    //show error message box with message there
                    this.showContextMessageError("Type in a proper web address!")
                }
            }
            } onBlur={this.removeHighlightOnBlur}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    }
}
