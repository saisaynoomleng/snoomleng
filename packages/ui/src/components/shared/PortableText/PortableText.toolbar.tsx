'use client';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
} from '#components/ui/alert-dialog';
import { Button } from '#components/ui/button';
import { Input } from '#components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select';
import { Separator } from '#components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#components/ui/tooltip';
import {
  useDecoratorButton,
  useStyleSelector,
  useAnnotationButton,
  useBlockObjectButton,
  useToolbarSchema,
  type ToolbarDecoratorSchemaType,
  type ToolbarStyleSchemaType,
  type ToolbarSchema,
  type ToolbarAnnotationSchemaType,
  useHistoryButtons,
  ToolbarBlockObjectSchemaType,
} from '@portabletext/toolbar';
import clsx from 'clsx';
import { useState } from 'react';
import { IoMdRedo, IoMdUndo } from 'react-icons/io';

export const PortableTextToolbar = () => {
  const toolbarSchema: ToolbarSchema = useToolbarSchema({});

  return (
    <div className="p-2 border-2 border-b-0 flex items-center flex-wrap gap-x-2">
      <HistoryButtons />

      {toolbarSchema.styles && (
        <StyleSelector schemaTypes={toolbarSchema.styles} />
      )}

      <Separator orientation="vertical" />

      {toolbarSchema.decorators?.map((decorator) => (
        <DecoratorButton key={decorator.name} schemaType={decorator} />
      ))}

      <Separator orientation="vertical" />

      {toolbarSchema.annotations?.map((a) => (
        <AnnotationButton key={a.name} schemaType={a} />
      ))}

      {toolbarSchema.blockObjects.map((b) => (
        <BlockObjectButtons key={b.name} schemaType={b} />
      ))}
    </div>
  );
};

const DecoratorButton = ({
  schemaType,
}: {
  schemaType: ToolbarDecoratorSchemaType;
}) => {
  const decoratorButton = useDecoratorButton({ schemaType });
  const Icon = schemaType.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="toolbar"
          onClick={() => decoratorButton.send({ type: 'toggle' })}
          className={clsx(
            decoratorButton.snapshot.matches({ enabled: 'active' })
              ? 'border-primary text-primary'
              : '',
          )}
        >
          {Icon ? <Icon /> : null}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{schemaType.title}</TooltipContent>
    </Tooltip>
  );
};

const StyleSelector = ({
  schemaTypes,
}: {
  schemaTypes: ReadonlyArray<ToolbarStyleSchemaType>;
}) => {
  const styleSelector = useStyleSelector({ schemaTypes });
  const activeStyle = styleSelector.snapshot.context.activeStyle ?? 'normal';

  const onSelectChange = (value: string) => {
    styleSelector.send({ type: 'toggle', style: value });
  };

  return (
    <Select value={activeStyle} onValueChange={onSelectChange}>
      <SelectTrigger>
        <SelectValue placeholder="styles" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {schemaTypes.map((schemaType) => (
            <SelectItem key={schemaType.name} value={schemaType.name}>
              {schemaType.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const HistoryButtons = () => {
  const historyButtons = useHistoryButtons();

  return (
    <div className="flex gap-x-1 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="toolbar"
            onClick={() => historyButtons.send({ type: 'history.undo' })}
            disabled={historyButtons.snapshot.matches('disabled')}
          >
            <IoMdUndo />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Undo</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="toolbar"
            onClick={() => historyButtons.send({ type: 'history.redo' })}
            disabled={historyButtons.snapshot.matches('disabled')}
          >
            <IoMdRedo />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Redo</TooltipContent>
      </Tooltip>
    </div>
  );
};
export const AnnotationButton = ({
  schemaType,
}: {
  schemaType: ToolbarAnnotationSchemaType;
}) => {
  const linkButton = useAnnotationButton({ schemaType });
  const Icon = schemaType.icon;

  const [href, setHref] = useState('');

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="toolbar">
          {Icon && <Icon />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a link</AlertDialogTitle>
        </AlertDialogHeader>

        <Input
          value={href}
          onChange={(e) => setHref(e.target.value)}
          placeholder="https://example.com"
        />

        <AlertDialogFooter>
          <AlertDialogCancel variant="toolbar">Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="toolbar"
            onClick={() =>
              linkButton.send({
                type: 'add',
                annotation: {
                  value: {
                    href,
                  },
                },
              })
            }
          >
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const BlockObjectButtons = ({
  schemaType,
}: {
  schemaType: ToolbarBlockObjectSchemaType;
}) => {
  const button = useBlockObjectButton({ schemaType });
  const Icon = schemaType.icon;

  const [text, setText] = useState('');

  return (
    <Button
      onClick={() =>
        button.send({ type: 'insert', value: { text }, placement: 'auto' })
      }
    >
      {Icon && <Icon />}
    </Button>
  );
};
