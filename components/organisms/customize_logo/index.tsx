import React from 'react'
import { PageTitleSection } from '../page_form'
import { useLocalization, useLogo } from '../../../hooks'
import { InputFile } from '../../atoms'
import styled from '../../styled'

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 ${props => props.theme.shade.A50};
  padding: 16px;
`

const Form = styled.form``

export default function CustomizeLogo() {
  const { getText } = useLocalization()
  const { uploadLogo } = useLogo()

  return (
    <PageTitleSection title={getText('Logo')}>
      <ContentWrapper>
        <Form encType="multipart/form-data">
          <InputFile
            label={getText('Upload a new file')}
            onChange={e => {
              const files = e.target.files
              const formData = new FormData()
              formData.append('file', files[0])
              uploadLogo(formData)
              e.preventDefault()
            }}
          />
        </Form>
      </ContentWrapper>
    </PageTitleSection>
  )
}
