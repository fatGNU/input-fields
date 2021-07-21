import './base/svg-controls.css'
import BaseControl from "./base/BaseControl";

/**
 * Class defines a svg-based buttons to remove content from something of interest.
 * The callback passed to it during its call defines its behaviour.
 */
export default class RemoveControl extends BaseControl {
    constructor(props) {
        super(props);
        this.callback = props.callback;
        //original colour of the control
        // #141124
    }

    render = () => {
        return (
            //previous style for width and height: width="24px" height="24px"
            <svg onClick={this.callback} className={`${this.className} remove-control`} viewBox="0 0 24 24" id="_24x24_On_Light_Remove"
                 data-name="24x24/On Light/Remove" xmlns="http://www.w3.org/2000/svg">
                <rect id="view-box" width="24" height="24" fill="none"/>
                <path id="Shape"
                      d="M0,9.75A9.75,9.75,0,1,1,9.75,19.5,9.761,9.761,0,0,1,0,9.75Zm1.5,0A8.25,8.25,0,1,0,9.75,1.5,8.259,8.259,0,0,0,1.5,9.75Zm5.365.751A.813.813,0,0,1,6,9.75.813.813,0,0,1,6.865,9h5.769a.814.814,0,0,1,.866.75.814.814,0,0,1-.866.751Z"
                      transform="translate(2.25 2)" fill="#D80808FF" />
            </svg>

        );
    }
}
