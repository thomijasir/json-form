
import { Children, useState } from 'react'
import TextField from "./components/TextField.comp"
import { validateEmail } from "./utils/validate"

enum EFieldComponent {
  TEXT,
  SELECTION,
  CHECK_BOX,
}

const parseStrToEnumFieldComp = (comType: string): EFieldComponent => {
  return {
    'TEXT': EFieldComponent.TEXT,
    'SELECTION': EFieldComponent.SELECTION,
    'CHECK_BOX': EFieldComponent.CHECK_BOX,
  }[comType] ?? EFieldComponent.TEXT;
};


function App() {

  const [name, setName] = useState<string | null>('');

  const formJson = {
    name: {
      component: 'TEXT_FIELD',
      label: 'Your Name',
      errorMessage: 'Please enter your name',
      required: true,
      validation: validateEmail,
      placeholder: 'Your name here'
    },
  }


  return (
    <div className="flex flex-col p-4">
      <h1 className="text-lg">JSON Form Dynamic Render</h1>
      <div className="h-2 border-b-2 border-gray-400 mb-4"></div>
      <p className="text-sm text-gray-500 mb-4">
        This is a sample dynamic render of form components. The form components are defined in a JSON file and rendered dynamically.
      </p>
      <form onChange={(e: React.FormEvent<HTMLFormElement>) => {
        const elm = e.target as HTMLInputElement;
        console.log('myForm:', elm.id);
      }}>
        <TextField
          placeholder="Your name here"
          value={name} onChange={(e) => {
            setName(e)
          }} onValidate={(e) => {
            console.log('validate: ', e);
            return validateEmail(e);
          }} />
        <TextField
          placeholder="Your Number"
          value={name} onChange={(e) => {
            setName(e)
          }} onValidate={(e) => {
            console.log('validate: ', e);
            return true;
          }} />
        <TextField
          placeholder="Your Address"
          value={name} onChange={(e) => {
            setName(e)
          }} onValidate={(e) => {
            console.log('validate: ', e);
            return true;
          }} />
      </form>
    </div>
  )
}

export default App
