import styled, { css, ThemeProps } from 'styled-components'
import { Theme } from 'styles/styled'

interface ContainerProps extends ThemeProps<Theme> {
  isFocused:boolean
  isFilled:boolean
}

export const Container = styled.div`
  & + div {
    margin-top:0.25rem;
  }
  > label {
    padding-left:0.25rem;
  }
`

export const InputContainer = styled.div<ContainerProps>`
  background: url('/assets/images/select_bg.svg');
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat;

  color: ${({theme})=>theme.colors.main};
  padding:1rem;
  width:100%;
  display:flex;
  justify-content: center;
  align-items: center;

  padding: 16px 58px;
  position: relative;

  ${props=>props.isFocused && css`
    color:${({theme})=>theme.colors.gray_400};
    border-color:${({theme})=>theme.colors.gray_400};
  `}
  ${props=>props.isFilled && css`
    color:${({theme})=>theme.colors.gray_400};
  `}

  input[type="checkbox"]{
    display: none;
  }
  label{
    width: 100%;
    position: relative;
    padding: 0 10px;
    width: 100%;

    font: 400 1.25rem/1.5rem Roboto, sans-serif;
    text-transform: uppercase;
    &::before {
      content: '';
      /* content: url("/assets/images/check.svg"), ${({theme}) => theme.colors.gray_300}; */
      background: url("/assets/images/check.svg");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 32px;
      height: 32px;
      position: absolute;
      left: -30px;
      top: -9px;


      transform: scale(0) rotateZ(180deg);
      transition: all 0.4s cubic-bezier(0.54, 0.01, 0, 1.49);
    }
    &::after {
      content: "";
      border: 2px solid ${({theme}) => theme.colors.gray_100};
      width: 24px;
      height: 24px;
      position: absolute;
      left: -29px;
      top: -3px;
      border-radius: 25%;
    }
  }
  input[type="checkbox"]:checked + label::before {
    transform: scale(1) rotateZ(0deg);
  }
  input[type="checkbox"]:disabled{
    opacity: 0.7;
    + label {
      color: ${({theme}) => theme.colors.gray_200};
      opacity: 0.7;
      border: none !important;
    }
  }
  .disabled::before{
    position: absolute;
    top: 25px;
    left: 0;
    width: 100%;
    min-width: 100%;
    content: '';
    border-bottom: 2px solid ${({theme}) => theme.colors.gray_200};
  }
  svg{
    margin-right:1rem;
  }
`
