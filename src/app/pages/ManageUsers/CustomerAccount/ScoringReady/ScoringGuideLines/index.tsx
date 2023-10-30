import { Dialog } from '@mui/material';
import deleteIcon from 'assets/icons/delete.svg';
import NormalRow from './NormalRow';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onClose: () => void;
}
function ScoringGuideLines({ open, onClose }: Props) {
  const tableHeaders = [
    '-',
    'LANCAR',
    'DALAM PERHATIAN KHUSUS',
    'KURANG LANCAR',
    'DI RAGUKAN',
    'MACET',
  ];
  const { t } = useTranslation();
  return (
    <Dialog open={open} maxWidth="xl" onClose={onClose}>
      <div className="w-[80vw] min-w-[1200px] max-h-[calc(100vh-64px)] bg-white overflow-hidden relative">
        <div className="cursor-pointer top-6 right-6 absolute">
          <img
            src={deleteIcon}
            width={24}
            height={24}
            alt="delete-icon"
            onClick={onClose}
          />
        </div>

        <p className="text-[#202A42] font-bold text-[18px] leading-6 mt-6 text-center">
          {t(translations.scoringReady.collectibilityScoring)}
        </p>
        <div className="mt-6 w-full leading-5">
          <div className="flex">
            {tableHeaders.map(item => (
              <div
                key={item}
                className="pb-2 w-1/4 text-[#6B7A99] text-[14px] font-semibold px-6  border-b border-b-[#D7E2EE]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-fit max-h-[calc(100vh-166px)] overflow-y-auto scrollbar leading-5 border-b border-[#D7E2EE]">
          <NormalRow
            data={{
              parameter: 'Label',
              rowData: ['L', 'DPK', 'KL', 'D', 'M'],
              styles: [
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
              ],
            }}
          />
          <NormalRow
            data={{
              parameter: 'Rating EN',
              rowData: [
                'Clean',
                'Sufficent',
                'Not Clean',
                'At Risk',
                'Problematic',
              ],
              styles: [
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
              ],
            }}
          />
          <NormalRow
            data={{
              parameter: 'Collectibility Record',
              rowData: [
                'No Late Payment',
                'Have Record',
                'Have Record',
                'Have Record',
                'Have Record',
              ],
              styles: [
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
              ],
            }}
          />
          <NormalRow
            data={{
              parameter: 'Numbering',
              rowData: ['1', '2', '3', '4', '5'],
              styles: [
                { color: '#39C24F' },
                { color: '#005FC5' },
                { color: '#223250' },
                { color: '#FF8F00' },
                { color: '#FF0000' },
              ],
            }}
          />
          <NormalRow
            data={{
              parameter: 'Late Payment Record',
              rowData: ['<=30', '31 to 90', '91 to 120', '121 - 180', '>180'],
              styles: [
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
                { color: '#6B7A99' },
              ],
              headerStyle: { paddingBottom: 40 },
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ScoringGuideLines;
