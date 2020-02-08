import schema from './schema'

function last( array ) {
  if ( array.length < 1 ) {
    return null;
  }
  return array[ array.length - 1 ]
}

export default {
  listGetters: {
    // Returns last item in list
    last( $instance ) {
      return last( $instance.asArraySorted().items );
    },

    // Calculates next sortidx
    next_sortidx( $instance, $model, $models ) {

      let list = $instance.itemsAsArray();
      let max_sort_idx = 0;

      for ( let idx in list ) {
        max_sort_idx = Math.max( list[ idx ].sortidx, max_sort_idx );
      }

      return max_sort_idx + 100
    }
  },
  schema: schema,
};
