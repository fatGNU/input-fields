import React, {Component} from "react";
import "./field-styles.css";
import {nameFromVariableName} from "../../../../MiscUtils";

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
 *      example:
 *          <some-reference-variable-in-calling-class>.internalFieldReference.current.<desired-attribute>
 *
 */
export default class BaseField extends Component {
    // static contextType = Message;
    constructor(props) {
        super(props);
        this.internalFieldReference = React.createRef();
        // /**
        //  * a callback method that's called when a change occurs in this field
        //  * @type {(function(): void)|*}
        //  */
        // this.changecallback = props.changecallback === undefined ? () => {
        //     console.warn(`callback is not set for <${this.constructor.name} /> component`)
        // } : props.changecallback;
        /**
         * the callback when the cursor moves away from either the field, or the immediate vicinity
         * of the field. It defaults to having nothing to do else it'll execute what has been
         * passed as the blur callback method.
         * @type {(function())|*}
         */
        this.blurCallback = props.onblurcallback === undefined ? () => {
            // console.log('no-onblur-callback. Nothing to do.')
        } : props.blurCallback;
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
        /**
         * a callback method that's called when a change occurs in this field
         * @type {(function(): void)|*}
         */
        this.changecallback =
            props.changecallback != null
                ? props.changecallback
                : (e) => {
                    // eslint-disable-next-line no-multi-str
                    console.warn(
                        e,
                        "warning:",
                        // eslint-disable-next-line no-multi-str
                        "this input field does not take it's data anywhere! \
                      that's why im printing it out here as a warning. Damn it, supply a callback method to it \
                      with the 'onChange' event listener"
                    );
                };
        this.state = {
            enabled: false,
            previousValue: props.defaultValue === undefined ? '' : props.defaultValue,// the default value to show
            possibleContextMessageBox: null,
        };
        // mark field as mandatory and check whether the flag has a colour attached to it
        this.isRequiredAsterixColour = "#CC0000";
        this.isRequired = null;
        this.required = false;
        if (this.props.isRequired !== undefined) {
            this.required = true;
            this.isRequired = <span
                style={{color: this.isRequiredAsterixColour, fontSize: 16}}>
                &ensp;{this.props.isRequired ? '*' : null}
            </span>
        }

        //
        // the code below will only work for child components_to_delete or subclasses
        //
        // if (this.internalFieldReference.current !== null) {
        //     if (this.internalFieldReference.current.tagName === 'input') {
        //         if (this.internalFieldReference.current.type === 'checkbox' || this.internalFieldReference.current.type === 'radio')
        //             this.internalFieldReference.current.checked = this.defaultValue;
        //         else
        //             this.defaultValue = props.defaultValue === undefined ? '' : props.defaultValue;
        //     }
        //     // Note: this does not prevent values from being edited.
        //     else if (this.internalFieldReference.current.tagName === 'select')
        //         // this is about being pre-loaded with data then switching to selected index
        //         this.selectedIndex = props.selectedIndex === undefined ? '' : props.selectedIndex;
        // }
        /*end of facilitation*/
    }

    //most likely no longer useful
    // componentDidMount() {
    //     //check whether this component is marked mandatory and listen for the onblur event
    //     if(this.isRequired){
    //         const input = document.getElementsByName(this.internalFieldReference.current.name)[0];
    //         // for some reason, using the internal field reference doenst work properly when
    //         // I write an event listener to it. Get it directly using HTML document native methods
    //         // console.log(this.internalFieldReference)//this is the actual input field
    //         input.addEventListener('blur',() =>{
    //             //check whether it has something written on it. if not, proceed
    //             // to show error and shout out
    //             this.controlIsRequired(input);
    //         });
    //     }
    // }
    /**
     *
     * Facilitate default values loaded from redux local storage
     * @type {string|*}
     *
     * The properties passed to this component regard the value that previously
     * occured in this component's parent and caller component before it was unmounted.
     *
     * @param nextProps the properties to look out for
     * @param nextContext
     *
     */
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        //these props are coming from the values that were recorded in redux
        // in the respective parent component that this component has been called in
        if (nextProps)
            this.setState({previousValue: nextProps.defaultValue});
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
     * Removes context-variables message error box
     */
    removeContextMessageError = () => {
        // this.state.possibleContextMessageBox.classList.add("error-context-variables-message-out");
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
     *
     * Method explains to the user which input field needs to be filled...
     * @param fieldName the field name to extract and format the actual human-readable name from
     * @private only available in the base class.
     *
     */
    _sayItemMustBeFilled = (fieldName) => {
        let formattedFieldName = '';
        //iterate through the field and fetch the last 2 items from the string if
        // the element has two items in it
        fieldName = nameFromVariableName(fieldName);
        if (fieldName.constructor.name === [].constructor.name) {
            if (fieldName.length >= 2) {
                //create a name
                formattedFieldName = `${fieldName[fieldName.length - 2]} ${fieldName[fieldName.length - 1]}`
            } else if (fieldName.length === 1) {
                formattedFieldName =
                    //create a name
                    formattedFieldName = `${fieldName[0]}`
            } else {
                formattedFieldName = 'Check these mandatory fields that filling and fill it!';
            }
        }
        formattedFieldName = `${formattedFieldName} MUST BE FILLED!`
        this.showContextMessageError(formattedFieldName);
        //show a suitable message here
        //this works: Now replace it with a messaging bubble
        // window.alert(formattedFieldName);
    }
    /**
     *
     * execute this method when control is required. Cascade amongst all components_to_delete.
     * but only execute them when the cursor blurs away
     * @param input the input to analyse
     *
     */
    evaluateControlOnRequired = (input = HTMLElement) => {
        // const checkboxes = ['radio', 'checkbox'];
        // perhaps do a range check?
        if (this.isRequired)
            if (this.internalFieldReference.current.tagName === 'INPUT')
                //check whether it's a radio button or checkbox
                // if(checkboxes.includes(this.internalFieldReference.current.name))
                //this item fires when data was previously put in but was deleted. then the user began to proceed forward to another.
                /**
                 * split up these checks to allow for orderly and readable code
                 */
                if (this.isRequired && this.internalFieldReference.current.value.length === 0)
                    //throw a tantarum about the item in question not being set
                    this._sayItemMustBeFilled(this.internalFieldReference.current.name);
                else {
                    this.removeContextMessageError();
                    this.removeContextMessageWarning();
                }
            //message the item out
            else if (this.internalFieldReference.current.tagName === 'SELECT')
                //this check should only apply when there is a change in the select field
                //check that this element has a value that has been selected as value 0 (which should never be selected
                if (input.target !== undefined) {
                    if (input.target.selectedIndex === 0)
                        this._sayItemMustBeFilled(this.internalFieldReference.current.name)
                    else
                        //remove any warning or error messages
                    {

                        this.removeContextMessageError();
                        this.removeContextMessageWarning();
                    }
                } else {
                    if (this.internalFieldReference.current.selectedIndex === 0)
                        this._sayItemMustBeFilled(this.internalFieldReference.current.name)
                    else
                        //remove any warning or error messages
                    {

                        this.removeContextMessageError();
                        this.removeContextMessageWarning();
                    }
                }
    }
}
