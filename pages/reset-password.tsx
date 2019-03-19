import { ResetPasswordForm } from '../components/templates'

function ResetPasswordPage({ token }) {
  return <ResetPasswordForm token={token} />
}

ResetPasswordPage.getInitialProps = ({ query }) => {
  return { token: query.token }
}

export default ResetPasswordPage
