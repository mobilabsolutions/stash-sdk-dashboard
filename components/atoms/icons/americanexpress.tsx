import React from 'react'

export default function Amex({ width = 60, height = 40, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 60 40"
    >
      <defs>
        <path id="aexpress" d="M0 0h60v40H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            fill="#306FC5"
            d="M60 36.529c0 1.889-1.588 3.42-3.547 3.42H3.547c-1.96 0-3.547-1.531-3.547-3.42V3.47C0 1.582 1.588.05 3.547.05h52.906C58.413.051 60 1.582 60 3.471v33.058z"
          />
          <g fill="#FFF">
            <path d="M8.741 16.017h1.793l-.896-2.2zM18.275 23.402v1.022h3.015v1.1h-3.015v1.179h3.34l1.549-1.65-1.467-1.651zM41.824 13.817l-.978 2.2h1.874zM26.994 27.33v-4.478l-2.119 2.2zM30.987 24.11c-.082-.472-.408-.708-.897-.708h-1.711v1.414h1.793c.489 0 .815-.235.815-.707zM36.69 24.66c.163-.08.245-.315.245-.55.082-.315-.082-.472-.245-.55-.162-.08-.407-.08-.651-.08h-1.63v1.258h1.63c.244 0 .489 0 .651-.079z" />
            <path d="M48.424 11.774v.943l-.489-.943h-3.83v.943l-.488-.943h-5.215c-.897 0-1.63.157-2.282.471v-.471h-3.667V12.245c-.407-.314-.896-.471-1.548-.471H17.786l-.897 1.964-.896-1.964H11.838v.943l-.408-.943H7.845l-1.63 3.692-1.874 4.007-.035.08H8.55l.03-.08.488-1.178h1.06l.489 1.257h4.725v-.943l.408.943h2.363l.407-.943v.944H29.846v-2.044h.163c.163 0 .163 0 .163.236v1.729h5.867v-.472c.489.236 1.222.472 2.2.472h2.444l.49-1.257h1.14l.489 1.257h4.726v-1.179l.733 1.179h3.83v-7.7h-3.667zm-27.623 6.6H19.497v-4.321l-.081.18v-.002l-1.896 4.143h-1.201l-1.956-4.322v4.322h-2.77l-.57-1.179H8.252l-.57 1.179H6.249l2.41-5.5h2.038l2.281 5.264v-5.264h2.159l.038.079h.003l1.028 2.157.739 1.617.026-.082 1.63-3.771h2.2v5.5zm5.623-4.322h-3.178v1.022h3.096v1.1h-3.096v1.1h3.178v1.178H21.86v-5.578h4.564v1.178zm5.811 2.026l.008.005c.03.032.057.063.08.093.156.198.282.491.288.921l.001.023.001.012v.007c.002.043.003.087.003.135v1.1h-1.222v-.629c0-.314 0-.786-.245-1.1a.744.744 0 0 0-.24-.158c-.122-.076-.353-.077-.737-.077h-1.467v1.964H27.32v-5.5h3.096c.733 0 1.222 0 1.63.236.4.23.64.614.65 1.221a1.563 1.563 0 0 1-.976 1.45s.272.053.515.297zm2.744 2.296h-1.385v-5.5h1.385v5.5zm15.89 0h-1.793l-2.607-4.165v3.458l-.009-.009v.72h-1.376v-.004h-1.386l-.489-1.179h-2.852l-.489 1.257H38.32c-.651 0-1.467-.157-1.956-.628-.488-.471-.733-1.1-.733-2.121 0-.786.163-1.572.733-2.2.408-.472 1.141-.629 2.037-.629h1.304v1.178h-1.304c-.488 0-.732.079-1.06.315-.243.235-.406.707-.406 1.257 0 .628.081 1.021.407 1.335.245.236.57.315.978.315h.57l1.874-4.321h2.038l2.281 5.264v-5.264h2.037l2.363 3.85v-3.85h1.386v5.421z" />
            <path d="M31.074 15.165a.824.824 0 0 0 .176-.677.424.424 0 0 0-.012-.072l-.003-.018h-.001a.447.447 0 0 0-.247-.267c-.164-.079-.408-.079-.653-.079h-1.63v1.258h1.63c.245 0 .49 0 .653-.079a.308.308 0 0 0 .067-.047v.001l.02-.02zM55.676 26.231c0-.55-.162-1.1-.407-1.493v-3.535h-.003v-.236h-3.924c-.508 0-1.125.47-1.125.47v-.47h-3.748c-.57 0-1.304.157-1.63.47v-.47h-6.682v.471c-.488-.393-1.385-.472-1.792-.472h-4.4v.472c-.408-.393-1.386-.472-1.875-.472H25.2l-1.14 1.179L23 20.966H15.667v7.937h7.171l1.178-1.137 1.022 1.136H29.6v-1.807h.408c.57 0 1.303 0 1.874-.236v2.122h3.667v-2.043h.162c.245 0 .245 0 .245.236v1.807h11.082c.734 0 1.466-.158 1.874-.472v.472h3.504c.733 0 1.467-.079 1.956-.393.75-.434 1.223-1.202 1.293-2.119l.01-.081-.005-.005c.003-.05.005-.1.005-.152zM30.01 25.76h-1.63v2.042H25.7l-1.56-1.728-.005.005-.076-.084-1.793 1.807h-5.214v-5.5h5.296l1.447 1.529.304.32.042-.042 1.711-1.806h4.319c.838 0 1.776.199 2.132 1.021.043.163.068.344.068.55 0 1.571-1.141 1.886-2.363 1.886zm8.148-.08c.163.236.245.55.245 1.022v1.1h-1.385v-.707c0-.315 0-.864-.245-1.1-.163-.235-.49-.235-.978-.235h-1.466v2.042h-1.385v-5.578h3.096c.651 0 1.222 0 1.63.235.407.236.733.63.733 1.258 0 .864-.57 1.335-.978 1.493.408.156.652.314.733.47zm5.623-2.278h-3.178v1.021h3.096v1.1h-3.096v1.1h3.178v1.18h-4.563v-5.58h4.563v1.179zm3.422 4.4h-2.608v-1.178h2.608c.244 0 .407 0 .57-.157a.589.589 0 0 0 .163-.393.588.588 0 0 0-.162-.393c-.082-.079-.245-.157-.49-.157-1.303-.079-2.852 0-2.852-1.729 0-.785.49-1.65 1.956-1.65h2.689v1.336H46.55c-.244 0-.407 0-.57.078-.163.08-.163.236-.163.393 0 .236.162.315.325.393.164.079.327.079.49.079h.733c.733 0 1.222.157 1.548.471.245.236.408.629.408 1.179 0 1.178-.734 1.728-2.119 1.728zm7.008-.55c-.326.315-.896.55-1.712.55h-2.607v-1.178h2.607c.245 0 .408 0 .57-.157a.59.59 0 0 0 .164-.393.59.59 0 0 0-.163-.393c-.082-.079-.244-.157-.489-.157-1.303-.079-2.852 0-2.852-1.728 0-.747.443-1.422 1.536-1.622.13-.018.269-.029.42-.029h2.689v1.336h-2.526c-.245 0-.408 0-.57.078a.588.588 0 0 0-.164.393c0 .236.082.315.326.393.163.079.326.079.49.079h.732c.357 0 .626.042.872.125.226.08.973.402 1.14 1.243.015.088.026.18.026.282 0 .471-.163.864-.49 1.178z" />
          </g>
        </g>
      </g>
    </svg>
  )
}