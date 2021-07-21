// eslint-disable-next-line no-unused-vars
import {Component} from "react";
import './svg-controls.css';

/**
 *
 * this base class defines basic functionality available from buttons that take the form
 * of an icon or svg image.
 *
 */
export default class BaseControl extends Component{
    constructor(props){
        super(props);
        this.className = String('svg-control');
        this.width = props.width === undefined? 30: props.width;
        this.height = props.height === undefined? 30: props.height;
        if(props.callback === undefined)
            throw new ReferenceError(`No callback is passed as a property with the 
            'callback' property to <${this.constructor.name} /> component call`);
    }
}