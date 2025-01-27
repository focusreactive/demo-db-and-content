import { defineField } from 'sanity';
import { HeartFilledIcon, BulbOutlineIcon, CreditCardIcon, EditIcon } from '@sanity/icons';
import { regions } from '../regions';

export const review = {
  name: 'review',
  title: 'Casino Review',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'country',
      title: 'For Country',
      type: 'string',
      options: {
        list: regions.map((reg) => ({ value: reg.name, title: reg.title })),
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
};

export const payment = {
  name: 'payment',
  title: 'Payment Method',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
    }),
  ],
};

export const casino = {
  name: 'casino',
  title: 'Casino',
  type: 'document',
  icon: HeartFilledIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Payment Methods',
      type: 'array',
      of: [{ type: payment.name }],
    }),
    defineField({
      name: 'countries',
      title: 'Available In Countries',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: regions.map((reg) => ({ value: reg.name, title: reg.title })),
        layout: 'grid',
      },
    }),
    defineField({
      name: 'reviews',
      title: 'Available Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: review.name }] }],
    }),
  ],
};

export const casinoStudio = {
  name: 'studio',
  title: 'Casino Studio',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'About the Studio',
      type: 'text',
    }),
    defineField({
      name: 'games',
      title: 'Games',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: casino.name }] }],
    }),
  ],
};

export default [casino, casinoStudio, payment, review];
