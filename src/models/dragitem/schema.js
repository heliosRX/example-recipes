export default {

  create({ title }, data) {
    return {
      title:    title,
      sortidx:  data.sortidx || -1,
      color:    data.color || null,
    };
  },

  fields: {
    title: { type: 'String' },
    color: { type: 'String' },
    sortidx: { type: 'Number' },
  }
};
