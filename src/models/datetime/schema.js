import { moment } from 'heliosrx'

export default {

  create( _req, _opt, BACKEND) {
    return {
      createdAt: moment.currentTimeServer(BACKEND),
    };
  },

  fields: {
    createdAt:     { type: 'ServerTimestamp' },
    futureEventAt: { type: 'FutureTimestamp' },
    time:          { type: 'Timestamp' },
  }
};
