import React from "react";
import BaseField from "./base/BaseField";

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
    this.minimumDate =
      props.minimumDate === undefined ? "01/01/1965" : props.minimumDate;
    // this.currentDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    //reversed date format YYYY-mm-dd
    this.currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    this.maximumDate =
      props.maximumDate === undefined
        ? `${this.currentDate}`
        : props.maximumDate;
    this.isRequired = props.required === undefined;
  }

  render = () => {
    /*
     * onFocus allows the legend to be changed
     */
    return (
      <div className={`form-group`} style={this.props.style}>
        <label className={`${this.state.selection} form-label`}>
          {this.fieldPlaceHolder}
          {this.isRequired}
        </label>
        <input
          {...this.required}
          type={"date"}
          className={"form-control"}
          // required={this.isRequired}
          // pattern={'[1-31]{2}/[1-12]{2}/{4}'}
          min={this.minimumDate}
          // placeholder={'dd/mm/yyyy'}
          // max={this.maximumDate}
          // check why setting the value kills off memory recall
          // value={this.props.defaultValue ? String(this.props.defaultValue) : String(this.currentDate)}
          // ref={this.internalFieldReference}
          name={this.name}
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
      </div>
    );
  };
}
