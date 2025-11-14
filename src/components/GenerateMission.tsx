import { capitalize, capitalizeAll } from '../utils/textUtilities'
import { CornerDistress } from '../utils/CornerDistress';
import { useMissionStore } from '../stores/missionStore';

export const GenerateMission = () => {
    const { missionParameters, missionText } = useMissionStore();

    const missionDetails = [
        { label: 'Mission type', value: missionParameters.type },
        ...(missionParameters.target ? [{ label: 'Target', value: missionParameters.target.name }] : []),
        { label: 'Location', value: missionParameters.location.name },
        { label: 'Location Feature', value: missionParameters.locationFeature },
        { label: 'Complication', value: missionParameters.complication }
    ];

    return (
        <>
            <div className='fixed-width-card card'>
                <div className='card-content'>
                    <CornerDistress topLeft topRight bottomLeft bottomRight />
                    <h1 className='card-header'>
                        Mission: {capitalize(missionParameters.type)} {missionParameters.target ? capitalizeAll(missionParameters.target.name) : capitalizeAll(missionParameters.location.name)}
                    </h1>
                    <div className='description'>
                        <p><strong className='highlight'>Description:</strong> {missionText}</p>
                    </div>
                    <div className='separator' />
                    <h2 className='card-header'>Mission parameters</h2>
                    <div className='description'>
                        {missionDetails.map((detail, index) => (
                            <div key={detail.label}>
                                <p>
                                    <strong className='highlight'>{detail.label}:</strong> {capitalize(detail.value)}
                                </p>
                                {index < missionDetails.length - 1 && (
                                    <div className="dot-border" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};