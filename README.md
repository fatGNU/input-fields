## input-field collection of sub-components

All components with input field will submit their field names as the field names and \
values in the form a JSON object.
Input fields are custom fields designed to enable callbacks during the `onChange`event.

#### Properties

` callback`
is used to pass the method responsible for gathering data from this component.

`name`
is used to identify this field as well as attach a key to the data fetched through the `callback` property.

`placeholder` is used as a label for a given field.

#### How to call these fields

&emsp; `<InputField name={name_text} placeholder = {placeholder_text} callback = {some_function_reference} />`

Replace the `InputField` with the appropriate field call as required (see the field-list below for reference).

#### InputField subclasses list:
The following are all fields of the `InputField` subclass:

- `TextField` - which is used to gather non-filtered text.
- `NumberField` - which is used to gather numbers only. The maximum length allowed is 18 numbers.
- `PasswordField` - works just like TextField except its type is password
- `EmailField` - used to gather email addresses
- `PhoneNumberField` - used to gather phone numbers
- `SelectField` - used to get data from a select tool. `options` is unique to this type of input field. It requires
  an array of JSONs.
- `FileSelectField` - used to select files.
- `FileSelectFieldIcon` - used to select files but is decorated with a '+' icon.
- `RadioField` - a normal radio field.
- `CheckBoxField` - a normal checkbox field.
- `OtpField` - works just like a number field but limited to 6 numbers.
- `TextAreaField` - works just like a `TextField` field component but with multiple lines.
- `PassportField` - which is used to gather passport numbers. This number is unique to Kenya.
- `DateField` - which is used to select a date. Defaults to `today's date` and limits backwards to `1965`.
- `WebAddressField` - which is used to ensure web addresses are pre-validated before upload to some server.
     
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
## Errors that are thrown
 `ReferenceError` {when the name property is absent on calling this component}. This is
 because the name is used to identify the field and its value during the execution of
 the callback method.
 
 ### NOTE:
 In order to drill down a component and get a reference to the proper HTMLInputElement that is in use
 here, the base class implements an internal reference unto itself (and its instances). This can be availed
 to the outside world (relative to the `InputField-class` in question) as defined below:
 
 When accessing the input-field reference from outside the `<InputField />` component in question,
 use the notation `<your-chosen-reference-object>.current.internalFieldReference`
 where `<your-chosen-reference-object>` is replaced with the variable that hosts the react reference.
 `current` is the current reference instance of the desired reference.
 `internalFieldReference` is an actual variable hosting the `InputField`'s internal reference.
 
 That name MUST BE PRESENT WHEN ACCESSING SPECIFIC `HTMLInputElement` instances.
  An example of this access procedure:
`<some-reference-variable-in-calling-class>.internalFieldReference.current.<desired-attribute>`
Note, again, that `current` **does not follow** the reference in the calling context (or in this case class). 
 This notation is of significance when a react component class is being referred. The more traditional means of using
`current` immediately after the reference in the calling context is `evident when referring to the
actual HTMLInputElement`.

