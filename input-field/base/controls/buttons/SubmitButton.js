import React from "react";
import Button from "./base/Button";
import "./base/button-control.css";

/**
 *
 * Component wraps the form button and provides default functionality
 * properties include
 *  commandText - a string
 *  callback - callback method to execute
 *
 */
export default class SubmitButton extends Button {
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.commandText = props.commandText;
    }

    render = () => {
        return (

            <button className={"btn btn-primary"} onClick={this.callback}>
                {this.commandText === undefined? `Submit` : this.commandText}
            </button>


        );

    }
}
