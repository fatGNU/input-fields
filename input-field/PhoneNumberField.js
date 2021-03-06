import React from "react";
import BaseField from "./base/BaseField";
import { col12 } from "../../../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class PhoneNumberField extends BaseField {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.numberRegRxp = new RegExp(/^\+?[0-9]{0,12}$/);
    //this should be checked against a country-code if desired.
  }

  /**
   * Check if typed letter is a number and that it's 18 digits long!
   * @param e the value to test out.
   * @returns {boolean} the status of the test. true if it's a number within desired range else false.
   */
  checkIfNumber = (e) => {
    return this.numberRegRxp.test(e);
  };
  render = () => {
    /*
     * onFocus allows the legend to be changed
     */
    return (
      <fieldset className={`form-group`}>
        <label className={`${this.state.selection} form-label`}>
          {this.fieldPlaceHolder}
          {this.isRequired}
        </label>
        <input
          {...this.required}
          ref={this.internalFieldReference}
          className={"form-control"}
          name={this.name}
          type={this.fieldType}
          onFocus={this.highlightOnFocus}
          onChange={(e) => {
            if (this.checkIfNumber(e.target.value)) {
              this.changecallback(e);
              this.removeContextMessageWarning();
            } else {
              //pass the target input field to perform this act on.
              this.stopTyping();
              // this.stopTypingOn(e);
              //show error message box with message there
              this.showContextMessageWarning("Type in a proper Phone number!");
            }
          }}
          defaultValue={this.state.previousValue}
          onBlur={() => {
            this.evaluateControlOnRequired();
            this.blurCallback();
          }}
        />
        {this.state.possibleContextMessageBox}
      </fieldset>
    );
  };
}
