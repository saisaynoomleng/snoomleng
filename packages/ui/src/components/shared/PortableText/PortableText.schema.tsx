import { defineSchema } from '@portabletext/editor';

import { FaHighlighter } from 'react-icons/fa6';
import {
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
  MdOutlineFormatUnderlined,
  MdStrikethroughS,
  MdOutlineFormatListBulleted,
  MdAddLink,
  MdOutlineFormatListNumbered,
  MdOutlineImage,
  MdCode,
} from 'react-icons/md';

export const schema = defineSchema({
  decorators: [
    { title: 'Bold', name: 'strong', icon: MdOutlineFormatBold },
    { title: 'Italic', name: 'em', icon: MdOutlineFormatItalic },
    { title: 'Underline', name: 'underline', icon: MdOutlineFormatUnderlined },
    { title: 'Highlight', name: 'highlight', icon: FaHighlighter },
    { title: 'Strike Through', name: 'strikeThrough', icon: MdStrikethroughS },
  ],

  styles: [
    { title: 'Normal', name: 'normal' },
    { title: 'Heading 1', name: 'h1' },
    { title: 'Heading 2', name: 'h2' },
    { title: 'Heading 3', name: 'h3' },
    { title: 'Heading 4', name: 'h4' },
    { title: 'Heading 5', name: 'h5' },
    { title: 'Heading 6', name: 'h6' },
    { title: 'Quote', name: 'blockquote' },
  ],

  annotations: [
    {
      title: 'Hyper Link',
      name: 'link',
      icon: MdAddLink,
      fields: [{ name: 'href', type: 'string' }],
    },
  ],

  lists: [
    {
      title: 'Bulleted List',
      name: 'bullet',
      icon: MdOutlineFormatListBulleted,
    },
    {
      title: 'Numbered List',
      name: 'number',
      icon: MdOutlineFormatListNumbered,
    },
  ],

  blockObjects: [
    {
      title: 'Image',
      name: 'image',
      icon: MdOutlineImage,
      fields: [
        { name: 'src', type: 'string' },
        { name: 'alt', type: 'string' },
      ],
    },
    {
      title: 'Code',
      name: 'code',
      icon: MdCode,
      fields: [
        { name: 'language', type: 'string' },
        { name: 'src', type: 'string' },
      ],
    },
  ],
  inlineObjects: [],
});
