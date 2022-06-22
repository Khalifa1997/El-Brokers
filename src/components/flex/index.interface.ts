
type justify = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' ;
type alignSlef = 'flex-start' | 'flex-end' | 'center';

export default interface props {
    column?: Boolean;
    reverse?: Boolean;
    height?: string;
    padding?: string;
    justify?: justify;
    paddingLeft?: string;
    textAlign?: string;
    paddingRight?: string;
    float?: string;
    overflow?: string;
    wrap?: string;
    paddingTop?: string;
    position?: string;
    top?: string;
    paddingBottom?: string;
    left?: string;
    right?: string;
    bottom?: string;
    background?: string;
    minHeight?: string;
    alignSlef?:alignSlef;
    width?:string;
    flex?: string;
    radius?: string;
    border? : string;
    borderBottom?: string;
    borderRight?: string;
    borderTop?: string;
    borderLeft?: string;
    useShadow?: Boolean; 
    alignItmes?:string;
    maxWidth?: string;
    minWidth?: string;
    margin?: string; 
}