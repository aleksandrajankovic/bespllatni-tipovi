const filterTips = (tips, filter) => {
  if (filter === "All") {
    return [...tips];
  } else if (filter === "Active") {
    return tips.filter((tip) => new Date() < new Date(tip.tipDate));
  } else if (filter === "Expired") {
    return tips.filter((tip) => new Date() >= new Date(tip.tipDate));
  }

  return [];
};

export default filterTips;
