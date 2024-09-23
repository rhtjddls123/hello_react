import { forwardRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  targetTime: number;
  remainingTime: number;
  onReset: () => void;
}

const ResultModal = forwardRef(({ targetTime, remainingTime, onReset }: Props, ref: React.ForwardedRef<HTMLDialogElement>) => {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = userLost ? (0).toFixed(2) : (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  const modalElement = document.getElementById("modal");

  return modalElement
    ? createPortal(
        <dialog ref={ref} className="result-modal" onClose={onReset}>
          {userLost && <h2>You lost</h2>}
          {!userLost && <h2>Your score: {score}</h2>}
          <p>
            The target time was <strong>{targetTime} second.</strong>
          </p>
          <p>
            You stopped the timer with <strong>{formattedRemainingTime} second left.</strong>
          </p>
          <form method="dialog">
            <button>Close</button>
          </form>
        </dialog>,
        modalElement
      )
    : null;
});

export default ResultModal;
