const heading_id_pattern = /\s*\{#([\w-]+)\}\s*$/u;

const applyHeadingId = (node) => {
  if (!node || typeof node !== 'object') {
    return;
  }

  if (node.type === 'heading' && Array.isArray(node.children)) {
    const last_child = node.children.at(-1);

    if (last_child?.type === 'text') {
      const match = last_child.value.match(heading_id_pattern);

      if (match) {
        last_child.value = last_child.value.slice(0, match.index).replace(/\s+$/u, '');

        if (last_child.value.length === 0) {
          node.children.pop();
        }

        if (!node.data) {
          node.data = {};
        }

        if (!node.data.hProperties) {
          node.data.hProperties = {};
        }

        node.data.hProperties.id = match[1];
      }
    }
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      applyHeadingId(child);
    }
  }
};

const remarkHeadingId = () => {
  return (tree) => {
    applyHeadingId(tree);
  };
};

export default remarkHeadingId;
