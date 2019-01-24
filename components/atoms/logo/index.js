const Logo = () => {
  return (
    <picture>
      <source srcSet="/static/images/logo.png" media="(min-width: 700px)" />
      <img src="/static/icons/icon-180x180.png" height={40} alt="Logo" />
    </picture>
  )
}

export default Logo
