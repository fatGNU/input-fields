import React from "react";
import BaseField from "./base/BaseField";
import { col12 } from "../../../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class PasswordField extends BaseField {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render = () => {
    /*
     * onFocus allows the legend to be changed
     */
    return (
      <div className={`form-group`}>
        <label
          className={`${this.state.selection} form-label text-capitalize`}
          style={{}}
        >
          {this.fieldPlaceHolder}
          {this.isRequired}
        </label>
        <input
          {...this.required}
          ref={this.internalFieldReference}
          className={"form-control"}
          style={{ width: "100%" }}
          name={this.name}
          type={"password"}
          onFocus={this.highlightOnFocus}
          onChange={(e) => {
            this.changecallback(e);
          }}
          onBlur={() => {
            this.evaluateControlOnRequired();
            this.blurCallback();
          }}
        />
        {this.state.possibleContextMessageBox}
        {/*the above is more useful in password confirmation activities*/}
      </div>
    );
  };

  /**
   * kazi ya monday:
   *
   *
   *
   */
}
