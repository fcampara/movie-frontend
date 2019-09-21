import * as format from '../utils/format'

export default async ({ Vue }) => {
  Vue.mixin({
    methods: {
      _formatDate: format.formatDate
    }
  })
}
