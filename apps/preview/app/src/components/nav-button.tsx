import * as ToggleGroup from '@radix-ui/react-toggle-group';
import classnames from 'classnames';
import { motion } from 'framer-motion';

import type { Views } from '../types';

const button = 'text-sm font-medium px-3 py-2 transition ease-in-out duration-200 relative';
const motionSpan = 'absolute left-0 right-0 top-0 bottom-0 bg-cta-bg';
const span = 'capitalize relative';

interface NavButtonProps extends React.ComponentPropsWithoutRef<'header'> {
  activeView?: Views;
  addClassNames?: string;
  label: string;
}

export const NavButton = ({ activeView, addClassNames, label }: NavButtonProps) => (
  <ToggleGroup.Item value={label}>
    <motion.div className={classnames(button, addClassNames)}>
      {activeView === label && (
        <motion.span
          layoutId="topbar"
          className={motionSpan}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <span className={classnames(span, { 'text-cta-text': activeView === label })}>{label}</span>
    </motion.div>
  </ToggleGroup.Item>
);

NavButton.displayName = 'NavButton';
