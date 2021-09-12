import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../MiscUtils";

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
            optionsList: null,//but by default these are arrays
            options: [],
        };
        this.hasUpdated = false;
    }

    /**
     *
     * Sets up options coming from the props passed to the select field as an array.
     * @param __options the options to present to user for selection.
     *
     */
    setOptions = (__options = this.options) => {
        // let keys = Object.getOwnPropertyNames(__options);
        this.setState((state) => {
            state.options = [];
            __options.map((option) => {
                let option_key = Object.getOwnPropertyNames(option);
                state.options.push(
                    <option value ={option_key[0]}>{option[option_key[option_key.length - 1]]}</option>);
            });
            return state;
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
        if (nextProps.options === null)
            return;
        else if (nextProps.options === undefined)
            return;
        else
            this.setOptions(nextProps.options);//set new options
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (
            <fieldset className={`${col12} form-group border`}>
                <legend className={`${this.state.selection} w-auto`}>{this.fieldPlaceHolder}{this.isRequired}</legend>
                <select {...this.required} ref={this.internalFieldReference} name={this.name}
                        className={"form-control"}
                        onChange={
                            (e) => {
                                //if its the first index, do nothing or say cannot be selected
                                if (e.target.selectedIndex === 0)
                                    this.showContextMessageWarning('Cannot select the first element! it\'s forbidden');
                                else
                                    this.changecallback(e);
                            }
                            //find a way of changing the value of something from this point
                        }
                        // selectedIndex={this.state.previousValue}
                        onBlur={() => {
                this.evaluateControlOnRequired()
                this.blurCallback();
            }}
                >
                    <option aria-disabled={true} style={{color: '#7F7777FF', fontStyle: 'italic'}}>-select-item-
                    </option>
                    {this.state.options}
                </select>
            </fieldset>
        );
    };
}
