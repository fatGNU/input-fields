import BaseField from "./base/BaseField";

/**
 * Class defines a svg-based buttons to invoke a attach document.
 * The callback passed to it during its call defines its behaviour.
 */
export default class AttachFileField extends BaseField {
    constructor(props) {
        super(props);
        this.callback = props.changecallback;
        this.closeControl = String('close-control');
        this.style = props.style === undefined ? {width: 40, height: 40} : props.style;//square width and height of 60 px
        //special-bind the convertToBase64 method to this class so as to define it as an asynchronous method
        this.convertToBase64.bind(this);
        /*
                * Create a mouse event/touch event that triggers when
                * a click is made on an icon for a file.
                 */
        this.triggerFileSelection = () => {
            let event = document.createEvent("MouseEvent");
            event.initEvent("click", false, true);
            this.internalFieldReference.current.dispatchEvent(event)
        }
    }

    /**
     *
     * read file contents into a base64 string
     * @param _file the file object to read as base64
     * @param callback a callback method to execute when read is complete
     * @returns {string} the file in form of a base64 string
     *  that the file contents are translated to.

     */
    convertToBase64 = (_file = File | Blob, callback = undefined) => {
        if (callback === undefined) {
            throw new ReferenceError(`'convertToBase64' method requires a callback as a second argument.
            This is because this method's file-read activity is asynchronous and does not do well with returning
            its output. Pass a method reference(--without-arguments--) which will execute when
            the internal file-read-operation is complete.`);
        }
        let fR;
        if (_file instanceof File || _file instanceof Blob) {
            fR = new FileReader();
            let fileString;
            fR.readAsDataURL(_file);
            fR.onload = (e) => {
                fileString = e.target.result;
                if (callback !== undefined) {
                    callback(fileString);
                }
                // return fileString;
            };
        } else
            throw new TypeError(`'convertToBase64' method expected a file object. Found ${typeof _file}`);
    }

    render = () => {
        return (
            <>
                <input ref={this.internalFieldReference} name={this.name} id={"file_ipt_field"}
                       style={{opacity: "0", height: 0, width: 0}}
                       type={"file"} onChange={(e) => {
                    //try to open it and read it as base64 string of course observing the requirements
                    //of the user's will to do this...
                    if (this.multiple_files) {
                        let files = this.target.files
                        if (this.convert_to_base64) {
                            for (const f of files) {
                                this.convertToBase64(f, fileData => {
                                    this.base64StringArray.push(fileData)
                                })
                            }
                        }
                    } else {
                        //read as normal file object
                        //choose one file at a time
                        //make sure that if it's not a base64 string. Pick the first file as an object.
                        // this.callback(this.multiple_files ? e.target.files : e.target.files[0]);
                        this.props.changecallback(e);
                    }
                    //thjis does/should not have a blurcallback callback method invocation in here....
                }
                }/>
                <svg style={{...this.style}}
                     onClick={this.triggerFileSelection} className={`${this.className}`}
                     width="24px"

                     height="24px"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.4383 11.6622L12.2483 20.8522C11.1225 21.9781 9.59552 22.6106 8.00334 22.6106C6.41115 22.6106 4.88418 21.9781 3.75834 20.8522C2.63249 19.7264 2 18.1994 2 16.6072C2 15.015 2.63249 13.4881 3.75834 12.3622L12.9483 3.17222C13.6989 2.42166 14.7169 2 15.7783 2C16.8398 2 17.8578 2.42166 18.6083 3.17222C19.3589 3.92279 19.7806 4.94077 19.7806 6.00222C19.7806 7.06368 19.3589 8.08166 18.6083 8.83222L9.40834 18.0222C9.03306 18.3975 8.52406 18.6083 7.99334 18.6083C7.46261 18.6083 6.95362 18.3975 6.57834 18.0222C6.20306 17.6469 5.99222 17.138 5.99222 16.6072C5.99222 16.0765 6.20306 15.5675 6.57834 15.1922L15.0683 6.71222"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </>
        );
    }
}