import React from "react";

import Button from "./base/Button";

export default class CancelButton extends Button {

    constructor(props) {
        super(props);
        this.callback = props.callback;
    }

    render = () => {
        return (
            <button className={"btn btn-light"} type={"cancel"} onClick={this.callback}>
                Cancel
            </button>
        );

    }
}
