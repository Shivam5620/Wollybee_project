import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';
import { IFaq, IFaqCategory, IFaqRequestPayload } from '@repo/ui/types/faq';
import { editFaq } from './faq.action';

export interface IEditFaqProps {
  initialValues: IFaq;
  onClose: () => void;
  categories: IFaqCategory[];
}

export default function EditFaq({
  initialValues,
  onClose,
  categories,
}: IEditFaqProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IFaqRequestPayload>({
    answer: initialValues.answer ?? '',
    categoryId: initialValues.category.id ?? -1,
    question: initialValues.question ?? '',
  });
  const currentCategoryName = categories.find(
    (a) => a.name === initialValues.category.name,
  )?.name;

  const [categoryName, setCategoryName] = useState<string>(
    currentCategoryName ?? '',
  );

  const handleSubmit = async () => {
    if (
      !formValues.question ||
      !formValues.answer ||
      formValues.categoryId == -1
    ) {
      toast('Please fill all the fields.');
      return;
    }

    setLoading(true);

    const findSelectedCategory = categories.find(
      (a) => a.name === categoryName,
    );
    if (!findSelectedCategory) {
      toast('Please Select FAQ Category!');
      return;
    }

    const data = await editFaq({
      id: initialValues.id ?? -1,
      payload: { ...formValues, categoryId: findSelectedCategory.id ?? -1 },
    });

    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    onClose();
  };

  return (
    <PermissionCheck permission={permissions.faq.update}>
      <div className="flex flex-col">
        <h1 className="py-2">Edit FAQ</h1>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button
            disabled={loading}
            className="bg-secondary-color"
            onClick={handleSubmit}
          >
            Edit
          </Button>
        </div>
      </div>
    </PermissionCheck>
  );
}
