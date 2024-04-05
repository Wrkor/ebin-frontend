export const AdvMark = (reviews) => (reviews.reduce((acc, review) => acc + review.mark, 0) / reviews?.length).toFixed(1)

export default AdvMark;