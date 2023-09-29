export const groupStatusData = (data) => {
  return data.reduce((groups, item) => {
    const parentName = item.parent_name;
    const name = item.name;

    if (!groups[parentName]) {
      groups[parentName] = {};
    }

    if (!groups[parentName][name]) {
      groups[parentName][name] = [];
    }

    groups[parentName][name].push(item);

    return groups;
  }, {});
};
