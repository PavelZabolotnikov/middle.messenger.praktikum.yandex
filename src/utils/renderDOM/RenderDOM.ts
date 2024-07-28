import Block from '../block/Block';

export const renderDOM = (query: string, block: Block) => {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent() as HTMLElement);
  }
  block.dispatchComponentDidMount();
  return root;
};
