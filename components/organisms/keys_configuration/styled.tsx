import styled from '../../styled'

export const KeysWrapper = styled.div`
  margin-top: ${p => p.theme.spacing.small};
  margin-bottom: ${p => p.theme.spacing.small};
`

export const PublishableKeyWrapper = styled.div`
  margin-top: ${p => p.theme.spacing.small};
  margin-bottom: ${p => p.theme.spacing.small};
  display: flex;
  align-items: center;
  > span {
    margin-left: ${p => p.theme.spacing.medium};
    margin-right: ${p => p.theme.spacing.medium};
    display: block;
    min-width: 265px;
  }
  > svg:not(:first-child) {
    cursor: pointer;
  }
  > svg:last-child {
    margin-left: ${p => p.theme.spacing.medium};
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
  .name > svg,
  .key > svg {
    cursor: pointer;
    margin-left: ${p => p.theme.spacing.medium};
  }
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .instruction {
    display: block;
    margin-left: ${p => p.theme.spacing.medium};
  }
`
