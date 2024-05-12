import globalConstants from '../config/globalConstants'

export const NormalizeStringToArrayImgs = imgs =>
	imgs?.length > 0 ? imgs.split('\n').map(img => globalConstants.api + '/' + img) : []

export default NormalizeStringToArrayImgs
