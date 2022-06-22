import styled from "styled-components";
import Props from './index.interface';

export default styled.div<Props>`
  display: flex;
  flex-direction: ${({ column, reverse }) =>
    column
      ? reverse
        ? "column-reverse"
        : "column"
      : reverse
        ? "row-reverse"
        : "row"
      };
  flex: ${({ flex }) => flex};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  flex-wrap:${({ wrap }) => wrap};
  justify-content:${({ justify }) => justify || undefined};
  align-items: ${({ alignItmes }) => alignItmes || undefined};
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  padding: ${({ padding }) => padding};
  padding-top: ${({paddingTop}) => paddingTop};
  padding-bottom: ${({paddingBottom}) => paddingBottom};
  padding-left: ${({paddingLeft}) => paddingLeft};
  max-width: ${({maxWidth}) => maxWidth};
  min-width: ${({minWidth}) => minWidth};
  padding-right: ${({paddingRight}) => paddingRight};
  background-color: ${({ background }) =>
    background || "transparent"};
  align-self: ${({alignSlef}) => alignSlef};
  color: ${ ({color})=> color};
  float: ${ ({float})=> float};
  width: ${({width}) => width};
  border-radius: ${({radius})=> radius ||'none'};
  border: ${({border})=> border};
  margin: ${({margin})=> margin};
  text-align: ${({textAlign})=> textAlign};
  border-bottom: ${({borderBottom}) => borderBottom};
  border-right: ${({borderRight}) => borderRight};
  border-left: ${({borderLeft}) => borderLeft};
  border-top: ${({borderTop}) => borderTop};
  overflow: ${({overflow}) => overflow};
  box-shadow: ${({useShadow}) => useShadow && '2px 4px 11px 0px #ececec'};
`;

