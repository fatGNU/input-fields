import React, {Component} from "react";
import "./field-styles.css";

//declare constants for fields that are clearable and can be cleared on the fly using the same means.
//see the BaseField method 'clearField'
const directlyClearableFields = ["text", "password", "file", "blob"];
const directlyClearableCheckedFields = ["radio", "checkbox"];
// const directlyClearableBlobFields = ['blob','file'];
//////////////////////////////////////
//////////////////////////////////////
/**
 *
 * This class defines the default HTML input field and it's default mechanisms for activity.
 *Properties in use:
 *  - name {a string name property passed to the input field}
 *  - placeholder {a string giving a title to the field in question}
 *  - onChange {a callback method called when the field contents change}
 *  - position {an overriding instruction to provide custom placement for this component}
 *  - fieldType {a string depicting what type of field this component is. By default, text}
 *  [Note: not all Child-classes require fieldType explicitly. It's passed by the ChildClasses
 *  as they inherit this attribute from the BaseField class (this class).]
 *
 * throws:
 *  - ReferenceError {when the name property is absent on calling this component}. This is
 *  because the name is used to identify the field and its value during the execution of
 *  the callback method.
 *
 *  NOTE:
 *   - When accessing the input-field reference from outside the <InputField /> in question,
 *   use the notation
 *      <reference>.current.internalFieldReference
 *      where <reference> is replaced with the variable that hosts the react reference
 *      'current' is the current reference instance of the desired reference
 *      'internalFieldReference' is an actual variable hosting the InputField internal reference.
 *      That name MUST BE PRESENT WHEN ACCESSING SPECIFIC HTMLInputElement instances.
 *
 *      examplt:
 *          <some-reference-variable-in-calling-class>.internalFieldReference.current.<desired-attribute>
 *
 */
export default class BaseField extends Component {
    constructor(props) {
        super(props);
        this.internalFieldReference = React.createRef();
        this.callback = props.callback===undefined ? () => {console.warn(`callback is not set for <${this.constructor.name} /> component`)} : props.callback;
            this.callback = props.callback;
        if (props.name === undefined) {
            throw new ReferenceError(`Component must have a --name-- attribute or property but none \
                was found on ${this.constructor.name}`);
        }
        this.name = props.name != null ? props.name : "input_device";
        this.fieldPlaceHolder =
            props.placeholder != null
                ? props.placeholder
                : String("Some-input-field");
        this.fieldType = props.fieldType != null ? props.fieldType : String("text");
        this.position =
            props.position != null &&
            props.position === Array &&
            props.position.length === 2
                ? props.position
                : [];
        //check for properties for callback
        //make sure that the onChange method prints the content on screen
        this.callback =
            props.callback != null
                ? props.callback
                : (e) => {
                    // eslint-disable-next-line no-multi-str
                    console.warn(
                        e,
                        "warning:",
                        "this input field does not take it's data anywhere! \
                      that's why im printing it out here as a warning. Damn it, supply a callback method to it \
                      with the 'onChange' event listener"
                    );
                };
        this.state = {
            enabled: false,
            // selection: String(),
            possibleContextMessageBox: null,
        };
        //do some tests on the data that's considered mandatory
    }

    //access these actions or states it using the diabled property
    // /**
    //  *
    //  * disable this component
    //  *
    //  */
    // disable = () => {
    //     this.internalFieldReference.current.disabled = true;
    // }
    // /**
    //  *
    //  * enable this component
    //  *
    //  */
    // enable = () => {
    //     this.internalFieldReference.current.disabled = false;
    // }

    /**
     * This method is called when the cursor gains focus on this input field.
     */
    highlightOnFocus = () => {
        this.internalFieldReference.current.focus = true;
    };
    /**
     * This method is called when the cursor loses focus on this input field.
     */
    removeHighlightOnBlur = () => {
        this.internalFieldReference.current.focus = false;
    };
    /**
     * shows a contextual message item as an error with red background!
     * @param m
     */
    showContextMessageError = (m) => {
        //create a div
        let messageDiv = <div className={"error-context-message"}>{m}</div>;
        this.setState((state) => {
            state.possibleContextMessageBox = messageDiv;
            return state;
        });
        //have a timer! remove or nullify the possibleContextMessageBox state variable
    };
    /**
     * Removes context message error box
     */
    removeContextMessageError = () => {
        // this.state.possibleContextMessageBox.classList.add("error-context-message-out");
        window.setTimeout(() => {
            this.setState((state) => {
                state.possibleContextMessageBox = null;
                return state;
            });
        }, 1100);
    };
    /**
     * shows a contextual message item as a warning with yellow background!
     * @param m
     */
    showContextMessageWarning = (m) => {
        //create a div
        let messageDiv = <div className={"warning-context-message"}>{m}</div>;
        this.setState((state) => {
            state.possibleContextMessageBox = messageDiv;
            return state;
        });
        //have a timer! remove or nullify the possibleContextMessageBox state variable
    };
    removeContextMessageWarning = () => {
        window.setTimeout(() => {
            this.setState((state) => {
                state.possibleContextMessageBox = null;
                return state;
            });
        }, 1100);
    };
    /**
     *
     * Gets the field type
     * @returns {*} a string representing the type of field. the field type cannot be changed unless
     *  you re-render.
     *
     */
    getType = () => {
        return this.internalFieldReference.current.type;
    };
    /**
     *
     * Gets the HTMLElement subclass this component wraps.
     *
     */
    getHTMLInterfaceName = () => {
        return this.internalFieldReference.current.constructor.name;
    };
    /**
     *
     * Get the field name as set during the call-to-render to this field.
     * @returns {*} a string representing the name of the field. This name can be changed
     *  using the setName(<newName-here>) method call on this field reference.
     *
     */
    getName = () => {
        return this.internalFieldReference.current.name;
    };
    /**
     *
     * Sets a new name to the field in question (this current field).
     * @param newName name as a string. if name is empty, it returns and the field retains the original
     * name it had.
     *
     */
    setFieldName = (newName = String()) => {
        if (newName.length === 0) return;
        this.internalFieldReference.current.name = newName;
    };
    /**
     * Clears fields of their content.
     * The Component being rendered will create an internal reference unto itself.
     * However, an external reference hosted in the class calling the component in question will
     * be required so that it can call instance methods on the rendered component.
     *
     */
    clearField = () => {
        let warn = false;
        //declare constants whereby
        if (this.getHTMLInterfaceName() === "HTMLSelectElement") {
            //select the first element
            this.internalFieldReference.current.selectedIndex = 0;
        } else if (this.getHTMLInterfaceName() === "HTMLInputElement") {
            //It turns out that files can be cleared by setting the value to '' as well.
            if (
                directlyClearableFields.includes(
                    this.internalFieldReference.current.type
                )
            )
                this.internalFieldReference.current.value = "";
            else if (
                directlyClearableCheckedFields.includes(
                    this.internalFieldReference.current.type
                )
            )
                this.internalFieldReference.current.checked = false;
            else warn = true;
        }
        if (warn)
            console.warn(`The component <${this.constructor.name} ... /> 
which wraps the html interface class ${this.getHTMLInterfaceName()} cannot be cleared using 
this ${
                this.clearField.name
            } method. Perhaps it's not clearable or does not contain user-entered data?`);
            //reset warn flag... just in case.
        // console.log('field cleared. field contents: ', this.internalFieldReference.current.files)
        else warn = false;
    };
    /**
     *
     * This method is called when no new data needs to be typed that does not match a given rule.
     * The rule is defined in the subclass of this component.
     *
     */
    stopTyping = () => {
        //do not do anything! .Mark it has a problem or even have a small label showing that there is
        //a problem
        let value = String();
        for (
            let v = 0;
            v < this.internalFieldReference.current.value.length - 1;
            v += 1
        ) {
            value += this.internalFieldReference.current.value[v];
        }
        this.internalFieldReference.current.value = value;
    };
    /**
     *
     * @partially-duplicated
     * This method is called when no new data needs to be typed
     */
    // stopTypingOn = (e) => {
    //     //do not do anything! .Mark it has a problem or even have a small label showing that there is
    //     //a problem
    //     let value = String();
    //     for (let v = 0; v < e.target.value.length - 1; v += 1) {
    //         value += e.target.value[v];
    //     }
    //     e.target.value = value;
    // }

    /**
     * this is an attempt at self-referencing such that this component can
     * call self-clearing-of-data methods on itself.
     */
    // componentDidMount() {
    //     this.internalFieldReference = this.constructor;
    // }
}