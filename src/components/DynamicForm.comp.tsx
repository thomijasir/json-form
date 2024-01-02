
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import TextField from "./TextField.comp"
import SelectionField from "./SelectionField.comp";
import { useDebounce } from "../utils/helper";

enum EFieldComponent {
  TEXT,
  SELECTION,
  CHECK_BOX,
  CUSTOM
}

export type Validator = {
  validator: (value: string) => boolean;
  message: string;
};

export const parseStrToEnumFieldComp = (comType: string): EFieldComponent => {
  return {
    'TEXT': EFieldComponent.TEXT,
    'SELECTION': EFieldComponent.SELECTION,
    'CHECK_BOX': EFieldComponent.CHECK_BOX,
    'CUSTOM': EFieldComponent.CUSTOM,
  }[comType] ?? EFieldComponent.TEXT;
};

export const fieldTypeMapper = (fieldType: EFieldComponent) => {
  switch (fieldType) {
    case EFieldComponent.TEXT:
      return TextField;
    default:
      return TextField;
  }
}

export interface IDynamicFormProps {
  config: any;
  controller?: (event: React.FormEvent<HTMLFormElement>) => void;
  onFormSubmitted?: (val: any) => void;
}

export interface IFormControl {
  super: () => void;
  getFormData: () => any;
  getFormValidation: () => any;
  resetForm: () => void;
  getFormJson: () => any;
  setFormJson: (update: any) => void;
  submit: () => void;
}

const DynamicForm = forwardRef((
  {
    config,
    controller = () => { },
    onFormSubmitted = () => { }
  }: IDynamicFormProps, ref) => {

  const formRef = useRef<HTMLFormElement>(null);
  const defaultFormData = Object.keys(config).reduce((obj, key) => ({ ...obj, [key]: '' }), {});
  const defaultFormDataValidation = Object.keys(config).reduce((obj, key) => ({ ...obj, [key]: false }), {});
  const [formJson, setFormJson] = useState({ ...config });
  const [formData, setFormData] = useState(defaultFormData);
  const [formDataValidation, setFormDataValidation] = useState(defaultFormDataValidation);

  useImperativeHandle(ref, () => ({
    // On ImperativeHandle we can do parent execute control child component
    // We can put execute function here
    // we can put external function here
    super() { },
    getFormData() {
      return formData;
    },
    getFormValidation() {
      return formDataValidation
    },
    resetForm() {
      setFormData(defaultFormData);
      setFormDataValidation(defaultFormDataValidation);
    },
    getFormJson() {
      return formJson;
    },
    setFormJson(update: any) {
      console.log('FORM RENDER UPDATE: ', update);
      setFormJson({
        ...formJson,
        ...update,
      })
    },
    submit() {
      onFormSubmitted({
        formRef, formData, formDataValidation
      });
    }
  }));

  const handleInputChange = (e: { id: string, value: string }) => {
    setFormData({
      ...formData,
      [e.id]: e.value
    });
  };

  const handleFieldValidity = (e: { id: string, value: boolean }) => {
    setFormDataValidation({
      ...formDataValidation,
      [e.id]: e.value
    });
  };

  const renderInputField = useMemo(() => {
    const fields = [];
    for (const item of Object.entries(formJson)) {
      const [key, value] = item as [string, any];
      switch (parseStrToEnumFieldComp(value.component)) {
        case EFieldComponent.TEXT:
          fields.push(
            <TextField
              key={key}
              id={key}
              value={formData[key as keyof typeof formData] || ''}
              labelText={value.labelText}
              placeholder={value.placeholder}
              validator={value.validation}
              disabled={value.disabled}
              onChange={handleInputChange} onValidate={handleFieldValidity} />
          );
          break;
        case EFieldComponent.SELECTION:
          fields.push(
            <SelectionField
              key={key}
              id={key}
              onChange={(e) => {
                handleInputChange(e)
                handleFieldValidity({ id: e.id, value: true })
              }}
              options={(value as any).options}
              labelText={value.labelText}
            />
          );
          break;
        case EFieldComponent.CUSTOM:
          fields.push(<div key={key}>
            {value.parts || null}
          </div>);
          break;
        default:
          break;
      }
    }
    return fields;
  }, [formJson, handleInputChange, handleFieldValidity])

  const isValidation = useMemo(() => formDataValidation && Object.values(formDataValidation).every(val => val), [formDataValidation]);

  const emitAction = useDebounce(controller, 500);

  return (
    <form ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmitted({
          formRef, formData, formDataValidation
        });
      }} onChange={emitAction}>
      {renderInputField}
      <div className="flex mt-4 w-full">
        <button disabled={!isValidation} type="submit" className="bg-blue-500  text-white font-bold py-2 px-4 rounded w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-70">
          Submit Internal
        </button>
      </div>
    </form>
  )
})

export default DynamicForm;
