export default function InvisibilityIcon({
  width = 24,
  height = 24,
  onClick = () => null,
  disable = false
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      onClick={disable ? null : onClick}
      className={disable ? 'disable' : 'enable'}
    >
      <path
        fill="#D6D9DB"
        fill-rule="evenodd"
        d="M7.48 17.956L4.12 21.314a1 1 0 1 1-1.414-1.415L5.7 16.907C4.054 15.75 2.488 14.115 1 12c3.283-4.667 6.95-7 11-7 1.34 0 2.636.255 3.892.765l4.058-4.058a1 1 0 1 1 1.414 1.414L17.756 6.73C19.6 7.896 21.349 9.653 23 12c-3.283 4.667-6.95 7-11 7-1.564 0-3.071-.348-4.52-1.044zM7 12c0 2.767 2.233 5 5 5s5-2.233 5-5-2.233-5-5-5-5 2.233-5 5zm5-3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"
      />
    </svg>
  )
}
