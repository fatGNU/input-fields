import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../../../MiscUtils";

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

    //
    //
    /**
     *
     * Check for limit of words by spliting the content against white spaces then finding the length
     *
     */
    checkForWordsLimit = () => {
    }
    /**
     *
     *
     *
     */
    checkForCharactersLimit = () => {
    }
    // impose limit based on characters or words
    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (
            <fieldset
                style={{...this.props.style, minHeight: "140px !important", minWidth: "200px !important"}}
                className={` form-group border`}
            >
                <legend className={`${this.state.selection} w-auto`}    style={{width: 'auto', fontSize: '96%'}}>{this.fieldPlaceHolder}{this.isRequired}</legend>
                <textarea {...this.required}
                          name={this.name}
                          style={{minWidth: '100%', fontSize: '70%',...this.props.style}}
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
