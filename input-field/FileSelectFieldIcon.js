import BaseField from "./base/BaseField";
import AddControl from "../controls/svg-controls/AddControl";

/**
 *
 * FileSelectFieldIcon defines a means to choose only one file at a time
 * or multiple. This is done by issuing properties such as "with_multiple"
 * This component can also read files as base64. pass the "with_base_64" property
 *
 * The two referred properties can be passed without arguments. only their
 * presence is required to initiate the desired functionality.
 *
 * This component only hides the default file input field with a '+' icon.
 * it is purely for stylistic reasons only.
 *
 */
export default class FileSelectFieldIcon extends BaseField {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.callback = props.callback;
        this.convert_to_base64 = props.with_base64 != null;
        this.multiple_files = props.with_multiple != null;
        this.base64StringArray = [];//for storage of file contents as a base64 string.
        //special-bind the convertToBase64 method to this class so as to define it as an asynchronous method
        this.convertToBase64.bind(this);
        /*
        * Create a mouse event/touch event that triggers when
        * a click is made on an icon for a file.
         */
        this.triggerFileSelection = (e) => {
            let event = document.createEvent("MouseEvent");
            event.initEvent("click", false, true);
            this.internalFieldReference.current.dispatchEvent(event)
        };
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
            throw new ReferenceError(`${this.readToBase64.name} requires a callback as a second argument.
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
            throw new TypeError(`${this.readToBase64.name} method expected a file object. Found ${typeof _file}`);
    }
    // /**
    //  *@Deprecated method by the super class's clearField method
    //  *
    //  * Clear file selections from list.
    //  * --------------------------------
    //  * This method is used when there is no page reload, and that a user may select
    //  * another file using the same file input.
    //  * Note: by default, this component allows multiple file selections. It does not enforce the number of
    //  * files that can be selected in one go. Therefore this method must be called to effect this desired behaviour.
    //  *
    //  */
    // clearSelectedFilesList = () => {
    //     this.inputField.target.files = null;
    // }
    // /**
    //  * @deprecated
    //  * Method asynchronously reads and converts contents a file into a base64 string.
    //  * @param file_object the file whose contents I want to read.
    //  * @returns {Promise<void>}
    //  */
    // async convertToBase64(file_object) {
    //     const fReader = new FileReader();
    //     fReader.onload = (e) => {
    //         // this.base64StringArray.push(e.readAsDataURL(file_object));
    //         return e.readAsDataURL(file_object);
    //     }
    // }



    render = () => {
        /*
         * onFocus allows the legend to be changed
         */
        return (
            <>
                {/*the reference enables doing work on a given input field directly using instance methods*/}
                <input ref = {this.internalFieldReference} name={this.name} id={"file_ipt_field"} style={{opacity: "0", height: 0, width: 0}}
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
                        this.callback(e);
                    }
                }
                }/>
                <AddControl callback={this.triggerFileSelection}/>
            </>
        );
    }
}