const spinnerSizes = {
    sm: 34,
    md: 50,
    lg: 80
};

type SpinnerProps = {
    size: keyof typeof spinnerSizes;
};

const Spinner = ({ size }: SpinnerProps) => {
    return (
        <svg
            width={spinnerSizes[size]}
            height={spinnerSizes[size]}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="fill-current mx-auto"
        >
            <g transform="rotate(0 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.9090909090909091s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(32.72727272727273 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.8181818181818182s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(65.45454545454545 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.7272727272727273s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(98.18181818181819 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.6363636363636364s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(130.9090909090909 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.5454545454545454s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(163.63636363636363 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.45454545454545453s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(196.36363636363637 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.36363636363636365s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(229.0909090909091 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.2727272727272727s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(261.8181818181818 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.18181818181818182s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(294.54545454545456 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.09090909090909091s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
            <g transform="rotate(327.27272727272725 50 50)">
                <rect x="46.5" y="26.5" rx="3.5" ry="3.5" width="7" height="7">
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    ></animate>
                </rect>
            </g>
        </svg>
    );
};

export default Spinner;
