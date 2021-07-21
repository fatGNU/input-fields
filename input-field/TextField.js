import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "./base/ColFunction";

let textFieldReference = Object();
/**
 *
 * NumberField defines a type where the props
 *
 */
export default class TextField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.callback = props.callback;
    }

    /**
     * registers a field reference to this instance of component
     */
    componentDidMount() {
        textFieldReference = this;
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (<fieldset className={`${col12} form-group border`}>
            <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}</legend>
            <input ref = {this.internalFieldReference} name={this.name} type={this.fieldType} onFocus={this.highlightOnFocus} onChange={(e) => {
                    this.callback(e);
            }
            } onBlur={this.removeHighlightOnBlur}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    }
}
