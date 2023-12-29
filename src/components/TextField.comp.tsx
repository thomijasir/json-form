
import React, { ChangeEvent, useEffect, useMemo } from 'react';


type Validator = {
  validator: (value: string) => boolean;
  message: string;
};
interface TextFieldProps {
  id?: string;
  value: string;
  placeholder?: string;
  validator?: Validator[];
  labelText?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
  onValidate?: (value: any) => any;
}

enum EInputState {
  STARTED,
  IDLE,
  VALID,
  INVALID
}

const TextField: React.FC<TextFieldProps> = (
  { id = '',
    value = '',
    placeholder,
    labelText = '',
    disabled = false,
    validator = [],
    onChange,
    onValidate }
) => {

  const [inputState, setInputState] = React.useState<EInputState>(EInputState.STARTED);
  const [supportText, setSupportText] = React.useState<string>('');
  const [touched, setTouched] = React.useState<boolean>(false);

  useEffect(() => {
    if (disabled) {
      setInputState(EInputState.IDLE);
    }
  }, [disabled])


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    onChange({
      id: id,
      value: currentValue,
    });
    if (currentValue === '') {
      setInputState(EInputState.STARTED);
    } else {
      setInputState(EInputState.IDLE);
    }
  };

  const validateInput = (value: string, validators: Validator[]) => {
    for (const { validator, message } of validators) {
      if (!validator(value)) {
        return {
          valid: false,
          message,
        };
      }
    }
    return {
      valid: true,
      message: '',
    };
  };

  const handleValidate = (val: string) => {
    if (touched) {
      const validCheck = validateInput(val, validator);
      if (validCheck.valid) {
        setInputState(EInputState.VALID);
        setSupportText(validCheck.message);
        onValidate && onValidate({ id: id, value: true });
      } else {
        setInputState(EInputState.INVALID);
        setSupportText(validCheck.message);
        onValidate && onValidate({ id: id, value: false });
      }
    }
  }

  const renderLabelText = useMemo(() => {
    if (inputState === EInputState.IDLE || inputState === EInputState.STARTED) {
      return <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">{labelText}</label>;
    }
    if (inputState === EInputState.VALID) {
      return <label className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">{labelText}</label>;
    }
    if (inputState === EInputState.INVALID) {
      return <label className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{labelText}</label>;
    }
  }, [inputState]);

  const renderSupportText = useMemo(() => {
    if (inputState === EInputState.IDLE || inputState === EInputState.STARTED) {
      return null;
    }
    if (inputState === EInputState.VALID) {
      return <p className="mt-2 text-sm text-green-600 dark:text-green-500">{supportText}</p>;
    }
    if (inputState === EInputState.INVALID) {
      return <p className="mt-2 text-sm text-red-600 dark:text-red-500">{supportText}</p>;
    }
  }, [inputState]);

  const renderCssClassInput = useMemo(() => {
    if (inputState === EInputState.IDLE || inputState === EInputState.STARTED) {
      return 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600';
    }
    if (inputState === EInputState.VALID) {
      return 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400';
    }
    if (inputState === EInputState.INVALID) {
      return 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400';
    }
  }, [inputState]);

  return (
    <div className="flex flex-col mb-4">
      {renderLabelText}
      <input
        value={value}
        id={`field-${id}`}
        type="text"
        disabled={disabled}
        onChange={handleInputChange}
        className={`${renderCssClassInput} disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50`}
        onBlur={(e) => {
          handleValidate(e.target.value);
        }}
        onFocus={() => {
          setTouched(true)
        }}
        placeholder={placeholder} />
      {renderSupportText}
    </div>
  );
};

export default TextField;
