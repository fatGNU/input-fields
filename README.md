This collection of subclasses of the `InputField` class all use `bootstrap-css` for styling. Make sure
to install version 4 and above before use.

## input-field collection of sub-components
These are react-based class Components responsible for collection, pre-validation and identification of
various types of input fields used in a normal web form interface. Each datum provided by each of these `InputField`s
is stored in a JSON which is provided by the designer. Input field's are custom fields designed
to enable data collection through a callback method reference (not method call) during the `onChange`event.

#### Properties of the  _InputField_ component

` callback`
is used to pass the method responsible for gathering data from this component.

`name`
is used to identify this field as well as attach a key to the data fetched through the `callback` property.

`placeholder` is used as a label for a given field.


#### How to call/implement these fields

&emsp; `<InputField <isRequired> <changecallback = {some_method_reference}><blurcallback={some_method_reference}> name={name_text} placeholder = {placeholder_text} />`

Replace the `InputField` with the appropriate field call as required (see the field-list below for reference).

#### InputField subclasses list:
The following are all fields of the `InputField` subclass:

- `TextField` - which is used to gather non-filtered text.
- `NumberField` - which is used to gather numbers only. The maximum length allowed is 18 numbers.
- `PasswordField` - works just like TextField except its type is password
- `EmailField` - used to gather email addresses
- `PhoneNumberField` - used to gather phone numbers
- `SelectField` - used to get data from a select tool. `options` is unique to this type of input field.
- `FileSelectField` - used to select files.
- `FileSelectFieldIcon` - used to select files but is decorated with a '+' icon.
- `RadioField` - a normal radio field.
- `CheckBoxField` - a normal checkbox field.
- `OtpField` - works just like a number field but limited to 6 numbers.
- `TextAreaField` - works just like a `TextField` field component but with multiple lines.
- `PassportField` - which is used to gather passport numbers. This number is unique to Kenya.
- `DateField` - which is used to select a date. Defaults to `today's date` and limits backwards to `1965`.
- `WebAddressField` - which is used to ensure web addresses are pre-validated before upload to some server.
- `RangeField` - which is used to select a value from an input-slider element.

  
#### The DateField component
The `DateField` is unique in that it accepts additional arguments in addition to the above properties. \
Note that these props below are all optional:
```
mininumDate - is the least date that the datefield can select. It defaults to the year 1965
maximumDate - is the highest or latest date that a datefield can allow for selection. it defaults
                to Date().getDay()/Date().getMonth()/Date().getFullYear()
                Note: the 'Date()' call here IS PURELY FOR ILLUSTRATION ONLY. Use common sense!
required - is used to make sure that the datefield is required!
```

#### The RangeField component
This component selects an integer value (as opposed to typing in one).
In addition to existing `InputField` props list, this field accepts an (optional) additional four:

```
    maximumValue - an Integer limiting the range to an upper level. Defaults to 60
    minimumValue - an Integer limiting the range to a lower level. Defaults to 1
    smoothnessIndex - an Integer changing the smoothness of selection. By default all smoothness
                        Integers are divided by 7 (for no reason) to get a float value
                        that sets the 'step' attribute of <input type='range' .../> HTMLElement.
    defaultValue - the default value that's pre-selected when the component mounts.
                    it defaults to a value in accordance with the formula
                            (internalDefaultMaximumValue - internalDefaultMinimumValue)/3
                    The divider --in this case, 3-- has been chosen arbitrarily.
```


## throws Error
 Any field will throw a `ReferenceError` when the name property is absent on calling this component.
 This is because the said name is used to identify the field and its user-typed value during the execution of
 the callback method (assuming you are using one...).
 
 ### NOTE:
 In order to drill down a component and get a reference to the proper HTMLInputElement that is in use,
 the base class implements an internal reference unto itself (and its instances). This can be availed
 to the outside world (relative to the `InputField-class` in question) as defined below:
 
 When accessing the input-field reference from outside the `<InputField />` component in question,
 use the notation `<your-chosen-reference-object>.current.internalFieldReference`
 where `<your-chosen-reference-object>` is replaced with the variable that hosts the react reference.
 `current` is the current reference instance of the desired reference.
 `internalFieldReference` is an actual variable hosting the `InputField`'s internal reference.
 
 That name MUST BE PRESENT WHEN ACCESSING SPECIFIC `HTMLInputElement` instances.
  An example of this access procedure:
  
`<some-reference-variable-in-calling-class>.current.internalFieldReference.current.<desired-attribute>`.

An example of this, accessing a  <`Component`.../> level attribute is in the code below:
 ```
   import React,{Component} from 'react';
   ...//other imports here

   class MyClass extends Component{//or other SubClass which extends Component
      let myRef = React.createRef();
      ...
      //some code above
      <MyComponent ref = {myRef} ... />

      //to access the MyComponent, do:
      myRef.current.<some-desired-attribute-or-method-call>
  }
 ```
 The more traditional means of using `current` when accessing a given HTMLElement subclass immediately after the
 reference in the calling context is `evident when referring to the actual HTMLInputElement`.
 ```
   import React,{Component} from 'react';
   import MyComponent from '/some/js/component/path';
   ...//other imports here

   class MyOtherClass extends Component{//or other SubClass which extends Component
      let myAnotherRef = React.createRef();
      ...
      //some code above
      <MyComponent ref = {myAnotherRef} ... />

      //to access the MyComponent's input field, do:
      
      myAnotherRef.internalFieldReference.current.<some-desired-attribute-or-method-call>
      
      //in the line above, the "current" field is available when accessing "internalFieldReference" object
  }
 ```

