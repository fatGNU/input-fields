import BaseControl from './base/BaseControl';
import './base/svg-controls.css'

export default class Navigation extends BaseControl
{
    constructor(props){
        super(props);
        this.callback = props.callback;
        //this.navigation = String('close-control');

    }
    render = () => {
        return(
  <div className={'fowardnavigation'}>
              <svg  onClick= {this.callback}  xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
</svg>
  </div>



  

        );
    }
}
