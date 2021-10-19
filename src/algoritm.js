
export const LodkaValterraFunc = (x, y, options) => {
  const { alpha, beta, gamma, delta } = options;
  const dxDt = (alpha - beta * y) * x;
  const dyDt = (-gamma + delta * x) * y;
  return [dxDt, dyDt]
}