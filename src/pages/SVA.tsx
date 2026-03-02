import SVAHero from '../features/sva/components/SVAHero';
// import SVALogicVideo from '../features/sva/components/SVALogicVideo'; // commented out — re-enable with section
import SVAEngine from '../features/sva/components/SVAEngine';
import SVAPassport from '../features/sva/components/SVAPassport';
import SVAStakeholder from '../features/sva/components/SVAStakeholder';
import { TornPaper } from '../components/ui/OrganicSectionDividers';

const VANILLA = '#F8FAFC';
const SOFT_SAGE = '#E0E7FF';
const SOFT_SAND = '#F1F5F9';
const CHARCOAL = '#0F172A';

export default function SVA() {
    return (
        <div className="w-full min-h-screen" style={{ backgroundColor: VANILLA, color: CHARCOAL }}>
            <SVAHero />
            {/* — VERIFICATION IN ACTION — commented out, re-add when ready —
            <TornPaper from={VANILLA} to={SOFT_SAGE} height={72} />
            <div style={{ backgroundColor: SOFT_SAGE }}>
                <SVALogicVideo />
            </div>
            <TornPaper from={SOFT_SAGE} to={SOFT_SAND} height={72} />
            */}
            <TornPaper from={VANILLA} to={SOFT_SAND} height={72} />
            <div style={{ backgroundColor: SOFT_SAND }}>
                <SVAEngine />
            </div>
            <TornPaper from={SOFT_SAND} to={SOFT_SAGE} height={72} />
            <div style={{ backgroundColor: SOFT_SAGE }}>
                <SVAPassport />
            </div>
            <TornPaper from={SOFT_SAGE} to={VANILLA} height={72} />
            <div style={{ backgroundColor: VANILLA }}>
                <SVAStakeholder />
            </div>
        </div>
    );
}
