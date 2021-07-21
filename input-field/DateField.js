import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "./base/ColFunction";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class DateField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        const date = new Date();
        this.callback = props.callback;
        this.minimumDate = props.minimumDate === undefined ? '01/01/1965' : props.minimumDate;
        this.currentDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
        this.maximumDate = props.maximumDate === undefined ? `${this.currentDate}` : props.maximumDate;
        this.isRequired = props.required === undefined;
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
            <input type={'date'} required={this.isRequired} pattern={'\d[1-31]{2}/\d[1-12]{2}/\d{4}'}
                   min={this.minimumDate} placeholder={'dd/mm/yyyy'}
                   max={this.maximumDate} value={this.currentDate} ref={this.internalFieldReference}
                   name={this.name} onFocus={this.highlightOnFocus}
                   onChange={(e) => {
                       this.callback(e);
                    }
                   } onBlur={this.removeHighlightOnBlur}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    };
}
