import React from "react";
import BaseField from "./base/BaseField";
import { col12 } from "../../../MiscUtils";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class SelectField extends BaseField {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.options = props.options; //assume that options are an array
    this.state = {
      optionsList: null, //but by default these are arrays
      options: [],
    };
    this.hasUpdated = false;
    // check if the default value is set
  }

  /**
   *
   * Sets up options coming from the props passed to the select field as an array.
   * @param __options the options to present to user for selection.
   * @param optionIndex the selected option
   *
   */
  setOptions = (
    __options = this.options,
    optionIndex = parseInt(this.props.defaultValue)
  ) => {
    this.setState((state) => {
      state.options = [];
      // eslint-disable-next-line array-callback-return
      __options.map((option, index) => {
        let option_key = Object.getOwnPropertyNames(option);
        if (parseInt(option_key[0]) === optionIndex)
          state.options.push(
            <option selected={true} value={option_key[0]}>
              {option[option_key[option_key.length - 1]]}
            </option>
          );
        else
          state.options.push(
            <option value={option_key[0]}>
              {option[option_key[option_key.length - 1]]}
            </option>
          );
      });
      return state;
      // get ref and set selected index to state.selectedIndex
    });
  };

  /**
   * Set the options that will be seen on the select field
   */
  componentDidMount() {
    if (this.options !== null) this.setOptions(this.options);
  }

  /**
   *
   * this will be deprecated....? Used to pass updates to it when rendering new options
   *
   * @param nextProps the props to pass on to
   * @param nextContext This is irrelevant at this time...
   *
   */
  UNSAFE_componentWillReceiveProps = (nextProps, nextContext) => {
    //set options with next props options field
    if (nextProps.options !== null || true) this.setOptions(nextProps.options); //set new options
  };

  render = () => {
    /*
     * onFocus allows the legend to be changed
     */
    const k = this.props.multiple ? (
      <select
        value={this.state.selectedValue}
        multiple
        {...this.required}
        ref={this.internalFieldReference}
        name={this.name}
        style={this.props.style ? this.props.style : null}
        className={"form-control form-select form-select-sm"}
        onChange={
          (e) => {
            //if its the first index, do nothing or say cannot be selected
            if (e.target.selectedIndex === 0)
              this.showContextMessageWarning(
                "Cannot select the first element! it's forbidden"
              );
            else this.changecallback(e);
          }
          //find a way of changing the value of something from this point
        }
        // selectedIndex={this.state.previousValue}
        onBlur={() => {
          this.evaluateControlOnRequired();
          this.blurCallback();
        }}
      >
        <option aria-disabled={true}>-select-item-</option>
        {this.state.options}
      </select>
    ) : (
      <select
        {...this.required}
        value={this.state.selectedValue}
        ref={this.internalFieldReference}
        className={"form-control form-select form-select-sm"}
        name={this.name}
        onChange={
          (e) => {
            //if its the first index, do nothing or say cannot be selected
            if (e.target.selectedIndex === 0)
              this.showContextMessageWarning(
                "Cannot select the first element! it's forbidden"
              );
            else this.changecallback(e);
          }
          //find a way of changing the value of something from this point
        }
        // selectedIndex={this.state.previousValue}
        onBlur={() => {
          this.evaluateControlOnRequired();
          this.blurCallback();
        }}
      >
        <option aria-disabled={true}>-select-item-</option>
        {this.state.options}
      </select>
    );
    return (
      <div className={`form-group`}>
        <label className={`${this.state.selection} form-label`}>
          {this.fieldPlaceHolder}
          {this.isRequired}
        </label>
        {k}
      </div>
    );
  };
}
