import { Document } from '@contentful/rich-text-types';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const renderRichText = (richText: Document) =>
  documentToReactComponents(richText, {
    renderMark: {
      [MARKS.BOLD]: text => <strong className="font-semibold">{text}</strong>,
      [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (_, children) => (
        <h1 className="text-3xl font-bold text-gray-900 my-6 leading-snug tracking-tight">
          {children}
        </h1>
      ),
      [BLOCKS.HEADING_2]: (_, children) => (
        <h2 className="text-2xl font-semibold text-gray-800 my-5 leading-snug tracking-tight">
          {children}
        </h2>
      ),
      [BLOCKS.HEADING_3]: (_, children) => (
        <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-2 leading-snug tracking-tight">
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (_, children) => (
        <h4 className="text-lg font-semibold text-gray-700 mt-6 mb-1 leading-snug tracking-tight">
          {children}
        </h4>
      ),
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <p className="text-gray-700 mb-4">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (_, children) => (
        <ul className="list-disc ml-6 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_, children) => (
        <ol className="list-decimal ml-6 mb-4">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          className="text-green-600 underline hover:text-green-800 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),

      // ✅ Handle embedded image assets
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const assetFields = node?.data?.target?.fields;

        if (!assetFields || !assetFields.file || !assetFields.file.url) return null;

        const imageUrl = assetFields.file.url.startsWith('//')
          ? `https:${assetFields.file.url}`
          : assetFields.file.url;

        const alt = assetFields.description || assetFields.title || 'Contentful image';

        return (
          <img
            src={imageUrl}
            alt={alt}
            className="rounded-xl my-6 w-full max-w-3xl mx-auto"
            loading="lazy"
          />
        );
      },
    },
  });
