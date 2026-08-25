import {
  defineAnnotation,
  defineBlockObject,
  defineDecorator,
  defineTextBlock,
} from '@portabletext/editor';

export const textBlock = defineTextBlock({
  type: 'block',
  render: ({ children, node, attributes }) => {
    if (node.style === 'h1') {
      return (
        <h1 className="text-fs-700" {...attributes}>
          {children}
        </h1>
      );
    }

    if (node.style === 'h2') {
      return (
        <h2 className="text-fs-600" {...attributes}>
          {children}
        </h2>
      );
    }

    if (node.style === 'h3') {
      return (
        <h3 className="text-fs-500" {...attributes}>
          {children}
        </h3>
      );
    }

    if (node.style === 'h4') {
      return (
        <h4 className="text-fs-500" {...attributes}>
          {children}
        </h4>
      );
    }

    if (node.style === 'h5') {
      return (
        <h5 className="text-fs-500" {...attributes}>
          {children}
        </h5>
      );
    }

    if (node.style === 'h6') {
      return (
        <h6 className="text-fs-500" {...attributes}>
          {children}
        </h6>
      );
    }

    if (node.style === 'blockquote') {
      return (
        <blockquote
          className="text-fs-400 italic border-l-2 border-border pl-2"
          {...attributes}
        >
          {children}
        </blockquote>
      );
    }

    return <p>{children}</p>;
  },
});

export const decorator = defineDecorator({
  type: '*',
  render: ({ children, decorator }) => {
    if (decorator === 'strong') {
      return <span className="font-semibold">{children}</span>;
    }

    if (decorator === 'em') {
      return <span className="italic">{children}</span>;
    }

    if (decorator === 'underline') {
      return (
        <span className="underline underline-offset-4 decoration-wavy decoration-primary">
          {children}
        </span>
      );
    }

    if (decorator === 'highlight') {
      return <span className="bg-primary">{children}</span>;
    }

    if (decorator === 'strikeThrough') {
      return <span className="line-through">{children}</span>;
    }

    return <span>{children}</span>;
  },
});

export const link = defineAnnotation({
  type: 'link',
  render: ({ annotation, children }) =>
    typeof annotation.href === 'string' ? (
      <a href={annotation.href} className="underline text-primary">
        {children}
      </a>
    ) : (
      <>{children}</>
    ),
});

export const codeBlock = defineBlockObject({
  type: 'code',
  render: (props) =>
    typeof props.node.text === 'string' ? (
      <div {...props.attributes}>
        <code>{props.node.text}</code>
      </div>
    ) : (
      props.renderDefault(props)
    ),
});

export const imageBlock = defineBlockObject({
  type: 'image',
  render: (props) =>
    typeof props.node.src === 'string' ? (
      <div {...props.attributes}>
        <img src={props.node.src} alt="" />
      </div>
    ) : (
      props.renderDefault(props)
    ),
});

export const nodes = [textBlock, decorator, link, codeBlock, imageBlock];
