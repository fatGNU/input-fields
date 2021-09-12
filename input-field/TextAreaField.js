import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class TextAreaField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (
            <fieldset
                style={{height: "240px"}}
                className={`${col12} form-group border`}
            >
                <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}{this.isRequired}</legend>
                <textarea {...this.required}
                          name={this.name}
                          ref={this.internalFieldReference}
                          onFocus={this.highlightOnFocus}
                          onChange={(e) => {
                              this.changecallback(e);
                          }}
                          defaultValue={this.state.previousValue}
                          onBlur={() => {
                              this.evaluateControlOnRequired()
                              this.blurCallback();
                          }}
                />
                {this.state.possibleContextMessageBox}
            </fieldset>
        );
    };
}
