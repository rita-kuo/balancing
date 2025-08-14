import Modal, { ModalProps } from "@/app/_component/modal/Modal";
import { PropsWithChildren, useState } from "react";
import Button from "@/app/_component/button/Button";
import OutlineButton from "@/app/_component/button/OutlineButton";

const ConfirmModal = (
  props: ModalProps &
    PropsWithChildren<{
      title?: string;
      style?: "delete" | "confirm";
      confirmDirection?: "left" | "right";
      confirmText?: string;
      onConfirm: () => Promise<void> | void;
      cancelText?: string;
      onCancel?: () => void;
    }>,
) => {
  const {
    title,
    style,
    confirmDirection,
    confirmText,
    onConfirm,
    cancelText,
    onCancel,
    children,
    ...modalProps
  } = props;
  const direction = confirmDirection ?? "left";
  const [submitting, setSubmitting] = useState(false);
  const cancel = (
    <OutlineButton
      key="cancel"
      disabled={submitting}
      className="basis-1/2 shrink-0"
      onClick={onCancel ?? props.onClose}
    >
      {cancelText ?? "取消"}
    </OutlineButton>
  );
  return (
    <Modal {...modalProps}>
      <div className="space-y-4">
        {title && <h2>{title}</h2>}
        {children && <div>{children}</div>}
        <div className="flex gap-2 w-full">
          {direction === "right" && cancel}
          <Button
            key="confirm"
            disabled={submitting}
            className="basis-1/2 shrink-0"
            baseStyle={style === "delete" ? "bg-red-500 text-white" : undefined}
            hoverStyle={style === "delete" ? "hover:bg-red-400" : undefined}
            onClick={() => {
              setSubmitting(true);
              const promise = onConfirm() as Promise<void>;
              if (promise?.then)
                promise.then(props.onClose).finally(() => setSubmitting(false));
              else setSubmitting(false);
            }}
          >
            {confirmText ?? "確認"}
          </Button>
          {direction === "left" && cancel}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
