type ColorKey =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
type Color = Record<ColorKey, string>;

type Theme = {
  primary: Color;
};

export default Theme;
