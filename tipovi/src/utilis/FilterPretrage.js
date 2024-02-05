const filterPretrage = (data, searchTerm) => {
  return data.filter(
    (elem) =>
      (elem.rival1 &&
        elem.rival1.toLowerCase().includes(searchTerm.trim().toLowerCase())) ||
      (elem.rival2 &&
        elem.rival2.toLowerCase().includes(searchTerm.trim().toLowerCase())) ||
      (elem.sport &&
        elem.sport.toLowerCase().includes(searchTerm.trim().toLowerCase())) ||
      (elem.league &&
        elem.league.toLowerCase().includes(searchTerm.trim().toLowerCase())) ||
      (elem.country &&
        elem.country.toLowerCase().includes(searchTerm.trim().toLowerCase()))
  );
};

export default filterPretrage;
