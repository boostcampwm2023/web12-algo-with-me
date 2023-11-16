interface Props {
  color: string;
  size: string;
}

export default function Loading({ color, size }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx="84" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.78125s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        ></animate>
      </circle>
      <circle cx="50" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.78125s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.78125s"
        ></animate>
      </circle>
      <circle cx="84" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.5625s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.5625s"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill={color}>
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-2.34375s"
        ></animate>
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="3.125s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-2.34375s"
        ></animate>
      </circle>
    </svg>
  );
}
