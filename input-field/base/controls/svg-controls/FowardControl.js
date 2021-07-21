import React from 'react';
import BaseControl from './base/BaseControl';
import './base/svg-controls.css'
export default class FowardControl extends BaseControl
{
    constructor(props){
        super(props);
        this.callback = props.callback;

    }
    render = () => {
        return(<div className={'svg-control'}>
  
        <svg  onClick = {this.callback} className={`${this.className} foward-control`} xmlns="http://www.w3.org/2000/svg"  class="bi bi-arrow-right-square" viewBox="0 0 20 20" id="_24x24_On_Light_Remove"  data-name="24x24/On Light/Remove">
             <rect id="view-box" width="24" height="24" fill="none" />
            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>

  

        </div>);
    }
}
