import classNames from 'classnames';
import * as React from 'react';

import { Views } from '../types';

import { Code, type PreviewLanguage } from './code';
import { IconButton, IconCheck, IconClipboard, IconDownload } from './icons';

interface RawProps {
  content: string;
  language: PreviewLanguage;
}

interface CodeContainerProps {
  activeView: Views;
  raws: RawProps[];
  setActiveView: (lang: string) => void;
}

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new Error(`jsx-email Preview: Unable to copy text: ${error}`);
  }
};

export const CodeContainer: React.FC<Readonly<CodeContainerProps>> = ({ activeView, raws }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleClipboard = async () => {
    const activeContent = raws.filter(({ language }) => activeView === language);
    setIsCopied(true);
    await copyText(activeContent[0].content);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const value = raws.find((raw) => raw.language === activeView);
  const file = new File([value!.content], `email.${value!.language}`);
  const downloadUrl = URL.createObjectURL(file);
  const copy =
    'rounded focus:text-dark-bg-text ease-in-out transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-8 hover:text-dark-bg-text absolute top-[20px] right-[20px] hidden md:block';
  const download =
    'text-gray-11 absolute top-[20px] right-[50px] hidden md:block transition ease-in-out duration-200 hover:text-dark-bg-text';

  React.useEffect(() => {
    setIsCopied(false);
  }, [activeView]);

  return (
    <>
      <IconButton className={copy} onClick={handleClipboard} title="Copy to Clipboard">
        {isCopied ? <IconCheck /> : <IconClipboard />}
      </IconButton>

      <a className={download} download={file.name} href={downloadUrl} title="Download">
        <IconDownload />
      </a>

      {raws.map(({ language, content }) => (
        <div
          className={classNames({
            hidden: activeView !== language,
            'text-base text-[#ccc] p-4 pr-20 whitespace-pre': activeView === Views.Plain,
            'text-xs': activeView !== 'plain'
          })}
          key={language}
        >
          <Code language={language}>{content.trim()}</Code>
        </div>
      ))}
    </>
  );
};
