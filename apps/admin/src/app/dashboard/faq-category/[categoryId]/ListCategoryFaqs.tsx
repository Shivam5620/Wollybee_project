'use client';
import {
  TableActionsType,
  TableComponent,
} from '../../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import CustomDialog from '../../../components/common/CustomDialog';
import { useState } from 'react';
import PermissionCheck from '../../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';
import { IFaq, IFaqCategory } from '@repo/ui/types/faq';
import CreateFaq from '../../faq/CreateFaqContainer';
import EditFaq from '../../faq/EditFaq';
import DeleteFaq from '../../faq/DeleteFaq';

export interface ISelectedItem {
  name: string;
  id: number;
}

interface IListCategoryFaqsProps {
  faq: IFaq[];
  title: string;
  faqCategories: IFaqCategory[];
}

const ListCategoryFaqs = ({
  title,
  faqCategories,
  faq,
}: IListCategoryFaqsProps) => {
  
  const columns: ColumnDef<IFaq>[] = [
    {
      accessorKey: 'question',
      header: 'Question',
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
    },
  ];

  return (
    <>
      <TableComponent
        tableHeading={title}
        columns={columns}
        data={faq}
        filterable={true}
        filterColumnName="question"
        tableActions={[]}
      />
    </>
  );
};

export default ListCategoryFaqs;
