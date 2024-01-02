
import { useRef } from "react";
import DynamicForm, { IFormControl } from "./components/DynamicForm.comp"
import { validateEmail, validateMaximum, validateMinimum, validateName, validateNumberOnly, validateRequired } from "./utils/validate"

type Nullable<T> = T | null;



function App() {
  const dynamicFormRef = useRef(null);

  const FORM_JSON = {
    name: {
      component: 'TEXT',
      property: {}, // This property comes from jsonform io, i have small configure to take out the property out of the property object because it is not needed and i optimized
      labelText: 'Your Name',
      validation: [
        {
          validator: validateRequired,
          message: 'This field is required!',
        },
        {
          validator: validateName,
          message: 'Please enter a valid name!',
        },
        {
          validator: validateMinimum(3),
          message: 'Minimum name is 3 character!',
        }
      ],
      disabled: false,
      supportText: 'Please enter your name',
      placeholder: 'Your name here'
    },
    phone: {
      component: 'TEXT',
      labelText: 'Phone Number',
      validation: [
        {
          validator: validateRequired,
          message: 'This field is required!',
        },
        {
          validator: validateNumberOnly,
          message: 'Please enter a valid number',
        },
        {
          validator: validateMinimum(8),
          message: 'Minimum name is 8 character!',
        }
      ],
      disabled: true,
      supportText: 'Please enter your home',
      placeholder: 'Your home here'
    },
    devider: {
      component: 'CUSTOM',
      parts: <div className="h-2 border-b-2 border-gray-400 mb-4"></div>
    },
    email: {
      component: 'TEXT',
      labelText: 'Enter Your Email',
      validation: [
        {
          validator: validateRequired,
          message: 'This field is required!',
        },
        {
          validator: validateEmail,
          message: 'Please enter a valid email!',
        },
        {
          validator: validateMinimum(3),
          message: 'Minimum name is 3 character!',
        }
      ],
      disabled: true,
      supportText: 'Please enter your name',
      placeholder: 'Your email here'
    },
    country: {
      component: 'SELECTION',
      labelText: 'Select Country',
      validation: [
        {
          validator: validateRequired,
          message: 'This field is required!',
        },
      ],
      options: [
        { id: 6, name: 'Singapore', disabled: false },
        { id: 1, name: 'United States', disabled: false },
        { id: 2, name: 'Canada', disabled: true },
        { id: 3, name: 'France', disabled: true },
        { id: 4, name: 'Germany', disabled: false },
      ],
      disabled: false,
      supportText: 'Please select your country',
      placeholder: 'Your country here'
    },
    btn: {
      component: 'CUSTOM',
      parts: (
        <button type="button" onClick={() => {
          const formRef = dynamicFormRef.current as Nullable<IFormControl>;
          formRef?.setFormJson(addAddress);
        }} className="bg-blue-500  text-white font-bold py-2 px-4 rounded w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-70 mb-4">
          Add New
        </button>
      )
    },
    address: {
      component: 'TEXT',
      labelText: 'Home Address',
      validation: [
        {
          validator: validateRequired,
          message: 'This field is required!',
        },
        {
          validator: validateMinimum(8),
          message: 'Minimum is 8 character!',
        },
        {
          validator: validateMaximum(50),
          message: 'Maximum is 50 character!',
        }
      ],
      disabled: true,
      supportText: 'Please enter your home address',
      placeholder: 'Your home address here'
    },
  }

  const compileOnFlyForSingapore = {
    nrfc: {
      component: 'TEXT',
      labelText: 'Your NRFC Code',
      validation: [
        {
          validator: validateName,
          message: 'Please enter a valid NRFC!',
        },
        {
          validator: validateMinimum(3),
          message: 'Minimum name is 3 character!',
        }
      ],
      disabled: false,
      supportText: 'Please enter your NRFC',
      placeholder: 'Your NRFC here'
    },
    hdb: {
      component: 'TEXT',
      labelText: 'Your HDB Number',
      validation: [
        {
          validator: validateNumberOnly,
          message: 'Please enter a valid name!',
        },
        {
          validator: validateMinimum(3),
          message: 'Minimum name is 3 character!',
        }
      ],
      disabled: false,
      supportText: 'Please enter your HDB number',
      placeholder: 'Your HDB number here'
    },
  }

  const addAddress = {
    addressExternal: {
      component: 'TEXT',
      property: {}, // This property comes from jsonform io, i have small configure to take out the property out of the property object because it is not needed and i optimized
      labelText: 'Your Address External',
      validation: [
        {
          validator: validateRequired,
          message: 'This field is required!',
        },
        {
          validator: validateMinimum(3),
          message: 'Minimum address is 3 character!',
        }
      ],
      disabled: false,
      supportText: 'Please enter your address',
      placeholder: 'Your address here'
    },
  }

  const formController = (e: React.FormEvent<HTMLFormElement>) => {
    const currentTarget = e.target as HTMLInputElement;
    const formRef = dynamicFormRef.current as Nullable<IFormControl>;
    // IIFE (Immediately Invoked Function Expression) executor
    ({
      'field-name': () => {
        formRef?.setFormJson({
          phone: {
            ...formRef?.getFormJson().phone,
            disabled: currentTarget.value === '' ? true : false
          },
        });
      },
      'field-phone': () => {
        formRef?.setFormJson({
          email: {
            ...formRef?.getFormJson().email,
            disabled: currentTarget.value === '' ? true : false
          },
        });
      },
      'selection-country': () => {
        formRef?.setFormJson({
          address: {
            ...formRef?.getFormJson().address,
            disabled: false
          },
        });
        if (currentTarget.value === '0') {
          formRef?.setFormJson(compileOnFlyForSingapore);
        } else {
          const updatedJsonForm = formRef?.getFormJson();
          for (const key of Object.keys(compileOnFlyForSingapore)) {
            delete updatedJsonForm[key];
          }
          formRef?.setFormJson(updatedJsonForm);
        }
      },
    }[currentTarget.id] ?? (() => { }))();
  }

  const handleOnFormSubmit = (e: any) => {
    console.log('FORM DATA: ', e);
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-lg">JSON Form Dynamic Render</h1>
      <div className="h-2 border-b-2 border-gray-400 mb-4"></div>
      <p className="text-sm text-gray-500 mb-4">
        This is a sample dynamic render of form components. The form components are defined in a JSON file and rendered dynamically.
      </p>
      <DynamicForm
        config={FORM_JSON}
        ref={dynamicFormRef}
        controller={formController}
        onFormSubmitted={handleOnFormSubmit} />
      {/* 
        External Button can used for external trigger form submit
      */}
      <div className="flex mt-4 w-full">
        <button type="button" onClick={() => {
          const formRef = dynamicFormRef.current as Nullable<IFormControl>;
          formRef?.submit();
        }} className="bg-blue-500  text-white font-bold py-2 px-4 rounded w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-70">
          Submit External
        </button>
      </div>
    </div>
  )
}

export default App
