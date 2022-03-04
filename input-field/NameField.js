import React from "react";
import BaseField from "./base/BaseField";

let textFieldReference = Object();
/**
 *
 * NumberField defines a type where the props
 *
 */
export default class NameField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.nameExp = new RegExp(/^[a-zA-Z]{1,50}$/);
    }

    /**
     *
     * Checks if a name has been typed (without using numbers).
     * @param e element hosting the name
     * @returns {boolean} if its a name or not
     *
     */
    checkIfName = (e) => {
        return this.nameExp.test(e.target.value);
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
        return (<fieldset className={`form-group border`} style={this.props.style}>
            <legend className={`${this.state.selection} w-auto`}
                    style={{width: 'auto', fontSize: '60%'}}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required} ref={this.internalFieldReference} style={{width: '100%', fontSize: '70%'}}
                   name={this.name} type={this.fieldType}
                   onFocus={this.highlightOnFocus} onChange={(e) => {
                if (this.checkIfName(e)) {
                    this.removeContextMessageWarning();
                    this.changecallback(e);
                } else {
                    this.showContextMessageWarning('type a proper name!');
                }
            }
            }
                   defaultValue={this.state.previousValue}
                   onBlur={() => {
                       this.evaluateControlOnRequired()
                       this.blurCallback();
                   }}/>
            {this.state.possibleContextMessageBox}
        </fieldset>);
    }
}