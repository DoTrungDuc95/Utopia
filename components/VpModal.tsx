import { useEffect, useState } from 'react';
import { useVpModal, VpModal } from '../store/useVpModal';
import {
  useCalculatorInput,
  CalculatorInput,
} from '../store/useCalculatorInput';

import { MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import RoundButton from './RoundButton';

const VpModal = () => {
  const [newVps, setNewVps] = useState<number[]>([]);
  const vpArr = useCalculatorInput((state: CalculatorInput) => state.vpArr);
  const setVpArr = useCalculatorInput(
    (state: CalculatorInput) => state.setVpArr
  );

  const open = useVpModal((state: VpModal) => state.isVpModalOpen);
  const closeVpModal = useVpModal((state: VpModal) => state.closeVpModal);

  useEffect(() => {
    if (open) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'auto';

    setNewVps(vpArr);

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [open, vpArr]);

  if (!open) return null;

  const onDeleteVpClick = (index: number) => {
    const copy = [...newVps];
    copy.splice(index, 1);
    setNewVps(copy);
  };

  const onAddVpClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setNewVps((p) => [...p, window.innerWidth]);
  };

  const updateTable = (e: React.MouseEvent<HTMLElement>) => {
    const s = new Set([...newVps]);
    setVpArr(Array.from(s));
    closeVpModal();
  };

  const onVpChange = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();

    const val = Number(e.currentTarget.value);
    if (isNaN(val)) return;

    const copy = [...newVps];
    copy[index] = val;

    setNewVps((p) => copy);
    e.currentTarget.focus();
  };

  return (
    <div className="modal">
      <div className="close-modal-btn">
        <RoundButton onClick={() => closeVpModal()} ariaLabel='tắt modal'>
          <AiOutlineCloseCircle color="white" size="2.5em" />
        </RoundButton>
      </div>
      <div className="vp-list-ctn">
        <h3>Tính toán cỡ chữ cho các khung nhìn dưới đây</h3>
        <div className="vp-list">
          {newVps.map((vp, i) => (
            <VpInput
              vp={vp}
              onDeleteClick={(e: React.MouseEvent<HTMLElement>) =>
                onDeleteVpClick(i)
              }
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                onVpChange(e, i);
              }}
              key={i}
            />
          ))}
        </div>
        <div className="flex-start-ct">
          <RoundButton onClick={onAddVpClick} ariaLabel='thêm khung nhìn mới'>
            <MdAddCircleOutline color="white" size="2.5em" />
          </RoundButton>
          <p className="h4-text">Thêm</p>
        </div>
        <button onClick={updateTable} className="update-tb-bnt">
          Cập nhật bảng
        </button>
      </div>
    </div>
  );
};

export default VpModal;

type VpInputProps = {
  onDeleteClick: (e: React.MouseEvent<HTMLElement>) => void;
  vp: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const VpInput = ({ onDeleteClick, vp, onChange }: VpInputProps) => {
  return (
    <div className="vp-input-layout flex-bw-ct">
      <input type="number" value={vp} onChange={onChange} />
      <RoundButton onClick={onDeleteClick} ariaLabel='xóa khung nhìn'>
        <MdDelete color="red" size="2em" />
      </RoundButton>
    </div>
  );
};
