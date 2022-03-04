import React from "react";
import BaseField from "./base/BaseField";
import {col12} from "../../../MiscUtils";

let htmlObject = null;
/**
 *
 * RangeField defines a type where the props
 *
 */
export default class RangeField extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.minimumValue = props.minimumValue === undefined ? 1 : props.minimumValue;
        this.maximumValue = props.maximumValue === undefined ? 60 : props.maximumValue;
        this.smoothnessIndex = props.smoothnessIndex === undefined ? 1 / 7 : props.smoothnessIndex / 7;
        this.defaultValue = props.defaultValue === undefined ? (this.maximumValue - this.minimumValue) / 3 : props.defaultValue;
    }

    componentDidMount = () => {
        // attempt triggering a change event
        let event = document.createEvent("MouseEvent");
            event.initEvent("input", false, true);
        document.getElementById(`range_ipt_${this.name}_${this.defaultValue}`).dispatchEvent(event);
    }

    render = () => {
        /*
         * onFocus allows the legend to be changed
         * step={this.smoothnessIndex} should be applied when step is part of the input attributes
         * definition
         *
         */
        return (<fieldset className={`form-group border`} style={this.props.style}>
            <legend className={`${this.state.selection} w-auto`}
                    style={{width: 'auto', fontSize: '99%'}}>{this.fieldPlaceHolder}{this.isRequired}</legend>
            <input {...this.required}
                   id={`range_ipt_${this.name}_${this.defaultValue}`}
                   style={{width: '80%', fontSize: '70%', ...this.props.style}}
                   min={this.minimumValue} max={this.maximumValue}
                   ref={this.internalFieldReference}
                   name={this.name}
                   className={"form-check-input"}
                   type={"range"}
                   defaultValue={this.defaultValue}
                   onFocus={this.highlightOnFocus}
                   onChange={(e) => {
                       this.changecallback(e);
                   }
                   } onBlur={() => {
                this.evaluateControlOnRequired()
                this.blurCallback();
            }}/>
        </fieldset>);
    }
}