import { Box, IconButton } from "@mui/material";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { appWidth } from "../../helpers/const/ui";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({
    isOpen,
    onClose,
    children,
}: PropsWithChildren<ModalProps>) {
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    const modal = (
        <Box
            sx={{
                width: appWidth,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                top: 0,
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.295)",
                zIndex: 100,
            }}
            onClick={onClose}
            onScroll={(e) => e.stopPropagation()}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    width: "100%",
                    margin: "10px",
                    backgroundColor: "white",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.298)",
                    maxWidth: "inherit",
                    overflow: "hidden",
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        zIndex: 1000,
                        position: "absolute",
                        top: 0,
                        right: 0,
                        margin: "3px",
                        backgroundColor: "white",
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </div>
        </Box>
    );

    const root = document.getElementById("modal");

    if (!isOpen || !root) {
        return null;
    }
    return createPortal(modal, root);
}
