import React, { ChangeEvent, useMemo } from 'react';

interface ISelectionFieldProps {
  id?: string;
  selections?: any[];
  supportText?: string;
  labelText?: string;
  options: SelectionOptions[];
  onChange: (value: any) => void;
}
enum EInputState {
  STARTED,
  IDLE,
  VALID,
  INVALID
}

type SelectionOptions = {
  id: number;
  name: string;
  disabled: boolean;
}

const SelectionField: React.FC<ISelectionFieldProps> = ({
  id = 'SELECTION',
  supportText = 'YES',
  labelText = 'YES',
  options,
  onChange
}) => {

  const [inputState, setInputState] = React.useState<EInputState>(EInputState.STARTED);
  const [touched, setTouched] = React.useState<boolean>(false);

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentValue = parseInt(event.target.value);
    onChange({
      id: id,
      value: options[currentValue],
    })
  }


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
      return null;
    }
    if (inputState === EInputState.INVALID) {
      return <p className="mt-2 text-sm text-red-600 dark:text-red-500">{supportText}</p>;
    }
  }, [inputState]);

  const renderListPoint = useMemo(() => {
    return options.map((item, index) => {
      return <option key={index} value={index} disabled={item.disabled}>{item.name}</option>
    })
  }, [options]);


  return (
    <div className="flex flex-col mb-4">
      {renderLabelText}
      <select defaultValue="DEFAULT"
        id={`selection-${id}`}
        onChange={handleOnChange}
        onFocus={() => setTouched(true)}
        className={`${renderCssClassInput} disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-50`}>
        <option value="DEFAULT" disabled>Choose a salutation ...</option>
        {renderListPoint}
      </select>
      {renderSupportText}
    </div>
  );
}

export default SelectionField;