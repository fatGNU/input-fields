import React from "react";
import BaseField from "./base/BaseField";
import { col12 } from "../../../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class OtpField extends BaseField {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.callback = props.callback;
    this.numberRegRxp = new RegExp(/^[0-9]{3,5}$/);
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
      <div className={`form-group`}>
        <label className={`${this.state.selection} form-label`} style={{}}>
          {this.fieldPlaceHolder}
          {this.isRequired}
        </label>
        <input
          {...this.required}
          ref={this.internalFieldReference}
          style={{}}
          className={"form-control"}
          name={this.name}
          type={this.fieldType}
          onFocus={this.highlightOnFocus}
          onChange={(e) => {
            if (this.checkIfNumber(e.target.value)) {
              this.changecallback(e);
              this.removeContextMessageWarning();
            } else {
              if (e.target.value.length > 2) {
                //pass the target input field to perform this act on.
                this.stopTyping();
                // this.stopTypingOn(e);
                //show error message box with message there
                this.showContextMessageWarning("use Numeric values only!");
              }
            }
          }}
          onBlur={() => {
            this.evaluateControlOnRequired();
            this.blurCallback();
          }}
        />
        {this.state.possibleContextMessageBox}
      </div>
    );
  };
}
