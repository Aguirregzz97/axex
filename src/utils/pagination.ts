/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
const getPaginationQuery = (search: string | undefined) => {
  if (search === undefined) {
    return {}
  }
  return {
    $text: { $search: search, $caseSensitive: false },
    $diacriticSensitive: true,
  }
}

const getPaginationSort = (search: string | undefined) => {
  if (search === undefined) {
    return {}
  }
  return
  {
    score: {
      $meta: "textScore"
    }
  }
}

export default { getPaginationQuery, getPaginationSort }
