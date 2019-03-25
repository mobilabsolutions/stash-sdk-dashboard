import styled from '../../styled'

export const KeysWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`

export const PublishableKeyWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 24px;
    margin-right: 24px;
    display: block;
    min-width: 265px;
  }
  > svg:not(:first-child) {
    cursor: pointer;
  }
  > svg:last-child {
    margin-left: 24px;
  }
`

export const PopupWrapper = styled.div`
  padding: 16px;
  > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  > .extra-padding {
    padding-top: 32px;
  }
  > .buttons > button {
    margin-left: 16px;
  }
  > h3 {
    display: block;
    max-width: 350px;
  }
`

export const SecretKeyWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
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
    margin-left: 24px;
    margin-right: 24px;
    display: block;
    min-width: 265px;
  }
  .name > svg,
  .key > svg {
    cursor: pointer;
    margin-left: 24px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .instruction {
    display: block;
    margin-left: 24px;
  }
`
