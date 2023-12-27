
import React, { ChangeEvent, useMemo } from 'react';

interface TextFieldProps {
  id?: string;
  value: string | null;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onValidate?: (value: any) => boolean;
}

enum EInputState {
  STARTED,
  IDLE,
  VALID,
  INVALID
}

const TextField: React.FC<TextFieldProps> = (
  { id = '',
    value,
    placeholder,
    required = false,
    onChange,
    onBlur,
    onValidate }
) => {

  const [inputState, setInputState] = React.useState<EInputState>(EInputState.STARTED);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    onChange(currentValue);
    if (currentValue === '') {
      setInputState(EInputState.STARTED);
    } else {
      setInputState(EInputState.IDLE);
      handleValidate(currentValue);
    }

  };

  const handleValidate = (val: string) => {
    if (onValidate && onValidate(val)) {
      setInputState(EInputState.VALID);
    } else {
      setInputState(EInputState.INVALID);
    }
  }

  const renderLabelText = useMemo(() => {
    if (inputState === EInputState.IDLE || inputState === EInputState.STARTED) {
      return <label htmlFor="username-error" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Your name</label>;
    }
    if (inputState === EInputState.VALID) {
      return <label htmlFor="username-error" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Your name</label>;
    }
    if (inputState === EInputState.INVALID) {
      return <label htmlFor="username-error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>;
    }
  }, [inputState]);

  const renderSupportText = useMemo(() => {
    if (inputState === EInputState.IDLE || inputState === EInputState.STARTED) {
      return null;
    }
    if (inputState === EInputState.VALID) {
      return <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Nice!</span> Username available!</p>;
    }
    if (inputState === EInputState.INVALID) {
      return <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>;
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
        id={`input-text-error-${id}`}
        type="text"
        value={value || ''}
        onChange={handleInputChange}
        className={renderCssClassInput}
        placeholder={placeholder} />
      {renderSupportText}
    </div>
  );
};

export default TextField;
