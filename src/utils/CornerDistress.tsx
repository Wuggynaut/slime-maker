import cornerdistress1 from '../assets/corner_effects/Cornerdistress1.png'
import cornerdistress2 from '../assets/corner_effects/Cornerdistress2.png'
import cornerdistress3 from '../assets/corner_effects/Cornerdistress3.png'
import cornerdistress4 from '../assets/corner_effects/Cornerdistress4.png'


type CornerDistressProps = {
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
}

export function CornerDistress({ topLeft, topRight, bottomLeft, bottomRight }: CornerDistressProps) {
    const corners = [
        { show: topLeft, src: cornerdistress1, className: 'corner top-left' },
        { show: topRight, src: cornerdistress2, className: 'corner top-right' },
        { show: bottomLeft, src: cornerdistress3, className: 'corner bottom-left' },
        { show: bottomRight, src: cornerdistress4, className: 'corner bottom-right' },
    ];

    return (
        <>
            {corners.map((corner, index) =>
                corner.show && (
                    <img
                        key={index}
                        src={corner.src}
                        alt=""
                        aria-hidden="true"
                        className={corner.className}
                    />
                )
            )}
        </>
    );
}