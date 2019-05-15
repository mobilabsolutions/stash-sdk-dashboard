import React from 'react'

export default function UnionPay({ width = 60, height = 40, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 60 40"
    >
      <g fill="none" fillRule="nonzero">
        <path
          fill="#E4363A"
          d="M7.064 4.109c.423-1.8 1.49-3.033 3.096-3.758.2-.09.45-.066.6-.28.409-.023.819-.067 1.228-.067C16.848 0 21.71.001 26.57 0c.656 0 1.29.087 1.867.452 1.117.707 1.613 2.087 1.283 3.59-1.368 6.236-2.738 12.47-4.107 18.706-.95 4.327-1.933 8.645-2.835 12.982-.494 2.375-2.726 4.305-5.054 4.27-4.777-.074-9.556-.021-14.334-.026-.422 0-.845-.04-1.267-.062-.082-.127-.223-.14-.342-.172C.82 39.473 0 38.055 0 37.154c0-.86.174-1.673.365-2.494 0 0 6.27-28.732 6.699-30.551z"
        />
        <path
          fill="#004A87"
          d="M21.064 4.109c.423-1.8 1.49-3.033 3.096-3.758.2-.09.45-.066.6-.28.409-.023.819-.067 1.228-.067C30.848 0 35.71.001 40.57 0c.656 0 1.29.087 1.867.452 1.117.707 1.613 2.087 1.283 3.59-1.368 6.236-2.738 12.47-4.107 18.706-.95 4.327-1.933 8.645-2.835 12.982-.494 2.375-2.726 4.305-5.054 4.27-4.777-.074-9.556-.021-14.334-.026-.422 0-.845-.04-1.267-.062-.082-.127-.223-.14-.342-.172-.96-.267-1.78-1.685-1.781-2.586 0-.86.174-1.673.365-2.494 0 0 6.27-28.732 6.699-30.551z"
        />
        <path
          fill="#008286"
          d="M37.064 4.109c.423-1.8 1.49-3.033 3.096-3.758.2-.09.45-.066.6-.28.409-.023.819-.067 1.228-.067C46.848 0 51.71.001 56.57 0c.656 0 1.29.087 1.867.452 1.117.707 1.613 2.087 1.283 3.59-1.368 6.236-2.738 12.47-4.107 18.706-.95 4.327-1.933 8.645-2.835 12.982-.494 2.375-2.726 4.305-5.054 4.27-4.777-.074-9.556-.021-14.334-.026-.422 0-.845-.04-1.267-.062-.082-.127-.223-.14-.342-.172-.96-.267-1.78-1.685-1.781-2.586 0-.86.174-1.673.365-2.494 0 0 6.27-28.732 6.699-30.551z"
        />
        <g fill="#FFF">
          <path d="M38.478 18.103c-.386 0-.773.007-1.159-.002-.16-.004-.228.042-.26.205-.185.93-.387 1.857-.574 2.788-.034.171-.096.236-.288.229a18.038 18.038 0 0 0-1.369 0c-.225.008-.28-.043-.232-.264.29-1.336.567-2.675.85-4.013.31-1.464.625-2.926.926-4.39.037-.182.102-.231.287-.23 1.29.009 2.58.006 3.871.004.31 0 .613.036.912.108.849.204 1.353.743 1.431 1.595.134 1.462-.568 3.075-2.241 3.733a3.66 3.66 0 0 1-1.364.238h-.79zm.087-1.55h.711c.958-.008 1.493-.462 1.643-1.392.116-.719-.12-1.073-.845-1.169-.653-.086-1.316-.03-1.974-.037-.102-.001-.127.054-.145.142-.156.762-.313 1.524-.482 2.284-.033.148.005.176.144.174.315-.007.632-.002.948-.002zM51.362 19.44c.11-.076.12-.166.153-.24.468-1.06.938-2.116 1.396-3.179.066-.151.142-.203.308-.198.394.012.79.014 1.185 0 .215-.007.228.046.139.222-.993 1.95-1.983 3.902-2.968 5.856-.425.844-.84 1.694-1.445 2.435-.525.642-1.132 1.172-2.004 1.312-.282.046-.565.11-.854.036.03-.261.06-.523.093-.785.009-.067.027-.124.11-.156.762-.293 1.223-.893 1.63-1.543.269-.43.48-.892.709-1.343.05-.099.04-.195.032-.299-.153-1.824-.3-3.649-.457-5.473-.017-.198.036-.252.233-.248.457.007.914.006 1.37-.015.226-.01.297.047.3.278.012 1.103.044 2.206.07 3.34zM45.464 21.277c-.09 0-.18-.003-.23-.09-.123-.221-.282-.179-.482-.098a3.464 3.464 0 0 1-1.198.268c-.846.025-1.423-.425-1.525-1.242-.152-1.223.198-2.328.99-3.275.69-.823 1.905-.924 2.82-.278.168.12.29.16.446.008.063-.062.223-.223.304-.306a.176.176 0 0 1 .12-.052l1.327-.044c.221-.006.204.08.126.422-.343 1.508-.687 3.016-1.021 4.526-.035.158-.09.214-.256.204a44.398 44.398 0 0 0-1.421-.043zm.382-2.93c-.01-.22-.03-.44-.135-.645-.185-.363-.522-.478-.9-.307a1.129 1.129 0 0 0-.34.234c-.536.542-.764 1.193-.704 1.938.012.153.063.3.142.436.182.312.486.418.828.285.174-.068.318-.178.443-.312.433-.46.635-1.01.666-1.629zM25.705 15.695c1.164-.017 1.976.549 2.214 1.543.426 1.784-.844 3.768-2.668 4.152-.612.128-1.226.114-1.807-.141-.64-.282-1.021-.78-1.115-1.453-.161-1.152.299-2.881 1.763-3.698.5-.279 1.041-.396 1.613-.403zm-1.927 3.351c-.002.709.247 1.094.728 1.178.59.102 1.108-.048 1.458-.545.415-.59.583-1.257.509-1.97-.048-.467-.393-.773-.874-.805-.575-.04-1.029.177-1.34.65-.319.486-.447 1.031-.48 1.492zM32.854 15.71c-.823-.07-1.496.205-2.077.81.031-.167.047-.338.097-.499.054-.176-.015-.201-.174-.197-.325.01-.65.013-.975 0-.167-.008-.221.049-.253.206-.122.607-.838 4.074-1.056 5.102-.034.156.004.192.158.188l1.027.002c.183.009.238-.063.266-.223.072-.403.568-2.766.664-3.146.175-.694.742-1.08 1.428-1.054.456.017.693.267.665.712-.01.144-.037.289-.066.43-.21 1.031-.419 2.062-.638 3.091-.033.156.005.192.159.188l1.027.002c.183.009.238-.063.266-.223.072-.403.164-.804.241-1.207.17-.89.404-1.769.521-2.668.11-.854-.404-1.44-1.28-1.514zM15.672 16.925c-.672.093-1.04.513-1.182 1.116-.21.899-.38 1.807-.562 2.712-.113.564-.108.565-.702.565-.211 0-.423-.012-.632.004-.185.013-.22-.049-.184-.215.235-1.121.464-2.244.695-3.365.115-.561.237-1.121.344-1.684.031-.165.075-.252.279-.24.332.022.667.012 1 .004.135-.003.169.043.14.164-.04.174-.072.35-.086.548a2.445 2.445 0 0 1 2.29-.793c.755.16 1.173.747 1.04 1.534-.148.884-.343 1.76-.52 2.64-.078.393-.167.785-.238 1.18-.029.157-.076.236-.263.226a12.693 12.693 0 0 0-1-.002c-.166.005-.219-.016-.178-.206.235-1.103.458-2.208.67-3.315.129-.669-.209-.983-.911-.873zM18.98 21.316a.162.162 0 0 1-.16-.194c.223-1.022.443-2.026.665-3.03.149-.677.306-1.352.445-2.03.035-.17.086-.247.283-.238l1.107.003c.165-.005.205.025.166.2-.383 1.701-.756 3.406-1.13 5.11-.021.093-.025.183-.167.181-.399-.005-.798-.003-1.209-.002zM21.863 13.828c-.19.005-.38.004-.569.003h-.193c-.171 0-.326.002-.48-.003-.101-.002-.164.021-.186.129-.071.351-.146.701-.225 1.05-.025.113.003.155.126.152.19-.005.379-.003.568-.002h.194c.17-.001.325-.002.479.002.101.003.165-.02.186-.129.072-.35.146-.7.225-1.05.026-.112-.003-.155-.125-.152zM7.225 21.506c-.698-.015-1.369-.072-1.983-.395-.721-.38-1.104-.973-1.176-1.765-.065-.714.147-1.39.29-2.075.338-1.633.695-3.261 1.033-4.893.045-.214.127-.288.356-.279.482.02.966.015 1.448.002.2-.006.233.057.196.232-.362 1.68-.718 3.361-1.075 5.042-.074.351-.157.702-.21 1.056-.12.797.318 1.332 1.135 1.41 1.346.127 2.253-.531 2.522-1.815.4-1.908.812-3.813 1.213-5.72.029-.14.07-.207.233-.204.535.01 1.07.005 1.606.002.116 0 .177.01.145.156-.447 2.064-.854 4.136-1.34 6.191-.405 1.724-1.61 2.659-3.364 2.966-.112.02-.225.04-.338.048-.236.018-.473.029-.69.041z" />
        </g>
      </g>
    </svg>
  )
}
