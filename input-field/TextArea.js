import React from "react";
import BaseField from "./base/BaseField";
import { col12 } from "../ColFunction";
/**
 *
 * NumberField defines a type where the props
 *
 */
export default class TextArea extends BaseField {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.callback = props.callback;
  }

  render = () => {
    /*
     * onFocus allows the legend to be changed
     */
    return (
      <fieldset
        style={{ height: "240px" }}
        className={`${col12} form-group border`}
      >
        <legend className={`${this.state.selection} w-auto`}>
          {this.fieldPlaceHolder}
        </legend>
        <textarea ref = {this.internalFieldReference}
          onFocus={this.highlightOnFocus}
          onChange={(e) => {
            this.onChange(e.target.value);
          }}
          onBlur={this.removeHighlightOnBlur}
        />
        {this.state.possibleContextMessageBox}
      </fieldset>
    );
  };
}
