type ConditionalStyles = (theme: any) => React.CSSProperties;

type CSSProperties = {
  [key: string]:
    | React.CSSProperties
    | { [key: string]: React.CSSProperties }
    | ConditionalStyles;
};

export class StyleSheet {
  static create<Styles extends CSSProperties>(styles: Styles): Styles {
    return styles;
  }
}
