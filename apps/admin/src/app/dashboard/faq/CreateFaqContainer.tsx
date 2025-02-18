import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { createFaq } from './faq.action';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';
import { IFaqCategory, IFaqRequestPayload } from '@repo/ui/types/faq';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

export interface ICreateFaqProps {
  categories: IFaqCategory[];
  onClose: () => void;
}

export default function CreateFaq({ categories, onClose }: ICreateFaqProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IFaqRequestPayload>({
    answer: '',
    categoryId: -1,
    question: '',
  });

  const [categoryName, setCategoryName] = useState<string>(
    categories.length > 0 ? categories[0].name : '',
  );

  const handleSubmit = async () => {
    if (!formValues.question || !formValues.answer) {
      toast('Please fill all the fields.');
      return;
    }

    const findSelectedCategory = categories.find(
      (a) => a.name === categoryName,
    );
    if (!findSelectedCategory) {
      toast('Please Select FAQ Category!');
      return;
    }

    setLoading(true);
    const data = await createFaq({
      ...formValues,
      categoryId: findSelectedCategory.id ?? -1,
    });

    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setLoading(false);
    onClose();
  };

  return (
    <PermissionCheck permission={permissions.faq.create}>
      <div className="flex flex-col">
        <h1 className="py-2">Create FAQ</h1>
        <Input
          value={formValues.question}
          className="my-2"
          onChange={(e) => {
            setFormValues({ ...formValues, question: e.target.value });
          }}
          placeholder="Enter Question"
        />

        <textarea
          value={formValues.answer}
          className="my-2 p-2 border border-gray-200"
          rows={3}
          onChange={(e) => {
            setFormValues({ ...formValues, answer: e.target.value });
          }}
          placeholder="Enter Answer"
        />

        <Select
          value={categoryName}
          onValueChange={(value: string) => {
            setCategoryName(value);
          }}
        >
          <SelectTrigger className="w-full my-2">
            <SelectValue placeholder="Page" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((a) => (
              <SelectItem key={a.name} value={a.name}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-3 px-3 mt-5 justify-end">
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={
              loading ||
              !(
                formValues.question &&
                formValues.answer
              )
            }
            className="bg-secondary-color"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </div>
    </PermissionCheck>
  );
}
