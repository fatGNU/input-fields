import {Component} from "react";


export default class Button extends Component {
  constructor(props) {
    super(props);
    this.className = String('svg-control');
    this.width = props.width === undefined? 30: props.width;
    this.height = props.height === undefined? 30: props.height;
    if(props.callback === undefined || props.callback === null){
      throw new ReferenceError(`No handler callback method has been issued with the 'handleClick' property for ${this.constructor.name}`);
    }
  }
}
  