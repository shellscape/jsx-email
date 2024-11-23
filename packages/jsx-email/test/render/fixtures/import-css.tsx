import React from 'react';

import css from './import-css.css';

export const Template: React.FC = () => (
  <>
    <style>{css as string}</style>
  </>
);
