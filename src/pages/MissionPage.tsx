import { FaDice } from "react-icons/fa";
import { GenerateMission } from "../components/GenerateMission";
import { useMissionStore } from "../stores/missionStore";

export function MissionPage() {
    const regenerateMission = useMissionStore((state) => state.regenerateMission);

    return (
        <>
            <div className="sheet">
                <div style={{ textAlign: 'center' }}>
                    <h1 className='header-title'>THE MISSION MAKER</h1>
                    <div className='button-group'>
                        <button onClick={regenerateMission} aria-label='Reroll Mission'>
                            <FaDice /> Reroll Mission
                        </button>
                    </div>
                </div>
                <GenerateMission />
            </div>
        </>
    );
}