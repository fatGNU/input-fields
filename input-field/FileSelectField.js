import React from "react";
import BaseField from "./base/BaseField";

/**
 *
 * FileSelectField defines a means to choose only one file at a time
 * or multiple. This is done by issuing properties such as "with_multiple"
 * This component can also read files as base64. pass the "with_base_64" property
 *
 * The two referred properties can be passed without arguments. only their
 * presence is required to initiate the desired functionality.
 *
 */
export default class FileSelectField extends BaseField {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.convert_to_base64 = props.with_base64 != null;
    this.multiple_files = props.with_multiple != null;
    this.base64StringArray = []; //for storage of file contents as a base64 string.

    //special-bind the convertToBase64 method to this class so as to define it as an asynchronous method
    this.convertToBase64.bind(this);
  }

  /**
   * Method asynchronously reads and converts contents a file into a base64 string.
   * @param file_object the file whose contents I want to read.
   * @returns {Promise<void>}
   */
  convertToBase64 = async (file_container, callback) => {
    const fReader = new FileReader();
    fReader.onload = (e) => {
      // this.base64StringArray.push(e.readAsDataURL(file_object));
      return e.readAsDataURL(file_container);
    };
  };
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
          ref={this.internalFieldReference}
          name={this.name}
          className={"form-control"}
          type={"file"}
          onFocus={this.highlightOnFocus}
          onChange={(e) => {
            //try to open it and read it as base64 string of course observing the requirements
            //of the user's will to do this...
            if (this.multiple_files) {
              let files = this.target.files;
              if (this.convert_to_base64) {
                for (const f of files) {
                  this.convertToBase64(f).then((res) => {
                    this.base64StringArray.push(res);
                  });
                }
                //once done, call the callback method with the data already processed
              }
            } else {
              //read as normal file object
              //choose one file at a time
              // this.callback(this.multiple_files ? e.target.files : e.target.files[0]);
              this.changecallback(e);
            }
          }}
          onBlur={() => {
            this.evaluateControlOnRequired();
            this.blurCallback();
          }}
        />
      </div>
    );
  };
}
