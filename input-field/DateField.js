import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../MiscUtils";

/**
 *
 * DateField is used to collect dates. NOTE: the international format: dd/mm/yyyy
 * is always used to report these dates to the server. However, the format for the display
 * is always determined by the locale that the showing browser is set to. In this case,
 * it's set to be in line with the AMERIKITES way of reading dates: mm/dd/yyyy which sucks!
 *
 * The display format can only be overriden when the locale is changed to proper sensible
 * international formats.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
 *
 */
export default class DateField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        const date = new Date();
        this.minimumDate = props.minimumDate === undefined ? '01/01/1965' : props.minimumDate;
        // this.currentDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
        //reversed date format YYYY-mm-dd
        this.currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
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
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required} type={'date'} required={this.isRequired} pattern={'[1-31]{2}/[1-12]{2}/{4}'}
                   min={this.minimumDate} placeholder={'dd/mm/yyyy'}
                   max={this.maximumDate} defaultValue = {this.currentDate} ref = {this.internalFieldReference}
                   name={this.name} onFocus={this.highlightOnFocus}
                   onChange={(e) => {
                       this.changecallback(e);
                    }
                   } onBlur={() => {
                this.evaluateControlOnRequired()
                this.blurCallback();
            }}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    };
}