import styled, { css, ThemeProps } from 'styled-components'
import { Theme } from 'styles/styled'
// import Tooltip from 'components/Tooltip'

interface ContainerProps extends ThemeProps<Theme> {
  isFocused:boolean
  isFilled:boolean
  isErrored: boolean
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
  border-radius:.5rem;
  margin-top: .5rem;
  padding:1rem;
  width:100%;
  display:flex;
  flex: column;
  justify-content: center;
  align-items: center;

  /* border: 2px solid ${({theme})=>theme.colors.main}; */
  color: ${({theme})=>theme.colors.main};

  ${props=>props.isErrored && css`
    border-color:#c53030;
  `}
  ${props=>props.isFocused && css`
    color:${({theme})=>theme.colors.gray_400};
    border-color:${({theme})=>theme.colors.gray_400};
  `}
  ${props=>props.isFilled && css`
    color:${({theme})=>theme.colors.gray_400};
  `}
  /* background: url('/assets/images/select_bg.svg');
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat; */

  padding: 16px 48px;
  margin: 10px;

  input[type="checkbox"]{
    /* display: none; */
    flex:1;
    background:transparent;
    border:none;
    color:${({theme})=>theme.colors.gray_200};
  }
  label{
    position: relative;
    padding: 0 10px;
    width: 100%;

    font: 400 1.25rem/1.5rem Roboto, sans-serif;
    text-transform: uppercase;
    /* &::before {
      content: "";
      background: url("/assets/images/check.svg");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 32px;
      height: 32px;
      position: absolute;
      left: -43px;
      top: -12px;

      transform: scale(0) rotateZ(180deg);
      transition: all 0.4s cubic-bezier(0.54, 0.01, 0, 1.49);
    }
    &::after {
      content: "";
      border: 2px solid #27ae60;
      width: 24px;
      height: 24px;
      position: absolute;
      left: -42px;
      top: -6px;
      border-radius: 25%;
    } */
  }
  /* input[type="checkbox"]:checked + label::before {
    transform: scale(1) rotateZ(0deg);
  } */
  svg{
    margin-right:1rem;
  }
`
// export const Error = styled(Tooltip)`
//   height:1.25rem;
//   margin-left:1rem;
//   svg{
//     margin:0;
//   }
//   span{
//     background:#c53030;
//     color: #fff;

//     &::before{
//       border-color:#c53030 transparent;
//     }
//   }
//   `
//   export const PassIcon = styled.div`
//     height:1.25rem;
//     margin-left:1rem;
//     svg{
//       margin:0;
//       color:${({theme})=> theme.colors.main};
//       cursor: pointer;

//     }
//  `
