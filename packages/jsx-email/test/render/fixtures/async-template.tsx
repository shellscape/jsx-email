import { Suspense } from 'react';

import { useData } from '../../../src/render/jsx-to-string';

interface TemplateProps {
  firstName: string;
}

const Async = (props: any) => {
  const res = useData(
    props,
    () =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('donezo');
        }, 2000);
      })
  );

  return <div>{res}</div>;
};

export const Template: React.FC<Readonly<TemplateProps>> = ({ firstName }) => (
  <>
    <Suspense fallback={<div>waiting</div>}>
      <Async />
    </Suspense>

    <h1>Welcome, {firstName}!</h1>
    <img src="img/test.png" alt="test" />
    <p>Thanks for trying our product. We're thrilled to have you on board!</p>
  </>
);
