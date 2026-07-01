"use client";
import { Modal, ModalContent, Image } from "@nextui-org/react";
import { X } from "lucide-react";

interface Props {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ src, isOpen, onClose }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      placement="center"
      hideCloseButton
      backdrop="blur"
      motionProps={{
        variants: {
          enter: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
          exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
        },
      }}
      classNames={{ backdrop: "bg-black/70 backdrop-blur-sm" }}
    >
      <ModalContent>
        <div className="relative flex items-center justify-center p-2">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 rounded-full p-2 transition-all duration-150"
            style={{ backgroundColor: "oklch(0 0 0 / 0.4)", color: "white" }}
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>
          <Image
            src={src}
            alt="预览大图"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            radius="lg"
            removeWrapper
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
