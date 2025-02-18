import { IConfigurationResponse } from '@repo/ui/types/configuration';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { ConfigurationType } from '@repo/ui/enums/configuration';
import { Button } from '../../../../components/ui/button';
import { updateConfiguration } from './configuration.action';
import { toast } from 'sonner';
import { Input } from '../../../../components/ui/input';

interface IUpdateConfiguration extends Omit<IConfigurationResponse, 'key'> {
  onCancel: () => void;
  keyName: ConfigurationType;
}

function isNumber(value: string) {
  return !isNaN(parseFloat(value));
}

function isValidDateString(dateString: string) {
  // Regular expression to match the date format YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the string matches the regex pattern
  if (!regex.test(dateString)) {
    return false;
  }

  // Parse the date string
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a Date object with the provided values
  const date = new Date(year, month - 1, day);

  // Check if the constructed date matches the original input
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

const UpdateConfiguration = ({
  id,
  keyName,
  value,
  type,
  description,
  onCancel,
}: IUpdateConfiguration) => {
  const configurationTypes = Object.keys(ConfigurationType);
  const [valueSelected, setSelectedValue] = useState<any>(value);
  const [typeSelected, setTypeSelected] = useState<ConfigurationType>(type);
  const [descriptionSelected, setDescriptionSelected] = useState<string>(
    description ?? '',
  );
  const [loading, setLoading] = useState<boolean>(false);

  const generatePayload = () => {
    const payload = {
      key: keyName,
      value: '',
      type: typeSelected,
      description: descriptionSelected,
    };
    let parsedArray = '';
    switch (typeSelected) {
      case ConfigurationType.STRING:
        if (typeof valueSelected === 'string') {
          payload.value = valueSelected;
          return payload;
        } else {
          toast('Please input only string value.');
          return;
        }
      case ConfigurationType.STRING_ARRAY:
        parsedArray = '';
        try {
          parsedArray = JSON.parse(valueSelected);
        } catch (err) {
          toast('Please input a valid array of string.');
          return;
        }
        if (!Array.isArray(parsedArray)) {
          toast('Please input valid array.');
          return;
        }
        if (!parsedArray.every((item) => typeof item === 'string')) {
          toast('Array contains non-string elements.');
          return;
        }
        payload.value = valueSelected;
        return payload;
      case ConfigurationType.BOOLEAN:
        if (valueSelected === 'false' || valueSelected === 'true') {
          payload.value = valueSelected;
          return payload;
        } else {
          toast('Please Enter Boolean True or False');
          return;
        }
      case ConfigurationType.BOOLEAN_ARRAY:
        parsedArray = '';
        try {
          parsedArray = JSON.parse(valueSelected);
        } catch (err) {
          toast('Please input a valid array of boolean values.');
          return;
        }
        if (!Array.isArray(parsedArray)) {
          toast('Please input valid array.');
          return;
        }
        if (
          !parsedArray.every((item) => {
            return item === 'false' || item === 'true';
          })
        ) {
          toast('Please input boolean values.');
          return;
        }
        payload.value = valueSelected;
        return payload;
      case ConfigurationType.NUMBER:
        try {
          if (!isNumber(valueSelected)) {
            toast('Please input valid number');
            return;
          }
        } catch (err) {
          toast('Please input valid number.');
          return;
        }
        payload.value = valueSelected;
        return payload;
      case ConfigurationType.NUMBER_ARRAY:
        parsedArray = '';
        try {
          parsedArray = JSON.parse(valueSelected);
          if (!Array.isArray(parsedArray)) {
            toast('Please input valid array.');
            return;
          }
          if (
            !parsedArray.every((item) => {
              return isNumber(item);
            })
          ) {
            toast('Please input number values.');
            return;
          }
        } catch (err) {
          toast('Please input a valid array of numbers.');
          return;
        }
        payload.value = valueSelected;
        return payload;
      case ConfigurationType.DATE:
        try {
          if (!isValidDateString(valueSelected)) {
            toast('Please Enter Date in Format YYYY-MM-DD.');
            return;
          }
          payload.value = valueSelected;
          return payload;
        } catch (err) {
          toast('Please Enter Date in Format YYYY-MM-DD.');
          return;
        }
      case ConfigurationType.DATE_ARRAY:
        parsedArray = '';
        try {
          parsedArray = JSON.parse(valueSelected);
          if (!Array.isArray(parsedArray)) {
            toast('Please input valid array.');
            return;
          }
          if (
            !parsedArray.every((item) => {
              return isValidDateString(item);
            })
          ) {
            toast('Please input date values in YYYY-MM-DD Format.');
            return;
          }
        } catch (err) {
          toast('Please input valid array of dates in YYYY-MM-DD Format.');
          return;
        }
        payload.value = valueSelected;
        return payload;
      case ConfigurationType.OBJECT:
        try {
          const obj = JSON.parse(valueSelected);
          if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            toast('Not a valid object');
            return;
          }
          payload.value = valueSelected;
          return payload;
        } catch (err) {
          toast('Please input a valid object.');
          return;
        }
      case ConfigurationType.OBJECT_ARRAY:
        try {
          parsedArray = JSON.parse(valueSelected);
          if (!Array.isArray(parsedArray)) {
            toast('Not an array');
            return;
          }
          if (
            !parsedArray.every(
              (item) =>
                typeof item === 'object' &&
                item !== null &&
                !Array.isArray(item),
            )
          ) {
            toast('Contains invalid objects');
            return;
          }
          payload.value = valueSelected;
          return payload;
        } catch (err) {
          toast('Please input a valid array of objects.');
          return;
        }
      case ConfigurationType.ENUM:
        payload.value = valueSelected;
        return payload;
      case ConfigurationType.FILE:
        if (typeof valueSelected === 'string' && valueSelected.trim() !== '') {
          payload.value = valueSelected;
          return payload;
        } else {
          toast('Please enter a valid file path or identifier.');
          return;
        }
      case ConfigurationType.FILE_ARRAY:
        try {
          parsedArray = JSON.parse(valueSelected);
          if (!Array.isArray(parsedArray)) {
            toast('Not an array');
            return;
          }
          if (
            !parsedArray.every(
              (item) => typeof item === 'string' && item.trim() !== '',
            )
          ) {
            toast('Contains invalid file paths or identifiers');
            return;
          }
          payload.value = valueSelected;
          return payload;
        } catch (err) {
          toast('Please input array of file paths or identifiers');
          return;
        }
      default:
        toast('Unknown configuration type');
        return;
    }
  };

  const handleSubmit = async () => {
    const payload = generatePayload();

    if (payload?.value && payload?.key && payload?.description) {
      setLoading(true);
      const data = await updateConfiguration({ id, payload });
      if ('error' in data) {
        toast(data.error.message);
      }
      if ('success' in data) {
        toast(data.message);
      }
      setLoading(false);
      onCancel();
    }else{
      toast("Please provide all the fields!");
    }
  };

  return (
    <div>
      <p className="py-2 text-lg font-bold">{keyName}</p>
      <textarea
        className="p-2 w-full border-2"
        value={valueSelected}
        onChange={(e) => {
          const val = e.target.value;
          setSelectedValue(val.trim());
        }}
        rows={5}
      />
      <p className="py-2 text-lg font-bold">Description</p>
      <Input
        className="p-2 w-full border-2"
        value={descriptionSelected}
        onChange={(e) => {
          const val = e.target.value;
          setDescriptionSelected(val);
        }}
      />
      <Select
        value={typeSelected}
        onValueChange={(value: string) => {
          const configType = value as ConfigurationType;
          setTypeSelected(configType);
        }}
      >
        <SelectTrigger className="w-full my-2">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {configurationTypes.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-4 justify-end my-3">
        <Button disabled={loading} onClick={() => handleSubmit()}>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default UpdateConfiguration;
