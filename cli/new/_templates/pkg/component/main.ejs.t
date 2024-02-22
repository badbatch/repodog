---
to: "<%= typeof overrideTemplate_main_ejs_t !== 'undefined' ? null : `${path}/src/${h.changeCase.pascal(name)}.tsx` %>"
---
import classNames from 'classnames';

export type <%= h.changeCase.pascal(name) %>Props = {};

export const <%= h.changeCase.pascal(name) %> = (props: <%= h.changeCase.pascal(name) %>Props) => {
  const { className, ...otherProps } = props;
  return <div className={classNames('<selectors>', className)} />
};
