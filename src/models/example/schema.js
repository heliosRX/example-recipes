import { moment } from 'heliosrx'

export default {

  // Syntax: create( required, optional, BACKEND )
  create({ name }, data, BACKEND) {
    return {
      createdAt:     moment.currentTimeServer(BACKEND),
      name:          name,
      // a:             'X',
      // b:             false,
      someNumber:    data.someNumber || null,
      /*
      pos: {
        x: 10,
        y: 10
      }
      */
    };
  },

  create_required: [ 'name' ],

  fields: [
    {
      model: 'createdAt',
      type: 'ServerTimestamp',
    },
    {
      model: 'name',
      validate: () => true,
      type: 'String',
      required: true,
      abbrv: 'n'
    },
    {
      model: 'a',
      type: 'String',
      validate: v => v.length < 30
    },
    {
      model: 'b',
      type: 'Boolean',
      validate: () => true
    },
    {
      model: 'someNumber',
      type: 'Number',
      validate: () => true
    },
    {
      model: 'created',
      type: 'InitialTimestamp',
      validate: () => true
    },
    {
      model: 'modified',
      type: 'CurrentTimestamp',
      validate: () => true
    }
  ],

  // unsafe_disable_validation: true, // entfällt später
};
