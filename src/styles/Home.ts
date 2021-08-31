import styled from 'styled-components'

export const Container = styled.div `
  position: relative;
  min-height: 100vh;
  height: 100%;
  padding: 0 0.5rem;

  background-image: linear-gradient(135deg, rgba(112, 41, 225, 0.6), rgba(247, 141, 30, 0.6)),url('/assets/images/main_bg.jpg');
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat;

  header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0 auto;
    padding: 20px 0;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({theme}) => theme.colors.main};
    .nav{
      display: flex;
      align-items: center;
      width: 100%;
      padding:0 30px;
      justify-content: space-between;
      .logo{
        font: ${({theme}) => theme.texts.sub_title};
      }
      .login{
        font: 700 1.5rem/3rem Roboto, sans-serif;
        text-transform: uppercase;
      }
    }
  }
  section{
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 1300px;
    max-width: 400px;
    margin: 0 auto;

    .list-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      h1{
        align-self: center;
        font: ${({theme}) => theme.texts.title};
      }
      .list{
        display: inline-block;
        width: 100%;
        min-width: 390px;

        padding-top: 24px;
      }
    }

  }
`
