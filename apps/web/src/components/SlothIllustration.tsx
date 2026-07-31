/**
 * SVG illustration of a sloth hanging from a tree branch.
 * Used as the visual centerpiece of the 404 page.
 */
const SlothIllustration = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 280 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: '100%',
      maxWidth: 320,
      height: 'auto',
      marginBottom: '1rem',
    }}
  >
    {/* Branch */}
    <path
      d="M10 55Q60 45 140 50Q220 55 270 45"
      stroke="#8B6914"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Small leaves on branch */}
    <ellipse
      cx="50"
      cy="42"
      rx="12"
      ry="6"
      fill="#4ade80"
      opacity="0.7"
      transform="rotate(-20 50 42)"
    />
    <ellipse
      cx="230"
      cy="40"
      rx="10"
      ry="5"
      fill="#22c55e"
      opacity="0.6"
      transform="rotate(15 230 40)"
    />

    {/* Sloth body */}
    <ellipse cx="140" cy="110" rx="42" ry="38" fill="#C4A882" />
    <ellipse cx="140" cy="115" rx="32" ry="28" fill="#D4BE9C" />

    {/* Sloth head */}
    <circle cx="140" cy="72" r="28" fill="#C4A882" />

    {/* Eye patches (sloth signature) */}
    <ellipse cx="124" cy="72" rx="12" ry="10" fill="#8B7355" />
    <ellipse cx="156" cy="72" rx="12" ry="10" fill="#8B7355" />

    {/* Eyes (half-closed, sleepy) */}
    <ellipse cx="124" cy="73" rx="5" ry="3.5" fill="#1e293b" />
    <ellipse cx="156" cy="73" rx="5" ry="3.5" fill="#1e293b" />
    <circle cx="125.5" cy="71.5" r="1.8" fill="white" />
    <circle cx="157.5" cy="71.5" r="1.8" fill="white" />

    {/* Nose */}
    <ellipse cx="140" cy="80" rx="4" ry="3" fill="#5C4033" />

    {/* Sleepy smile */}
    <path
      d="M133 86Q140 90 147 86"
      stroke="#5C4033"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />

    {/* Arms hanging down gripping branch */}
    <path
      d="M110 95Q100 80 105 58"
      stroke="#A8896A"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M170 95Q180 80 175 58"
      stroke="#A8896A"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />
    {/* Claws on branch */}
    <path d="M100 56L97 52" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
    <path d="M104 55L103 50" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
    <path d="M108 56L109 51" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
    <path d="M172 56L169 52" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
    <path d="M176 55L175 50" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />
    <path d="M180 56L181 51" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" />

    {/* Zzz — sleepy */}
    <text
      x="195"
      y="55"
      fontSize="16"
      fill="#667eea"
      fontWeight="bold"
      opacity="0.5"
      fontFamily="sans-serif"
    >
      z
    </text>
    <text
      x="210"
      y="42"
      fontSize="12"
      fill="#764ba2"
      fontWeight="bold"
      opacity="0.4"
      fontFamily="sans-serif"
    >
      z
    </text>
    <text
      x="220"
      y="32"
      fontSize="9"
      fill="#667eea"
      fontWeight="bold"
      opacity="0.3"
      fontFamily="sans-serif"
    >
      z
    </text>

    {/* Floating dots */}
    <circle cx="40" cy="140" r="4" fill="#667eea" opacity="0.3" />
    <circle cx="240" cy="130" r="3" fill="#764ba2" opacity="0.3" />
    <circle cx="30" cy="170" r="5" fill="#4ade80" opacity="0.2" />
    <circle cx="250" cy="175" r="4" fill="#f093fb" opacity="0.2" />
  </svg>
);

export default SlothIllustration;
