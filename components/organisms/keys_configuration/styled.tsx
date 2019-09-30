import styled from '../../styled'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${p => p.theme.spacing.xxlarge};
  margin-left: ${p => p.theme.spacing.xxxlarge};
  margin-right: ${p => p.theme.spacing.xxxlarge};
  margin-bottom: 0;
`

export const Header = styled.div`
  display: block;
  height: 38px;
  .title {
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.44;
    letter-spacing: normal;
    color: #12202a;
  }
`

export const KeysWrapper = styled.div`
  margin-top: ${p => p.theme.spacing.small};
  margin-bottom: ${p => p.theme.spacing.small};
  .circle {
    background-color: ${p => p.theme.primary.A100};
    border: 8px solid ${p => p.theme.primary.A100};
    border-radius: 50%;
  }
  .action-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    > svg {
      cursor: pointer;
    }
    > svg:last-child {
      margin-left: ${p => p.theme.spacing.medium};
    }
  }
`

export const PublishableKeyWrapper = styled.div`
  margin-top: ${p => p.theme.spacing.small};
  margin-bottom: ${p => p.theme.spacing.small};
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;

  > span {
    margin-left: ${p => p.theme.spacing.medium};
    margin-right: ${p => p.theme.spacing.medium};
    display: block;
    min-width: 265px;
  }
`

export const PopupWrapper = styled.div`
  padding: ${p => p.theme.spacing.small};
  > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  > .extra-padding {
    padding-top: ${p => p.theme.spacing.large};
  }
  > .buttons > button {
    margin-left: ${p => p.theme.spacing.small};
  }
  > h3 {
    display: block;
    max-width: 350px;
  }
`

export const SecretKeyWrapper = styled.div`
  margin-top: ${p => p.theme.spacing.small};
  margin-bottom: ${p => p.theme.spacing.small};
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  .name,
  .key {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name > span,
  .key > span {
    margin-left: ${p => p.theme.spacing.medium};
    margin-right: ${p => p.theme.spacing.medium};
    display: block;
    min-width: 265px;
  }
  .name svg,
  .key svg {
    cursor: pointer;
    margin-left: ${p => p.theme.spacing.medium};
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .instruction {
    display: block;
    margin-left: ${p => p.theme.spacing.medium};
    color: ${p => p.theme.shade.A200};
  }
`
