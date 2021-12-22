import { JOE, PNG, WAVAX } from "config"


export const orderBasePair = (pairs: string[]) => {
  if (pairs.includes(WAVAX)) {
    if (pairs.indexOf(WAVAX) !== 0) {
      [pairs[0], pairs[1]] = [pairs[1], pairs[0]]
    }
  } else if (pairs.includes(PNG)) {
    if (pairs.indexOf(PNG) !== 0) {
      [pairs[0], pairs[1]] = [pairs[1], pairs[0]]
    }
  } else if (pairs.includes(JOE)) {
    if (pairs.indexOf(JOE) !== 0) {
      [pairs[0], pairs[1]] = [pairs[1], pairs[0]]
    }
  }
  return pairs
}

export default orderBasePair
