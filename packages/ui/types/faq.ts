export interface IFaqCategory {
  id?: number;
  name: string;
  imageUrl: string;
  imageKey: string;
  createdAt: Date;
  updatedAt: Date;
  faqs: IFaq[];
}

export interface IFaq {
  id?: number;
  category: IFaqCategory;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFaqRequestPayload
  extends Omit<IFaq, 'id' | 'category' | 'createdAt' | 'updatedAt'> {
  categoryId: number;
}
