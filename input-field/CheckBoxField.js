import React from "react";
import BaseField from "./base/BaseField";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class CheckBoxField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`form-group border`} style={this.props.style}>
            <legend className={`${this.state.selection} w-auto`}
                    style={{width: 'auto', fontSize: '99%'}}>
                {this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required}
                   ref={this.internalFieldReference}
                   style={{width: '98%'}}
                   name={this.name}
                   type={"checkbox"}
                   onFocus={this.highlightOnFocus}
                   onChange={(e) => {
                       this.changecallback(e);
                   }
                   }
                   checked={this.state.defaultValue}
                   onBlur={() => {
                       this.evaluateControlOnRequired()
                       this.blurCallback();
                   }}/>
        </fieldset>);
    }
}