import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "./base/ColFunction";

/**
 *
 * NumberField defines a type where the props
 *
 */
export default class SelectField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.options = props.options; //assume that options are an array
        this.state = {
            options: [],
        };
    }

    /**
     *
     * Sets up options coming from the props passed to the select field as an array.
     * @param __options the options to present to user for selection.
     *
     */
    setOptions = (__options = this.options) => {
        let keys = Object.keys(__options);
        this.setState((state) => {
            state.options = [];
            __options.map((option) => {
                let option_key = Object.keys(option);
                state.options.push(
                    <option index={option_key[0]}>{option[option_key[0]]}</option>);
            });
            return state;
        });
    };

    /**
     * Set the options that will be seen on the select field
     */
    componentDidMount() {
        if (this.options != null) this.setOptions(this.options);
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (
            <fieldset className={`${col12} form-group border`}>
                <legend className={`${this.state.selection} w-auto`}>
                    {this.fieldPlaceHolder}
                </legend>
                <select ref={this.internalFieldReference} name={this.name}
                        className={"form-control"}
                        onChange={
                            (e) => {
                                this.callback(e);
                            }
                            //find a way of changing the value of something from this point
                        }
                        onBlur={this.removeHighlightOnBlur}
                >
                    <option aria-disabled={true} style={{color: '#7F7777FF', fontStyle: 'italic'}}>-select-item-
                    </option>
                    {this.state.options}
                </select>
            </fieldset>
        );
    };
}
